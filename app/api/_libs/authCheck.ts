import type { NextRequest } from 'next/server';

import type { UserSession } from '@/_entities/users';
import { DB } from './prisma';
import { refresh } from './refresh';
import { checkTokenValidity } from './tokenUtils';
import { serverTools } from './tools';

export interface AuthCheckResult {
  error: boolean;
  status: number;
  message: string;
  user?: UserSession;
  accessToken?: string;
}

export async function authCheck(request: NextRequest): Promise<AuthCheckResult> {
  const { accessToken, refreshToken, accessValid, refreshValid } = await checkTokenValidity();

  if (!accessValid && !refreshValid) {
    return { error: true, status: 401, message: '로그인이 필요합니다.' };
  }

  let validAccessToken = accessToken?.token;

  if (!accessValid && refreshValid) {
    const refreshResult = await refresh();

    if (refreshResult.status !== 200) {
      return { error: true, status: 401, message: '토큰 갱신 실패' };
    }

    validAccessToken = refreshResult.data.accessToken;
  }

  const tokenInfo = await serverTools.jwt.tokenInfo('accessToken', validAccessToken);
  const user = await DB.user().findUnique({ where: { id: tokenInfo.id } });

  if (!user) {
    return { error: true, status: 404, message: '사용자 정보를 찾을 수 없습니다.' };
  }

  return { error: false, status: 200, message: 'OK', user, accessToken: validAccessToken };
}

