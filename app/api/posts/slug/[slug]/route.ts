import { NextRequest, NextResponse } from 'next/server';

import { DB } from '@/api/_libs';

interface Params {
	params: Promise<{ slug: string }>;
}

// GET /api/posts/slug/[slug] - slug로 포스트 조회
export async function GET(request: Request, { params, }: Params) {
  try {
    const { slug, } = await params;

    const post = await DB.posts().findUnique({
      where: {
        slug,
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

    if (!post) {
      return NextResponse.json(
        {
          message: '포스트를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    // 공개된 포스트만 조회 허용 (관리자 제외)
    if (!post.is_published || post.status !== 'PUBLISHED') {
      return NextResponse.json(
        {
          message: '공개되지 않은 포스트입니다.',
          response: null,
        },
        { status: 403, }
      );
    }

    // 조회수 증가
    await DB.posts().update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      message: '포스트 조회 성공',
      response: {
        ...post,
        views: post.views + 1,
      },
    });
  } catch (error) {
    console.error('포스트 slug 조회 에러:', error);

    return NextResponse.json(
      {
        message: '포스트 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
