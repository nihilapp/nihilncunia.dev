import { NextRequest, NextResponse } from 'next/server';

import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

interface Params {
	params: Promise<{ id: string }>;
}

// PATCH /api/posts/[id]/publish - 포스트 발행/취소 토글
export async function PATCH(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    // JWT 인증
    const cookie = request.cookies.get('accessToken');
    if (!cookie) {
      return NextResponse.json(
        {
          message: '인증 정보가 없습니다.',
          response: null,
        },
        { status: 401, }
      );
    }

    if (!serverTools.jwt) {
      return NextResponse.json(
        {
          message: '인증 시스템 오류가 발생했습니다.',
          response: null,
        },
        { status: 500, }
      );
    }

    const tokenData = await serverTools.jwt.tokenInfo('accessToken', cookie.value);
    if (!tokenData || !tokenData.id) {
      return NextResponse.json(
        {
          message: '관리자 권한이 없습니다.',
          response: null,
        },
        { status: 403, }
      );
    }

    // 포스트 존재 확인
    const existingPost = await DB.posts().findUnique({
      where: {
        id,
      },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          message: '포스트를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    // 발행 상태 토글
    const updatedPost = await DB.posts().update({
      where: {
        id,
      },
      data: {
        is_published: !existingPost.is_published,
        status: !existingPost.is_published ? 'PUBLISHED' : 'DRAFT',
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

    return NextResponse.json({
      message: `포스트 ${updatedPost.is_published ? '발행' : '발행 취소'} 성공`,
      response: updatedPost,
    });
  } catch (error) {
    console.error('포스트 발행 토글 에러:', error);

    return NextResponse.json(
      {
        message: '포스트 발행 상태 변경 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
