import { NextRequest, NextResponse } from 'next/server';

import { type AdminSignIn } from '@/_types';
import { DB, serverTools } from '@/api/_libs';
import {
  applySecurityMiddleware,
  createSecurityErrorResponse
} from '@/api/_libs';

export async function POST(request: NextRequest) {
  // 보안 미들웨어 적용
  const securityCheck = applySecurityMiddleware(request, {
    enableCORS: true,
    enableValidation: true,
    enableCSRF: false, // 로그인은 CSRF 토큰 없이 허용
  });

  if (securityCheck.response) {
    return securityCheck.response;
  }

  if (securityCheck.error) {
    return createSecurityErrorResponse(securityCheck.error, 400);
  }

  try {
    const requestData = await request.json() as AdminSignIn;

    const { email, password, } = requestData;

    // 이메일로 관리자 계정 찾기
    const findAdmin = await DB.admin().findUnique({
      where: { email, },
      include: {
        admin_auth: true,
      },
    });

    if (!findAdmin) {
      const errorResponse = {
        success: false,
        message: '존재하지 않는 관리자 계정입니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    // 비밀번호 검증
    const isValidPassword = await serverTools.bcrypt!.dataCompare(
      findAdmin.admin_auth!.hashed_password,
      password
    );

    if (!isValidPassword) {
      const errorResponse = {
        success: false,
        message: '비밀번호가 일치하지 않습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 401, }
      );
    }

    // JWT 토큰 생성
    const tokens = await serverTools.adminJwt!.genTokens(findAdmin);

    // HTTP-only 쿠키에 토큰 저장
    const response = NextResponse.json(
      {
        success: true,
        message: '로그인에 성공했습니다.',
        admin: {
          id: findAdmin.id,
          name: findAdmin.name,
          email: findAdmin.email,
        },
      },
      { status: 200, }
    );

    // 쿠키 설정
    response.cookies.set('accessToken', tokens.accessToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1시간
      path: '/',
    });

    response.cookies.set('refreshToken', tokens.refreshToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('로그인 API 에러:', error);

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
