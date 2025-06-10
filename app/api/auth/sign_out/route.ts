import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import type { SignOutUser } from '@/_entities/user-auth';
import {
  DB, getHeaderToken, serverTools, refreshCheck
} from '@/api/_libs';

export async function POST(request: NextRequest) {
  try {
    // HTTP-only 쿠키에서 토큰 제거
    const response = NextResponse.json(
      {
        success: true,
        message: '로그아웃되었습니다.',
      },
      { status: 200, }
    );

    // 쿠키 삭제
    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('로그아웃 API 에러:', error);

    const errorResponse = {
      success: false,
      message: '서버 내부 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
