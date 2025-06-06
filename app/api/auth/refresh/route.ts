import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

// GET: 토큰 검증
export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      const errorResponse = {
        success: false,
        message: '액세스 토큰이 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 401, }
      );
    }

    // 액세스 토큰 검증
    let tokenData;
    try {
      tokenData = await serverTools.adminJwt!.tokenInfo('accessToken', accessToken);
    } catch (error: any) {
      console.error('액세스 토큰 검증 실패:', error);

      const errorResponse = {
        success: false,
        message: '유효하지 않은 액세스 토큰입니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 401, }
      );
    }

    // 관리자 계정 확인
    const findAdmin = await prisma.admin.findUnique({
      where: { id: tokenData.id, },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
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

    // 토큰 만료 시간 확인
    const remainingTime = serverTools.adminJwt!.expCheck(tokenData.exp);

    if (remainingTime <= 0) {
      const errorResponse = {
        success: false,
        message: '만료된 액세스 토큰입니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 401, }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: '유효한 토큰입니다.',
        admin: findAdmin,
        remainingTime,
      },
      { status: 200, }
    );
  } catch (error: any) {
    console.error('토큰 검증 API 에러:', error);

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

// POST: 토큰 갱신
export async function POST(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      const errorResponse = {
        success: false,
        message: '리프레시 토큰이 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 401, }
      );
    }

    // 리프레시 토큰 검증
    let tokenData;
    try {
      tokenData = await serverTools.adminJwt!.tokenInfo('refreshToken', refreshToken);
    } catch (error: any) {
      console.error('리프레시 토큰 검증 실패:', error);

      const errorResponse = {
        success: false,
        message: '유효하지 않은 리프레시 토큰입니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 401, }
      );
    }

    // 관리자 계정 확인
    const findAdmin = await prisma.admin.findUnique({
      where: { id: tokenData.id, },
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

    // 새로운 액세스 토큰 생성
    const newTokens = await serverTools.adminJwt!.genTokens(findAdmin);

    const response = NextResponse.json(
      {
        success: true,
        message: '토큰이 갱신되었습니다.',
      },
      { status: 200, }
    );

    // 새로운 액세스 토큰 쿠키 설정
    response.cookies.set('accessToken', newTokens.accessToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1시간
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('토큰 갱신 API 에러:', error);

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
