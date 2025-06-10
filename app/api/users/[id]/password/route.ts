import { NextResponse } from 'next/server';

import type { UpdateUserPassword } from '@/_entities/users';
import { DB, serverTools } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

// PUT /api/users/[id]/password - 사용자 비밀번호 수정
export async function PUT(request: Request, { params, }: Params) {
  try {
    const { id, } = await params;
    const body: UpdateUserPassword = await request.json();
    const { currentPassword, newPassword, } = body;

    // 현재 사용자 조회
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

    const userAuth = await DB.userAuth().findUnique({
      where: {
        user_id: id,
      },
    });

    // 현재 비밀번호 확인
    const isCurrentPasswordValid = await serverTools.bcrypt!.dataCompare(
      userAuth!.hashed_password,
      currentPassword
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        {
          message: '현재 비밀번호가 올바르지 않습니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 새 비밀번호 해싱
    const hashedNewPassword = await serverTools.bcrypt!.dataToHash(newPassword);

    // 비밀번호 업데이트
    const updatedUser = await DB.userAuth().update({
      where: {
        user_id: id,
      },
      data: {
        hashed_password: hashedNewPassword,
      },
    });

    return NextResponse.json({
      message: '비밀번호 변경 성공',
      response: updatedUser,
    });
  } catch (error) {
    console.error('비밀번호 변경 에러:', error);
    return NextResponse.json(
      {
        message: '비밀번호 변경 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
