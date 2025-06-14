import { NextRequest, NextResponse } from 'next/server';

import { refresh } from '@/api/_libs/refresh';
import { checkTokenValidity } from '@/api/_libs/tokenUtils';

export async function refreshCheck(request: NextRequest) {
  //액세스 토큰과 리프레시 토큰 쿠키를 가져옴.
  const { accessToken, refreshToken, accessValid, refreshValid, } = await checkTokenValidity();

  if (!accessValid && !refreshValid) {
    // 로그인 페이지로 이동시키기.
    return NextResponse
      .redirect(new URL('/login', request.url));
  }

  if (!accessValid && refreshValid) {
    return refresh();
  }

  return true;
}
