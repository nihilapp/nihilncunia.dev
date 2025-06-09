import { NextRequest, NextResponse } from 'next/server';

import { DB } from '@/api/_libs';

interface Params {
  params: Promise<{ slug: string }>;
}

// GET /api/hashtags/[slug]/posts - 특정 해시태그의 포스트 목록 조회
export async function GET(
  req: NextRequest,
  { params, }: Params
) {
  try {
    const { slug, } = await params;
    const { searchParams, } = new URL(req.url);

    if (!slug) {
      return NextResponse.json(
        {
          message: '해시태그 슬러그가 필요합니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 페이징 파라미터
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    const status = searchParams.get('status') || 'PUBLISHED';

    // 해시태그 존재 여부 확인
    const hashtag = await DB.hashtags().findUnique({
      where: { slug, },
    });

    if (!hashtag) {
      return NextResponse.json(
        {
          message: '해당 해시태그를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    // 해시태그와 연결된 포스트 조회
    const [ posts, total, ] = await Promise.all([
      DB.posts().findMany({
        where: {
          status: status.toUpperCase() as any,
          post_hashtags: {
            some: {
              hashtag_id: hashtag.id,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc', },
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
      }),
      DB.posts().count({
        where: {
          status: status.toUpperCase() as any,
          post_hashtags: {
            some: {
              hashtag_id: hashtag.id,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      message: `'${hashtag.name}' 해시태그 포스트 목록 조회 성공`,
      response: {
        hashtag: {
          id: hashtag.id,
          name: hashtag.name,
          slug: hashtag.slug,
        },
        posts,
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('해시태그 포스트 목록 조회 에러:', error);
    return NextResponse.json(
      {
        message: '해시태그 포스트 목록 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
