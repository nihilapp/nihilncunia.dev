import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, serverTools } from '@/api/_libs';

interface BatchDeleteRequest {
  post_ids: string[];
}

// DELETE /api/posts/batch - 포스트 일괄 삭제 (인증 필요)
export async function DELETE(req: NextRequest) {
  let requestData: BatchDeleteRequest;

  try {
    requestData = await req.json();
  } catch (error) {
    console.error('일괄 삭제 중 요청 파싱 오류:', error);

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
    console.error('일괄 삭제 중 토큰 디코딩 오류:', error);

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
    console.error('일괄 삭제 중 토큰 검증 오류:', checkResult.error);

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
      message: '삭제할 포스트 ID 목록이 필요합니다.',
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
        user_id: userId, // 본인의 포스트만 삭제 가능
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (existingPosts.length === 0) {
      const errorResponse: ApiError = {
        response: null,
        message: '삭제할 수 있는 포스트가 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    // 찾지 못한 포스트 ID들
    const foundIds = existingPosts.map(post => post.id);
    const notFoundIds = requestData.post_ids.filter(id => !foundIds.includes(id));

    // 관련 데이터 삭제 (Cascade로 자동 삭제되지만 명시적으로 처리)
    await DB.postHashtags().deleteMany({
      where: {
        post_id: { in: foundIds, },
      },
    });

    // 포스트 일괄 삭제
    const deleteResult = await DB.posts().deleteMany({
      where: {
        id: { in: foundIds, },
        user_id: userId,
      },
    });

    const successResponse: ApiResponse<{
      deleted_count: number;
      deleted_posts: { id: string; title: string }[];
      not_found_ids: string[];
    }> = {
      response: {
        deleted_count: deleteResult.count,
        deleted_posts: existingPosts,
        not_found_ids: notFoundIds,
      },
      message: `${deleteResult.count}개의 포스트가 성공적으로 삭제되었습니다.`,
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('포스트 일괄 삭제 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 일괄 삭제 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
