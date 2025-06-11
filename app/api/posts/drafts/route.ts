import { NextRequest, NextResponse } from 'next/server';

import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, createSecurityErrorResponse } from '@/api/_libs';

// GET /api/posts/drafts - 임시저장 포스트 목록 조회
export async function GET(request: NextRequest) {
  try {
    // JWT 인증
    const accessToken = getHeaderToken(request);

    if (!accessToken) {
      return createSecurityErrorResponse('액세스 토큰이 필요합니다.', 401);
    }

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    if (!userId) {
      return createSecurityErrorResponse('사용자 ID가 필요합니다.', 400);
    }

    // 토큰 검증 및 갱신
    const authResult = await refreshCheck(
      userId,
      accessToken
    );

    if (authResult.error) {
      return createSecurityErrorResponse(authResult.message, authResult.status);
    }

    // 사용자 존재 확인
    const findUser = await DB.user().findUnique({
      where: { id: userId, },
    });

    if (!findUser) {
      return createSecurityErrorResponse('사용자를 찾을 수 없습니다.', 404);
    }

    const skip = (page - 1) * limit;

    // 임시저장 포스트 조회
    const drafts = await DB.posts().findMany({
      where: {
        user_id: userId,
        is_published: false,
      },
      orderBy: {
        updated_at: 'desc',
      },
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        excerpt: true,
        created_at: true,
        updated_at: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    // 전체 임시저장 포스트 수
    const total = await DB.posts().count({
      where: {
        user_id: userId,
        is_published: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: '임시저장 목록을 조회했습니다.',
      data: {
        drafts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Drafts fetch error:', error);
    return createSecurityErrorResponse('임시저장 목록 조회 중 오류가 발생했습니다.', 500);
  }
}
