import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import { DB, jwtAuth } from '@/api/_libs';

interface Params {
	params: Promise<{ slug: string }>;
}

// GET /api/posts/slug/[slug] - slug로 포스트 조회 (인증 선택적)
export async function GET(request: NextRequest, { params, }: Params) {
  try {
    const { slug, } = await params;

    const findPost = await DB.posts().findUnique({
      where: { slug, },
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
        post_hashtags: {
          include: {
            hashtag: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!findPost) {
      const errorResponse: ApiError = {
        response: null,
        message: '포스트를 찾을 수 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    // 포스트 접근 권한 확인
    let isAdmin = false;
    const authResult = await jwtAuth(request, false);

    if (authResult.user) {
      isAdmin = true;
    }

    // 포스트 상태별 접근 제어
    if (!isAdmin) {
      // 일반 사용자는 PUBLISHED 상태이면서 is_published가 true인 포스트만 접근 가능
      if (findPost.status !== 'PUBLISHED' || !findPost.is_published) {
        const errorResponse: ApiError = {
          response: null,
          message: '접근할 수 없는 포스트입니다.',
        };

        return NextResponse.json(
          errorResponse,
          { status: 403, }
        );
      }
    }

    // 조회수 증가
    await DB.posts().update({
      where: { slug, },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const postWithUpdatedViews = {
      ...findPost,
      views: findPost.views + 1,
    };

    const successResponse: ApiResponse<typeof postWithUpdatedViews> = {
      response: postWithUpdatedViews,
      message: '포스트를 성공적으로 조회했습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('포스트 slug 조회 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 조회 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
