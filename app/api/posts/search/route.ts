import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import { DB } from '@/api/_libs';

interface SearchResponse {
  posts: any[];
  total: number;
  page: number;
  limit: number;
  query: string;
}

// GET /api/posts/search - 포스트 검색 (인증 불필요)
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
      const errorResponse: ApiError = {
        response: null,
        message: '검색어를 입력해주세요.',
      };

      return NextResponse.json(
        errorResponse,
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

    const successResponse: ApiResponse<SearchResponse> = {
      response: {
        posts,
        total,
        page,
        limit,
        query,
      },
      message: '포스트 검색을 성공적으로 완료했습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('포스트 검색 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 검색 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
