import { NextRequest, NextResponse } from 'next/server';

import type { UpdateCategory } from '@/_entities/categories';
import { DB, jwtAuth } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

// PUT /api/categories/[id] - 카테고리 수정 (Admin)
export async function PUT(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    // JWT 인증
    const authResult = await jwtAuth(request);
    if (authResult.response) {
      return authResult.response;
    }

    // 기존 카테고리 확인
    const existingCategory = await DB.categories().findUnique({
      where: { id, },
    });

    if (!existingCategory) {
      return NextResponse.json(
        {
          message: '수정할 카테고리를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    const body: UpdateCategory = await request.json();
    if (!body.name) {
      return NextResponse.json(
        {
          message: '카테고리 이름은 필수입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 슬러그 처리
    let slug = existingCategory.slug;
    if (body.slug && body.slug !== existingCategory.slug) {
      slug = body.slug;
    } else if (body.name !== existingCategory.name) {
      slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    }

    // 카테고리 이름/슬러그 중복 체크 (현재 카테고리 제외)
    const duplicateCategory = await DB.categories().findFirst({
      where: {
        AND: [
          { id: { not: id, }, },
          {
            OR: [
              { name: body.name, },
              { slug, },
            ],
          },
        ],
      },
    });

    if (duplicateCategory) {
      return NextResponse.json(
        {
          message: '이미 존재하는 카테고리 이름 또는 슬러그입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    const updatedCategory = await DB.categories().update({
      where: { id, },
      data: {
        name: body.name,
        slug,
        description: body.description,
        color: body.color,
      },
    });

    return NextResponse.json({
      message: '카테고리 수정 성공',
      response: updatedCategory,
    });
  } catch (error) {
    console.error('카테고리 수정 에러:', error);
    return NextResponse.json(
      {
        message: '카테고리 수정 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// DELETE /api/categories/[id] - 카테고리 삭제 (Admin)
export async function DELETE(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    // JWT 인증
    const authResult = await jwtAuth(request);
    if (authResult.response) {
      return authResult.response;
    }

    // 카테고리 존재 확인
    const existingCategory = await DB.categories().findUnique({
      where: { id, },
      include: {
        posts: true,
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        {
          message: '삭제할 카테고리를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    // 카테고리에 포스트가 있는지 확인
    if (existingCategory.posts.length > 0) {
      return NextResponse.json(
        {
          message: '해당 카테고리에 포스트가 존재하여 삭제할 수 없습니다. 먼저 포스트를 다른 카테고리로 이동하거나 삭제해주세요.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 카테고리 삭제
    await DB.categories().delete({
      where: { id, },
    });

    return NextResponse.json({
      message: '카테고리 삭제 성공',
      response: null,
    });
  } catch (error) {
    console.error('카테고리 삭제 에러:', error);
    return NextResponse.json(
      {
        message: '카테고리 삭제 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
