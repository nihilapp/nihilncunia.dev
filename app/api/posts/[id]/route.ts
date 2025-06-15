import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import { DB } from '@/api/_libs';
import { requireAdmin, requireOwnerOrAdmin } from '@/api/_libs/auth-helpers';

interface Params {
  params: Promise<{ id: string }>
}

// GET - 포스트 상세 조회 (인증 불필요)
export async function GET(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    const post = await DB.posts().findUnique({
      where: { post_id: id, },
      include: {
        author: {
          select: {
            display_name: true,
          },
        },
        category: {
          select: {
            category_name: true,
          },
        },
      },
    });

    if (!post) {
      const errorResponse: ApiError = {
        response: null,
        message: '포스트를 찾을 수 없습니다.',
        status: 404,
      };
      return NextResponse.json(errorResponse, { status: 404, });
    }

    const successResponse: ApiResponse<typeof post> = {
      response: post,
      message: '포스트를 조회했습니다.',
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

// PUT - 포스트 수정 (작성자 또는 관리자만)
export async function PUT(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    // 포스트 조회
    const existingPost = await DB.posts().findUnique({
      where: { post_id: id, },
      select: { author_id: true, },
    });

    if (!existingPost) {
      const errorResponse: ApiError = {
        response: null,
        message: '포스트를 찾을 수 없습니다.',
        status: 404,
      };
      return NextResponse.json(errorResponse, { status: 404, });
    }

    // 권한 확인 (작성자 또는 관리자)
    const authResult = await requireOwnerOrAdmin(existingPost.author_id);
    if (!authResult.success) {
      return authResult.response!;
    }

    // 요청 데이터 파싱
    const body = await request.json();
    const { title, content, excerpt, status, } = body;

    // 포스트 수정
    const updatedPost = await DB.posts().update({
      where: { post_id: id, },
      data: {
        post_title: title,
        post_content: content,
        post_excerpt: excerpt,
        post_status: status,
        updated_at: new Date(),
      },
      select: {
        post_id: true,
        post_title: true,
        updated_at: true,
      },
    });

    const successResponse: ApiResponse<typeof updatedPost> = {
      response: updatedPost,
      message: '포스트가 수정되었습니다.',
      status: 200,
    };

    return NextResponse.json(successResponse, { status: 200, });

  } catch (error) {
    console.error('포스트 수정 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 수정 중 오류가 발생했습니다.',
      status: 500,
    };

    return NextResponse.json(errorResponse, { status: 500, });
  }
}

// DELETE - 포스트 삭제 (관리자만)
export async function DELETE(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    // 관리자 권한 확인
    const authResult = await requireAdmin();
    if (!authResult.success) {
      return authResult.response!;
    }

    // 포스트 존재 확인
    const existingPost = await DB.posts().findUnique({
      where: { post_id: id, },
    });

    if (!existingPost) {
      const errorResponse: ApiError = {
        response: null,
        message: '포스트를 찾을 수 없습니다.',
        status: 404,
      };
      return NextResponse.json(errorResponse, { status: 404, });
    }

    // 포스트 삭제
    await DB.posts().delete({
      where: { post_id: id, },
    });

    const successResponse: ApiResponse<null> = {
      response: null,
      message: '포스트가 삭제되었습니다.',
      status: 200,
    };

    return NextResponse.json(successResponse, { status: 200, });

  } catch (error) {
    console.error('포스트 삭제 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 삭제 중 오류가 발생했습니다.',
      status: 500,
    };

    return NextResponse.json(errorResponse, { status: 500, });
  }
}
