import { NextRequest, NextResponse } from 'next/server';

import { type SignInUser } from '@/_entities/user-auth';
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
    const requestData = await request.json() as SignInUser;

    const { email, password, } = requestData;

    // 이메일로 사용자 계정 찾기
    const findUser = await DB.user().findUnique({
      where: { email, },
      include: {
        user_auth: true,
      },
    });

    if (!findUser) {
      const errorResponse = {
        success: false,
        message: '존재하지 않는 사용자 계정입니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    // 비밀번호 검증
    const isValidPassword = await serverTools.bcrypt!.dataCompare(
      findUser.user_auth!.hashed_password,
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
    const tokens = await serverTools.jwt!.genTokens(findUser);

    // 리프레시 토큰을 데이터베이스에 저장
    await DB.userAuth().update({
      where: { user_id: findUser.id, },
      data: { refresh_token: tokens.refreshToken.token, },
    });

    // 쿠키에 토큰 설정
    await serverTools.cookie!.set(
      'accessToken',
      tokens.accessToken.token,
      60 * 60 // 1시간
    );

    await serverTools.cookie!.set(
      'refreshToken',
      tokens.refreshToken.token,
      60 * 60 * 24 * 30 // 30일
    );

    // 마지막 로그인 시간 업데이트
    await DB.user().update({
      where: { id: findUser.id, },
      data: { last_sign_in: new Date(), },
    });

    const successResponse = {
      success: true,
      message: '로그인 성공',
      response: {
        id: findUser.id,
        email: findUser.email,
        name: findUser.name,
        role: findUser.role,
      },
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    console.error('로그인 에러:', error);

    const errorResponse = {
      success: false,
      message: '로그인 처리 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
