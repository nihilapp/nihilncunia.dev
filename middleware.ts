import { NextResponse } from 'next/server';

import { auth } from './auth';

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

export default auth((req) => {
  // 관리자 페이지 접근 시 인증 확인
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!req.auth) {
      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // 관리자 권한 확인
    if (req.auth.user?.role !== 'ADMIN' && req.auth.user?.role !== 'SUPER_ADMIN') {
      // 권한이 없는 경우 홈페이지로 리다이렉트
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
});
