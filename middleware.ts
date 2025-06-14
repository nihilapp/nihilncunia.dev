import { NextResponse, type NextRequest } from 'next/server';

import type { Token, Tokens } from '@/_entities/auth';
import { Api } from '@/_libs';
import { isTokenExpired, serverTools } from '@/api/_libs';

// 미들웨어가 실행될 경로를 정의합니다.
// 블로그이므로 관리자 페이지(admin/)에만 인증이 필요합니다.
export const config = {
  matcher: [
    /*
     * admin/ 경로에서만 미들웨어를 실행합니다.
     * 일반 블로그 포스트, 홈페이지, 카테고리 등은 누구나 접근 가능해야 합니다.
     */
    '/admin/:path*',
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname, } = request.nextUrl;

  // 쿠키에서 토큰을 가져옵니다.
  const accessToken = await serverTools.cookie.get<Token>('access');
  const refreshToken = await serverTools.cookie.get<Token>('refresh');

  // 1. 액세스 토큰이 없으면 로그인으로 이동
  if (pathname.startsWith('/admin') && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. 액세스 토큰이 있으면 유효성 검사
  if (accessToken) {
    const tokenInfo = await serverTools.jwt.tokenInfo('accessToken', accessToken.token);
    const isAccessValid = !isTokenExpired(tokenInfo.exp);

    if (isAccessValid) {
      // 액세스 토큰이 유효하면 정상 진행
      return NextResponse.next();
    }

    // 액세스 토큰이 만료된 경우
    // 3. 리프레시 토큰이 없거나 만료되었으면 로그인으로 이동
    if (!refreshToken || isTokenExpired(refreshToken.exp)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 4. 리프레시 토큰이 유효하면 재발급 요청 (쿠키 등록은 라우트에서 처리)
    const res = await Api.postQuery<Tokens, null>('/auth/refresh', null);
    console.log('처리 결과:', res.message);
    return NextResponse.next();
  }

  // 5. 그 외의 경우(예외)에도 정상 진행
  return NextResponse.next();
}
