import { NextRequest, NextResponse } from 'next/server';

import type { CreateSubcategory } from '@/_entities/subcategories';
import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

// GET /api/subcategories - 서브카테고리 조회
export async function GET(req: NextRequest) {
  try {
    const { searchParams, } = new URL(req.url);
    const categoryId = searchParams.get('category_id');

    const where: any = {};
    if (categoryId) {
      where.category_id = categoryId;
    }

    const subcategories = await DB.subcategories().findMany({
      where,
      orderBy: { created_at: 'desc', },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
          },
        },
        posts: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    const subcategoriesWithCount = subcategories.map((subcategory) => ({
      ...subcategory,
      post_count: subcategory.posts.length,
      published_post_count: subcategory.posts.filter(post => post.status === 'PUBLISHED').length,
      posts: undefined,
    }));

    return NextResponse.json({
      message: '서브카테고리 목록 조회 성공',
      response: subcategoriesWithCount,
    });
  } catch (error) {
    console.error('서브카테고리 목록 조회 에러:', error);
    return NextResponse.json(
      {
        message: '서브카테고리 목록 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// POST /api/subcategories - 새 서브카테고리 생성 (Admin)
export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get('access_token');
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

    const body: CreateSubcategory = await req.json();
    if (!body.name || !body.category_id) {
      return NextResponse.json(
        {
          message: '서브카테고리 이름과 상위 카테고리는 필수입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    const slug = body.slug || body.name
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    const existingSubcategory = await DB.subcategories().findFirst({
      where: {
        OR: [
          { name: body.name, category_id: body.category_id, },
          { slug, category_id: body.category_id, },
        ],
      },
    });

    if (existingSubcategory) {
      return NextResponse.json(
        {
          message: '해당 카테고리에 이미 존재하는 서브카테고리 이름 또는 슬러그입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    const subcategory = await DB.subcategories().create({
      data: {
        name: body.name,
        slug,
        description: body.description,
        color: body.color,
        category_id: body.category_id,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: '서브카테고리 생성 성공',
      response: subcategory,
    });
  } catch (error) {
    console.error('서브카테고리 생성 에러:', error);
    return NextResponse.json(
      {
        message: '서브카테고리 생성 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}