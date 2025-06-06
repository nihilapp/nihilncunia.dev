import { NextResponse } from 'next/server';

interface Params {
  params: Promise<{ id: string }>;
}

// PUT /api/categories/[id] - 카테고리 수정 (Admin)
export async function PUT(request: Request, { params, }: Params) {
  try {
    const { id, } = await params;

    // TODO: 인증 확인 및 카테고리 수정 구현
    return NextResponse.json({
      message: '카테고리 수정 성공',
      response: { id, },
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
export async function DELETE(request: Request, { params, }: Params) {
  try {
    const { id, } = await params;

    // TODO: 인증 확인 및 카테고리 삭제 구현
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
