import type { Token } from '@/_entities/auth';

// 토큰 만료 여부를 확인하는 유틸 함수
// exp: 만료 시간(초 단위, UNIX timestamp)
export function isTokenExpired(exp: number): boolean {
  // 현재 시간(초 단위)
  const now = Math.floor(Date.now() / 1000);
  return exp < now;
}

// 액세스/리프레시 토큰의 만료 여부를 한 번에 판단하는 함수
export function checkTokenValidity(
  accessToken?: Token | null,
  refreshToken?: Token | null
): { accessValid: boolean; refreshValid: boolean } {
  const accessValid = !!accessToken && !isTokenExpired(accessToken.exp);
  const refreshValid = !!refreshToken && !isTokenExpired(refreshToken.exp);
  return { accessValid, refreshValid, };
}
