import { NextResponse } from 'next/server';

import type { UpdateUserImage } from '@/_types';
import { DB } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

// PUT /api/users/[id]/image - 사용자 이미지 수정
export async function PUT(request: Request, { params, }: Params) {
  try {
    const { id, } = await params;
    const body: UpdateUserImage = await request.json();

    const user = await DB.user().update({
      where: {
        id,
      },
      data: {
        image_url: body.image,
      },
    });

    return NextResponse.json({
      message: '사용자 이미지 수정 성공',
      response: user,
    });
  } catch (error) {
    console.error('사용자 이미지 수정 에러:', error);
    return NextResponse.json(
      {
        message: '사용자 이미지 수정 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
