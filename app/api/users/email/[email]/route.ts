import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import { DB } from '@/api/_libs';

interface Params {
  params: Promise<{ email: string }>;
}

// GET /api/users/email/[email] - 이메일로 사용자 조회 (인증 불필요)
export async function GET(request: NextRequest, { params, }: Params) {
  try {
    const { email, } = await params;
    const decodedEmail = decodeURIComponent(email);

    const findUser = await DB.user().findUnique({
      where: { email: decodedEmail, },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        last_sign_in: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!findUser) {
      const errorResponse: ApiError = {
        response: null,
        message: '해당 이메일의 사용자를 찾을 수 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    const successResponse: ApiResponse<typeof findUser> = {
      response: findUser,
      message: '사용자 조회를 성공적으로 완료했습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('사용자 조회 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '사용자 조회 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
