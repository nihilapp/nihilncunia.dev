import { NextRequest, NextResponse } from 'next/server';
import type { User } from '@/_prisma/client';
import type { ApiResponse, ApiError } from '@/_types';
import { DB } from '@/api/_libs';

interface Params {
  params: Promise<{ email: string }>;
}

// GET /api/users/email/[email] - 이메일로 사용자 조회
export async function GET(_request: NextRequest, { params, }: Params) {
  try {
    const decodedParams = await params;
    const email = decodeURIComponent(decodedParams.email);

    const user = await DB.users().findUnique({
      where: { email, },
    });

    if (!user) {
      const errorResponse: ApiError = {
        message: '해당 이메일의 사용자를 찾을 수 없습니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    const response: ApiResponse<User> = {
      message: '사용자 정보를 성공적으로 조회했습니다.',
      response: user,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error) {
    console.error('사용자 정보 조회 중 오류가 발생했습니다.', error);

    const errorResponse: ApiError = {
      message: '사용자 정보 조회 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
