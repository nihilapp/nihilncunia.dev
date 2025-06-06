import { NextRequest, NextResponse } from 'next/server';
import type { ApiError, ApiResponse, UpdateUserPassword } from '@/_types';
import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;
    const body: UpdateUserPassword = await request.json();

    const { oldPassword, newPassword, } = body;

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

    const userAuth = await DB.userAuths().findUnique({
      where: {
        user_id: user.id,
      },
    });

    const compareCurrentPassword = await serverTools.bcrypt.dataCompare(
      userAuth.hashed_password,
      oldPassword
    );

    if (!compareCurrentPassword) {
      const errorResponse: ApiError = {
        message: '기존 비밀번호가 일치하지 않습니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 400, }
      );
    }

    const hashedPassword = await serverTools.bcrypt.dataToHash(newPassword);

    await DB.userAuths().update({
      where: {
        user_id: user.id,
      },
      data: {
        ...userAuth,
        hashed_password: hashedPassword,
      },
    });

    const response: ApiResponse<null> = {
      message: '비밀번호가 성공적으로 변경되었습니다.',
      response: null,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error) {
    console.error(error);

    const errorResponse: ApiError = {
      message: '비밀번호 수정 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
