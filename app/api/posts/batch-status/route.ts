import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import type { PostStatus } from '@/_prisma/client';
import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, serverTools } from '@/api/_libs';

interface BatchStatusUpdateRequest {
  post_ids: string[];
  status?: PostStatus;
  is_published?: boolean;
}

// PATCH /api/posts/batch-status - 포스트 상태 일괄 변경 (인증 필요)
export async function PATCH(req: NextRequest) {
  let requestData: BatchStatusUpdateRequest;

  try {
    requestData = await req.json();
  } catch (error) {
    console.error('상태 일괄 변경 중 요청 파싱 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '잘못된 요청 형식입니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 400, }
    );
  }

  // JWT 인증
  const accessToken = getHeaderToken(req);

  if (!accessToken) {
    const errorResponse: ApiError = {
      response: null,
      message: '액세스 토큰이 필요합니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 401, }
    );
  }

  // JWT 토큰에서 사용자 ID 추출
  let userId: string;

  try {
    const tokenData = await serverTools.jwt!.tokenInfo('accessToken', accessToken);
    userId = tokenData.id;
  } catch (error) {
    console.error('상태 일괄 변경 중 토큰 디코딩 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '유효하지 않은 토큰입니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 401, }
    );
  }

  // 토큰 검증 및 갱신
  const checkResult = await refreshCheck(
    userId,
    accessToken
  );

  if (checkResult.error) {
    console.error('상태 일괄 변경 중 토큰 검증 오류:', checkResult.error);

    const errorResponse: ApiError = {
      response: null,
      message: checkResult.message,
    };

    return NextResponse.json(
      errorResponse,
      { status: checkResult.status, }
    );
  }

  // 필수 필드 검증
  if (!requestData.post_ids || !Array.isArray(requestData.post_ids) || requestData.post_ids.length === 0) {
    const errorResponse: ApiError = {
      response: null,
      message: '변경할 포스트 ID 목록이 필요합니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 400, }
    );
  }

  // 변경할 데이터가 있는지 확인
  if (requestData.status === undefined && requestData.is_published === undefined) {
    const errorResponse: ApiError = {
      response: null,
      message: '변경할 상태 또는 발행 여부를 지정해야 합니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 400, }
    );
  }

  try {
    // 포스트 존재 여부 확인
    const existingPosts = await DB.posts().findMany({
      where: {
        id: { in: requestData.post_ids, },
        user_id: userId, // 본인의 포스트만 변경 가능
      },
      select: {
        id: true,
        title: true,
        status: true,
        is_published: true,
      },
    });

    if (existingPosts.length === 0) {
      const errorResponse: ApiError = {
        response: null,
        message: '변경할 수 있는 포스트가 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    // 찾지 못한 포스트 ID들
    const foundIds = existingPosts.map(post => post.id);
    const notFoundIds = requestData.post_ids.filter(id => !foundIds.includes(id));

    // 변경할 데이터 구성
    const updateData: { status?: PostStatus; is_published?: boolean; updated_at: Date } = {
      updated_at: new Date(),
    };

    if (requestData.status !== undefined) {
      updateData.status = requestData.status;
    }

    if (requestData.is_published !== undefined) {
      updateData.is_published = requestData.is_published;
    }

    // 포스트 상태 일괄 변경
    const updateResult = await DB.posts().updateMany({
      where: {
        id: { in: foundIds, },
        user_id: userId,
      },
      data: updateData,
    });

    // 변경된 포스트 목록 조회
    const updatedPosts = await DB.posts().findMany({
      where: {
        id: { in: foundIds, },
      },
      select: {
        id: true,
        title: true,
        status: true,
        is_published: true,
        updated_at: true,
      },
    });

    const successResponse: ApiResponse<{
      updated_count: number;
      updated_posts: typeof updatedPosts;
      not_found_ids: string[];
      changes: {
        status?: PostStatus;
        is_published?: boolean;
      };
    }> = {
      response: {
        updated_count: updateResult.count,
        updated_posts: updatedPosts,
        not_found_ids: notFoundIds,
        changes: {
          ...(requestData.status !== undefined && { status: requestData.status, }),
          ...(requestData.is_published !== undefined && { is_published: requestData.is_published, }),
        },
      },
      message: `${updateResult.count}개의 포스트 상태가 성공적으로 변경되었습니다.`,
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('포스트 상태 일괄 변경 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 상태 일괄 변경 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
