import { NextResponse, type NextRequest } from 'next/server';

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
  console.log('어드민 페이지 입니다.');

  return NextResponse.next();
}
