import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../auth';

import type { ApiResponse, ApiError } from '@/_entities/common';
import { DB } from '@/api/_libs';

// GET - 포스트 목록 조회 (인증 불필요)
export async function GET(request: NextRequest) {
  try {
    const { searchParams, } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'PUBLISHED';

    const posts = await DB.posts().findMany({
      where: {
        post_status: status as any,
      },
      select: {
        post_id: true,
        post_title: true,
        post_slug: true,
        post_excerpt: true,
        cover_image_url: true,
        published_at: true,
        view_count: true,
        likes_count: true,
        author: {
          select: {
            display_name: true,
          },
        },
      },
      orderBy: {
        published_at: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const successResponse: ApiResponse<typeof posts> = {
      response: posts,
      message: '포스트 목록을 조회했습니다.',
      status: 200,
    };

    return NextResponse.json(successResponse, { status: 200, });

  } catch (error) {
    console.error('포스트 조회 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 조회 중 오류가 발생했습니다.',
      status: 500,
    };

    return NextResponse.json(errorResponse, { status: 500, });
  }
}

// POST - 포스트 생성 (관리자 인증 필요)
export async function POST(request: NextRequest) {
  try {
    // 1. 인증 확인
    const session = await auth();

    if (!session?.user) {
      const errorResponse: ApiError = {
        response: null,
        message: '로그인이 필요합니다.',
        status: 401,
      };
      return NextResponse.json(errorResponse, { status: 401, });
    }

    // 2. 권한 확인
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      const errorResponse: ApiError = {
        response: null,
        message: '관리자 권한이 필요합니다.',
        status: 403,
      };
      return NextResponse.json(errorResponse, { status: 403, });
    }

    // 3. 요청 데이터 파싱
    const body = await request.json();
    const { title, content, excerpt, categoryId, hashtags, } = body;

    if (!title || !content) {
      const errorResponse: ApiError = {
        response: null,
        message: '제목과 내용은 필수입니다.',
        status: 400,
      };
      return NextResponse.json(errorResponse, { status: 400, });
    }

    // 4. 포스트 생성
    const newPost = await DB.posts().create({
      data: {
        post_title: title,
        post_slug: title.toLowerCase().replace(/\s+/g, '-'),
        post_content: content,
        post_excerpt: excerpt,
        category_id: categoryId,
        author_id: session.user.id,
        post_status: 'DRAFT',
      },
      select: {
        post_id: true,
        post_title: true,
        post_slug: true,
        created_at: true,
      },
    });

    const successResponse: ApiResponse<typeof newPost> = {
      response: newPost,
      message: '포스트가 생성되었습니다.',
      status: 201,
    };

    return NextResponse.json(successResponse, { status: 201, });

  } catch (error) {
    console.error('포스트 생성 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 생성 중 오류가 발생했습니다.',
      status: 500,
    };

    return NextResponse.json(errorResponse, { status: 500, });
  }
}
