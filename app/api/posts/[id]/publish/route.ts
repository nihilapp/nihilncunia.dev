import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, serverTools } from '@/api/_libs';

interface Params {
	params: Promise<{ id: string }>;
}

// PATCH /api/posts/[id]/publish - 포스트 발행/취소 토글 (인증 필요)
export async function PATCH(request: NextRequest, { params, }: Params) {
  // JWT 인증
  const accessToken = getHeaderToken(request);

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
    console.error('포스트 발행/취소 중 토큰 디코딩 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '유효하지 않은 토큰입니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 401, }
    );
  }

  const { id, } = await params;

  // 토큰 검증 및 갱신
  const checkResult = await refreshCheck(
    userId,
    accessToken
  );

  if (checkResult.error) {
    console.error('포스트 발행/취소 중 토큰 검증 오류:', checkResult.error);

    const errorResponse: ApiError = {
      response: null,
      message: checkResult.message,
    };

    return NextResponse.json(
      errorResponse,
      { status: checkResult.status, }
    );
  }

  try {
    // 포스트 존재 확인
    const findExistingPost = await DB.posts().findUnique({
      where: { id, },
    });

    if (!findExistingPost) {
      const errorResponse: ApiError = {
        response: null,
        message: '포스트를 찾을 수 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    // 작성자 권한 확인
    if (findExistingPost.user_id !== userId) {
      const errorResponse: ApiError = {
        response: null,
        message: '본인의 포스트만 발행/취소할 수 있습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 403, }
      );
    }

    // 발행 상태 토글
    const updatedPost = await DB.posts().update({
      where: { id, },
      data: {
        is_published: !findExistingPost.is_published,
        status: !findExistingPost.is_published ? 'PUBLISHED' : 'DRAFT',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    const successResponse: ApiResponse<typeof updatedPost> = {
      response: updatedPost,
      message: `포스트가 성공적으로 ${updatedPost.is_published ? '발행' : '발행 취소'}되었습니다.`,
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('포스트 발행/취소 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 발행 상태 변경 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
