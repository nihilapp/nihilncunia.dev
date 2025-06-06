import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { type AdminSession } from '@/_types';
import { prisma } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

export interface AuthenticatedRequest extends NextRequest {
  admin?: AdminSession;
}

export async function authenticate(request: NextRequest): Promise<{
  success: boolean;
  admin?: AdminSession;
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
      tokenData = await serverTools.adminJwt!.tokenInfo('accessToken', accessToken);
    } catch (error) {
      return {
        success: false,
        error: '유효하지 않은 액세스 토큰입니다.',
        status: 401,
      };
    }

    // 관리자 계정 확인
    const findAdmin = await prisma.admin.findUnique({
      where: { id: tokenData.id, },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!findAdmin) {
      return {
        success: false,
        error: '존재하지 않는 관리자 계정입니다.',
        status: 404,
      };
    }

    // 토큰 만료 시간 확인
    const remainingTime = serverTools.adminJwt!.expCheck(tokenData.exp);

    if (remainingTime <= 0) {
      return {
        success: false,
        error: '만료된 액세스 토큰입니다.',
        status: 401,
      };
    }

    return {
      success: true,
      admin: findAdmin,
    };
  } catch (error: any) {
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

  // 인증된 관리자 정보를 request에 추가
  const authenticatedRequest = request as AuthenticatedRequest;
  authenticatedRequest.admin = authResult.admin;

  return handler(authenticatedRequest);
}
