import type { Token } from '@/_entities/auth';
import { UserSession } from '@/_entities/users';
import { createResponse } from '@/api/_libs/createResponse';
import { DB } from '@/api/_libs/prisma';
import { serverTools } from '@/api/_libs/tools';

export async function refresh() {
  const refreshToken: Token = await serverTools.cookie.get('refreshToken');
  if (!refreshToken) {
    return { status: 401, message: '리프레시 토큰이 없습니다.', data: null, };
  }

  const refreshInfo = await serverTools.jwt.tokenInfo('refreshToken', refreshToken.token);
  if (!refreshInfo || refreshInfo.error) {
    return { status: 401, message: '리프레시 토큰이 유효하지 않습니다.', data: null, };
  }

  const user = await DB.user().findUnique({ where: { id: refreshInfo.id, }, });
  if (!user) {
    return { status: 404, message: '사용자를 찾을 수 없습니다.', data: null, };
  }

  const { access: newAccessToken, refresh: newRefreshToken, } = await serverTools.jwt.genTokens(user);

  await serverTools.cookie.set('accessToken', newAccessToken.token, newAccessToken.exp);
  await serverTools.cookie.set('refreshToken', newRefreshToken.token, newRefreshToken.exp);

  return {
    status: 200,
    message: '토큰이 갱신되었습니다.',
    data: {
      accessToken: newAccessToken.token,
      refreshToken: newRefreshToken.token,
      user,
    },
  };
}
