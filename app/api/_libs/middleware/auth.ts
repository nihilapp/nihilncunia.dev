import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { type UserSession } from '@/_types';
import { DB, serverTools } from '@/api/_libs';

export interface AuthenticatedRequest extends NextRequest {
  user?: UserSession;
}

export async function authenticate(request: NextRequest): Promise<{
  success: boolean;
  user?: UserSession;
  error?: string;
  status?: number;
}> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return {
        success: false,
        error: '액세스 토큰이 없습니다.',
        status: 401,
      };
    }

    // 액세스 토큰 검증
    let tokenData;
    try {
      tokenData = await serverTools.jwt!.tokenInfo('accessToken', accessToken);
    } catch (error) {
      return {
        success: false,
        error: '유효하지 않은 액세스 토큰입니다.',
        status: 401,
      };
    }

    // 사용자 계정 확인
    const findUser = await DB.user().findUnique({
      where: { id: tokenData.id, },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!findUser) {
      return {
        success: false,
        error: '존재하지 않는 사용자 계정입니다.',
        status: 404,
      };
    }

    // 토큰 만료 시간 확인
    const remainingTime = serverTools.jwt!.expCheck(tokenData.exp);

    if (remainingTime <= 0) {
      return {
        success: false,
        error: '만료된 액세스 토큰입니다.',
        status: 401,
      };
    }

    return {
      success: true,
      user: findUser,
    };
  } catch (error) {
    console.error('인증 미들웨어 에러:', error);

    return {
      success: false,
      error: '서버 내부 오류가 발생했습니다.',
      status: 500,
    };
  }
}

export function createAuthResponse(
  success: boolean,
  message: string,
  status: number,
  data?: any
) {
  const response = {
    success,
    message,
    ...(data && { data, }),
  };

  return NextResponse.json(response, { status, });
}

export async function requireAuth(
  request: NextRequest,
  handler: (request: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const authResult = await authenticate(request);

  if (!authResult.success) {
    return createAuthResponse(
      false,
      authResult.error!,
      authResult.status!
    );
  }

  // 인증된 사용자 정보를 request에 추가
  const authenticatedRequest = request as AuthenticatedRequest;
  authenticatedRequest.user = authResult.user;

  return handler(authenticatedRequest);
}
