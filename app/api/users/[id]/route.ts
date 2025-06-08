import { NextResponse } from 'next/server';

import type { UpdateUser } from '@/_types';
import { DB, serverTools } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/users/[id] - ID로 사용자 조회
export async function GET(request: Request, { params, }: Params) {
  try {
    const { id, } = await params;

    const user = await DB.user().findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: '사용자를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    return NextResponse.json({
      message: '사용자 조회 성공',
      response: user,
    });
  } catch (error) {
    console.error('사용자 조회 에러:', error);
    return NextResponse.json(
      {
        message: '사용자 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// PUT /api/users/[id] - 사용자 정보 수정
export async function PUT(request: Request, { params, }: Params) {
  try {
    const { id, } = await params;
    const body: UpdateUser = await request.json();

    const user = await DB.user().update({
      where: {
        id,
      },
      data: body,
    });

    return NextResponse.json({
      message: '사용자 수정 성공',
      response: user,
    });
  } catch (error) {
    console.error('사용자 수정 에러:', error);
    return NextResponse.json(
      {
        message: '사용자 수정 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// DELETE /api/users/[id] - 사용자 삭제
export async function DELETE(request: Request, { params, }: Params) {
  try {
    const { id, } = await params;

    await DB.user().delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: '사용자 삭제 성공',
      response: null,
    });
  } catch (error) {
    console.error('사용자 삭제 에러:', error);
    return NextResponse.json(
      {
        message: '사용자 삭제 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
