import { NextRequest, NextResponse } from 'next/server';

import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, createSecurityErrorResponse } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

// PATCH /api/posts/[id]/autosave - 기존 포스트 자동 저장
export async function PATCH(request: NextRequest, { params, }: Params) {
  try {
    // JWT 인증
    const accessToken = getHeaderToken(request);

    if (!accessToken) {
      return createSecurityErrorResponse('액세스 토큰이 필요합니다.', 401);
    }

    const { id, } = await params;
    const body = await request.json();
    const { userId, title, content, slug, } = body;

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

    // 포스트 존재 확인 및 권한 확인
    const existingPost = await DB.posts().findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!existingPost) {
      return createSecurityErrorResponse('수정할 포스트를 찾을 수 없습니다.', 404);
    }

    // 자동 저장 업데이트
    const updatedPost = await DB.posts().update({
      where: { id, },
      data: {
        title: title || existingPost.title,
        content: content || existingPost.content,
        slug: slug || existingPost.slug,
        excerpt: content ? content.substring(0, 200) : existingPost.excerpt,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: '자동저장이 완료되었습니다.',
      data: {
        id: updatedPost.id,
        title: updatedPost.title,
        content: updatedPost.content,
        slug: updatedPost.slug,
        excerpt: updatedPost.excerpt,
        updatedAt: updatedPost.updated_at,
      },
    });
  } catch (error) {
    console.error('Autosave error:', error);
    return createSecurityErrorResponse('자동저장 중 오류가 발생했습니다.', 500);
  }
}
