import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, serverTools } from '@/api/_libs';

// POST /api/auth/sign_out - 로그아웃 (인증 필요)
export async function POST(request: NextRequest) {
  try {
    // JWT 인증
    const accessToken = getHeaderToken(request);

    if (!accessToken) {
      const errorResponse: ApiError = {
        response: null,
        message: '액세스 토큰이 필요합니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 401, }
      );
    }

    // JWT 토큰에서 사용자 ID 추출
    let userId: string;

    try {
      const tokenData = await serverTools.jwt!.tokenInfo('accessToken', accessToken);
      userId = tokenData.id;
    } catch (error) {
      console.error('로그아웃 중 토큰 디코딩 오류:', error);

      const errorResponse: ApiError = {
        response: null,
        message: '유효하지 않은 토큰입니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 401, }
      );
    }

    // 토큰 검증 및 갱신
    const checkResult = await refreshCheck(
      userId,
      accessToken
    );

    if (checkResult.error) {
      console.error('로그아웃 중 토큰 검증 오류:', checkResult.error);

      const errorResponse: ApiError = {
        response: null,
        message: checkResult.message,
      };

      return NextResponse.json(
        errorResponse,
        { status: checkResult.status, }
      );
    }

    // DB에서 사용자의 refresh token 무효화
    const findUserAuth = await DB.userAuth().findUnique({
      where: { user_id: userId, },
    });

    if (findUserAuth) {
      await DB.userAuth().update({
        where: { user_id: userId, },
        data: { refresh_token: null, },
      });
    }

    // HTTP-only 쿠키에서 토큰 제거
    const successResponse: ApiResponse<null> = {
      response: null,
      message: '성공적으로 로그아웃되었습니다.',
    };

    const response = NextResponse.json(
      successResponse,
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
    console.error('로그아웃 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '로그아웃 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
