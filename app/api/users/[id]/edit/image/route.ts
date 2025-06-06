import { NextRequest, NextResponse } from 'next/server';
import type { ApiError, ApiResponse, UpdateUserImage } from '@/_types';
import { DB } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;
    const body: UpdateUserImage = await request.json();

    const { image, } = body;

    const user = await DB.users().findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      const errorResponse: ApiError = {
        message: '존재하지 않는 사용자입니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    await DB.users().update({
      where: {
        id,
      },
      data: {
        ...user,
        image_url: image,
      },
    });

    const response: ApiResponse<null> = {
      message: '사용자 이미지가 성공적으로 수정되었습니다.',
      response: null,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error) {
    console.error(error);

    const errorResponse: ApiError = {
      message: '사용자 이미지 수정 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
