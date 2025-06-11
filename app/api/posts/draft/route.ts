import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse } from '@/_entities/common';
import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, createSecurityErrorResponse } from '@/api/_libs';

// POST /api/posts/draft - 포스트 임시 저장
export async function POST(request: NextRequest) {
  try {
    // JWT 인증
    const accessToken = getHeaderToken(request);
    console.log('accessToken', accessToken);

    if (!accessToken) {
      return createSecurityErrorResponse('액세스 토큰이 필요합니다.', 401);
    }

    const body = await request.json();
    const { userId, title, content, slug, postId, categoryId, } = body;

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

    let draft;

    if (postId) {
      // 기존 포스트 업데이트
      draft = await DB.posts().update({
        where: {
          id: postId,
          user_id: userId,
        },
        data: {
          title,
          content,
          slug,
          excerpt: content ? content.substring(0, 200) : '',
          is_published: false,
          updated_at: new Date(),
        },
      });
    } else {
      // 새 임시저장 생성
      draft = await DB.posts().create({
        data: {
          title: title || '제목 없음',
          content: content || '',
          slug: slug || `draft-${Date.now()}`,
          excerpt: content ? content.substring(0, 200) : '',
          category_id: categoryId || '',
          user_id: userId,
          is_published: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    }

    const successResponse: ApiResponse<typeof draft> = {
      response: {
        id: draft.id,
        title: draft.title,
        content: draft.content,
        slug: draft.slug,
        excerpt: draft.excerpt,
        created_at: draft.created_at,
        updated_at: draft.updated_at,
      },
      message: '임시저장이 완료되었습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error) {
    console.error('Draft save error:', error);
    return createSecurityErrorResponse('임시저장 중 오류가 발생했습니다.', 500);
  }
}
