import { NextRequest, NextResponse } from 'next/server';

import { DB } from '@/api/_libs';

// GET /api/posts/search - 포스트 검색
export async function GET(req: NextRequest) {
  try {
    const { searchParams, } = new URL(req.url);

    const query = searchParams.get('q') || '';
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const status = searchParams.get('status') || 'PUBLISHED';

    if (!query.trim()) {
      return NextResponse.json(
        {
          message: '검색어를 입력해주세요.',
          response: null,
        },
        { status: 400, }
      );
    }

    const where: any = {
      status: status.toUpperCase(),
      is_published: true,
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          excerpt: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };

    if (category) {
      where.category_id = category;
    }

    if (subcategory) {
      where.subcategory_id = subcategory;
    }

    const [ posts, total, ] = await Promise.all([
      DB.posts().findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
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
      }),
      DB.posts().count({ where, }),
    ]);

    return NextResponse.json({
      message: '포스트 검색 성공',
      response: {
        posts,
        total,
        page,
        limit,
        query,
      },
    });
  } catch (error) {
    console.error('포스트 검색 에러:', error);

    return NextResponse.json(
      {
        message: '포스트 검색 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
