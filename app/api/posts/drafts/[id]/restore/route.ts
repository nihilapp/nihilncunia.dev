import { NextRequest, NextResponse } from 'next/server';

import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, createSecurityErrorResponse } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/posts/drafts/[id]/restore - 임시저장 포스트 복원 데이터 조회
export async function GET(request: NextRequest, { params, }: Params) {
  try {
    // JWT 인증
    const accessToken = getHeaderToken(request);

    if (!accessToken) {
      return createSecurityErrorResponse('액세스 토큰이 필요합니다.', 401);
    }

    const { id, } = await params;
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

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

    // 임시저장 포스트 조회 및 권한 확인
    const draft = await DB.posts().findFirst({
      where: {
        id,
        user_id: userId,
        is_published: false,
      },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        excerpt: true,
        category_id: true,
        subcategory_id: true,
        created_at: true,
        updated_at: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
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

    if (!draft) {
      return createSecurityErrorResponse('임시저장 포스트를 찾을 수 없습니다.', 404);
    }

    return NextResponse.json({
      success: true,
      message: '임시저장 포스트 데이터를 조회했습니다.',
      data: draft,
    });
  } catch (error) {
    console.error('Draft restore error:', error);
    return createSecurityErrorResponse('임시저장 복원 중 오류가 발생했습니다.', 500);
  }
}
