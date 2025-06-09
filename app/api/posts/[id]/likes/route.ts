import { NextRequest, NextResponse } from 'next/server';

import { DB } from '@/api/_libs';

interface Params {
	params: Promise<{ id: string }>;
}

// PATCH /api/posts/[id]/likes - 좋아요 증가
export async function PATCH(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

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

    // 좋아요 증가
    const updatedPost = await DB.posts().update({
      where: {
        id,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      message: '좋아요 증가 성공',
      response: {
        likes: updatedPost.likes,
      },
    });
  } catch (error) {
    console.error('좋아요 증가 에러:', error);

    return NextResponse.json(
      {
        message: '좋아요 증가 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
