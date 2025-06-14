import { NextRequest } from 'next/server';

import { DB } from './prisma';
import { refresh } from './refresh';
import { checkTokenValidity } from './tokenUtils';
import { serverTools } from './tools';

import type { UserSession } from '@/_entities/users';

export async function getValidSession(request: NextRequest) {
  const { accessToken, refreshToken, accessValid, refreshValid, } = await checkTokenValidity();

  if (!accessValid && !refreshValid) {
    return { error: true, status: 401, message: '로그인이 필요합니다.', session: null, };
  }

  let user: UserSession;
  let newAccessToken = accessToken?.token;

  if (!accessValid && refreshValid) {
    const refreshResult = await refresh();

    if (refreshResult.status !== 200) {
      return { error: true, status: 401, message: '토큰 갱신 실패', session: null, };
    }
    newAccessToken = refreshResult.data.accessToken;
  }

  const tokenInfo = await serverTools.jwt.tokenInfo('accessToken', newAccessToken);
  user = await DB.user().findUnique({ where: { id: tokenInfo.id, }, });

  if (!user) {
    return { error: true, status: 404, message: '사용자 정보를 찾을 수 없습니다.', session: null, };
  }

  return { error: false, status: 200, message: 'OK', session: user, };
}
