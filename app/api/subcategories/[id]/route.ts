import { NextRequest, NextResponse } from 'next/server';

import type { UpdateSubcategory } from '@/_entities/subcategories';
import { DB, jwtAuth } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/subcategories/[id] - 개별 서브카테고리 조회
export async function GET(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    const subcategory = await DB.subcategories().findUnique({
      where: { id, },
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

    if (!subcategory) {
      return NextResponse.json(
        {
          message: '서브카테고리를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    const subcategoryWithCount = {
      ...subcategory,
      post_count: subcategory.posts.length,
      published_post_count: subcategory.posts.filter(post => post.status === 'PUBLISHED').length,
      posts: undefined,
    };

    return NextResponse.json({
      message: '서브카테고리 조회 성공',
      response: subcategoryWithCount,
    });
  } catch (error) {
    console.error('서브카테고리 조회 에러:', error);
    return NextResponse.json(
      {
        message: '서브카테고리 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// PUT /api/subcategories/[id] - 서브카테고리 수정 (Admin)
export async function PUT(request: NextRequest, { params, }: Params) {
  try {
    const authResult = await jwtAuth(request);
    if (authResult.response) {
      return authResult.response;
    }

    const { id, } = await params;
    const body: UpdateSubcategory = await request.json();

    const existingSubcategory = await DB.subcategories().findUnique({
      where: { id, },
    });

    if (!existingSubcategory) {
      return NextResponse.json(
        {
          message: '서브카테고리를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    const updateData: any = {};

    if (body.name) {
      updateData.name = body.name;
      updateData.slug = body.slug || body.name
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    }

    if (body.description !== undefined) {
      updateData.description = body.description;
    }

    const subcategory = await DB.subcategories().update({
      where: { id, },
      data: updateData,
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
      message: '서브카테고리 수정 성공',
      response: subcategory,
    });
  } catch (error) {
    console.error('서브카테고리 수정 에러:', error);
    return NextResponse.json(
      {
        message: '서브카테고리 수정 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// DELETE /api/subcategories/[id] - 서브카테고리 삭제 (Admin)
export async function DELETE(request: NextRequest, { params, }: Params) {
  try {
    const authResult = await jwtAuth(request);
    if (authResult.response) {
      return authResult.response;
    }

    const { id, } = await params;

    const existingSubcategory = await DB.subcategories().findUnique({
      where: { id, },
      include: {
        posts: {
          select: { id: true, },
        },
      },
    });

    if (!existingSubcategory) {
      return NextResponse.json(
        {
          message: '서브카테고리를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    // 연결된 포스트가 있는지 확인
    if (existingSubcategory.posts.length > 0) {
      return NextResponse.json(
        {
          message: '연결된 포스트가 있어 삭제할 수 없습니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    await DB.subcategories().delete({
      where: { id, },
    });

    return NextResponse.json({
      message: '서브카테고리 삭제 성공',
      response: null,
    });
  } catch (error) {
    console.error('서브카테고리 삭제 에러:', error);
    return NextResponse.json(
      {
        message: '서브카테고리 삭제 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
