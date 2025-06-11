import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import { DB } from '@/api/_libs';

interface Params {
	params: Promise<{ id: string }>;
}

// PATCH /api/posts/[id]/views - 조회수 증가 (인증 불필요)
export async function PATCH(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

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

    // 조회수 증가
    const updatedPost = await DB.posts().update({
      where: { id, },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const successResponse: ApiResponse<{ views: number }> = {
      response: {
        views: updatedPost.views,
      },
      message: '조회수가 성공적으로 증가되었습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('조회수 증가 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '조회수 증가 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
