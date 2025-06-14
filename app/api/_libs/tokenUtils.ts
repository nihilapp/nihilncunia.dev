import type { Token } from '@/_entities/auth';
import { serverTools } from '@/api/_libs/tools';

interface TokenValidity {
  accessToken: Token | null;
  refreshToken: Token | null;
  accessValid: boolean;
  refreshValid: boolean;
}

// 액세스/리프레시 토큰의 만료 여부를 한 번에 판단하는 함수
export async function checkTokenValidity(): Promise<TokenValidity> {
  const accessToken: Token = await serverTools.cookie.get('accessToken');
  const refreshToken: Token = await serverTools.cookie.get('refreshToken');

  // 0보다 크면 유효.
  const accessValid = !!accessToken
    && serverTools.jwt.expCheck(accessToken.exp) > 0;
  const refreshValid = !!refreshToken
    && serverTools.jwt.expCheck(refreshToken.exp) > 0;

  return { accessToken, refreshToken, accessValid, refreshValid, };
}
