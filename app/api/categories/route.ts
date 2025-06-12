import { NextRequest, NextResponse } from 'next/server';

import type { CreateCategory } from '@/_entities/categories';
import { DB, jwtAuth } from '@/api/_libs';

// GET /api/categories - 모든 카테고리 조회
export async function GET() {
  try {
    const categories = await DB.categories().findMany({
      orderBy: { created_at: 'desc', },
      include: {
        posts: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    // 카테고리별 포스트 개수 계산
    const categoriesWithCount = categories.map((category) => ({
      ...category,
      post_count: category.posts.length,
      published_post_count: category.posts.filter(post => post.status === 'PUBLISHED').length,
      posts: undefined, // 응답에서 제외
    }));

    return NextResponse.json({
      message: '카테고리 목록 조회 성공',
      response: categoriesWithCount,
    });
  } catch (error) {
    console.error('카테고리 목록 조회 에러:', error);
    return NextResponse.json(
      {
        message: '카테고리 목록 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// POST /api/categories - 새 카테고리 생성 (Admin)
export async function POST(req: NextRequest) {
  try {
    // JWT 인증
    const authResult = await jwtAuth(req);
    if (authResult.response) {
      return authResult.response;
    }

    const body: CreateCategory = await req.json();
    if (!body.name) {
      return NextResponse.json(
        {
          message: '카테고리 이름은 필수입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 슬러그 생성
    const slug = body.slug || body.name
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    // 카테고리 이름 중복 체크
    const existingCategory = await DB.categories().findFirst({
      where: {
        OR: [
          { name: body.name, },
          { slug, },
        ],
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          message: '이미 존재하는 카테고리 이름 또는 슬러그입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    const category = await DB.categories().create({
      data: {
        name: body.name,
        slug,
        description: body.description,
        color: body.color,
      },
    });

    return NextResponse.json({
      message: '카테고리 생성 성공',
      response: category,
    });
  } catch (error) {
    console.error('카테고리 생성 에러:', error);
    return NextResponse.json(
      {
        message: '카테고리 생성 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
