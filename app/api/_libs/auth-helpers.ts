import { NextResponse } from 'next/server';

import { auth } from '../../../auth';

import type { ApiError } from '@/_entities/common';

export interface AuthResult {
  success: boolean
  session?: any
  response?: NextResponse
}

/**
 * 로그인 여부만 확인
 */
export async function requireAuth(): Promise<AuthResult> {
  const session = await auth();

  if (!session?.user) {
    const errorResponse: ApiError = {
      response: null,
      message: '로그인이 필요합니다.',
      status: 401,
    };

    return {
      success: false,
      response: NextResponse.json(errorResponse, { status: 401, }),
    };
  }

  return {
    success: true,
    session,
  };
}

/**
 * 관리자 권한 확인 (ADMIN 또는 SUPER_ADMIN)
 */
export async function requireAdmin(): Promise<AuthResult> {
  const authResult = await requireAuth();

  if (!authResult.success) {
    return authResult;
  }

  const { session, } = authResult;

  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    const errorResponse: ApiError = {
      response: null,
      message: '관리자 권한이 필요합니다.',
      status: 403,
    };

    return {
      success: false,
      response: NextResponse.json(errorResponse, { status: 403, }),
    };
  }

  return {
    success: true,
    session,
  };
}

/**
 * 슈퍼 관리자 권한 확인
 */
export async function requireSuperAdmin(): Promise<AuthResult> {
  const authResult = await requireAuth();

  if (!authResult.success) {
    return authResult;
  }

  const { session, } = authResult;

  if (session.user.role !== 'SUPER_ADMIN') {
    const errorResponse: ApiError = {
      response: null,
      message: '슈퍼 관리자 권한이 필요합니다.',
      status: 403,
    };

    return {
      success: false,
      response: NextResponse.json(errorResponse, { status: 403, }),
    };
  }

  return {
    success: true,
    session,
  };
}

/**
 * 본인 또는 관리자 권한 확인
 */
export async function requireOwnerOrAdmin(resourceUserId: string): Promise<AuthResult> {
  const authResult = await requireAuth();

  if (!authResult.success) {
    return authResult;
  }

  const { session, } = authResult;

  // 본인이거나 관리자인 경우 허용
  const isOwner = session.user.id === resourceUserId;
  const isAdmin = session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN';

  if (!isOwner && !isAdmin) {
    const errorResponse: ApiError = {
      response: null,
      message: '본인 또는 관리자만 접근할 수 있습니다.',
      status: 403,
    };

    return {
      success: false,
      response: NextResponse.json(errorResponse, { status: 403, }),
    };
  }

  return {
    success: true,
    session,
  };
}
