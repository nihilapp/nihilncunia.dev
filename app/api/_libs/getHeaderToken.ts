import { NextRequest } from 'next/server';

export function getHeaderToken(request: NextRequest) {
  // 1. Authorization 헤더에서 토큰 확인
  const header = request.headers.get('Authorization');
  console.log('1. header', header);

  if (header) {
    return header.split(' ')[1];
  }

  // 2. 헤더에 토큰이 없으면 쿠키에서 확인
  const cookieToken = request.cookies.get('accessToken')?.value;
  console.log('2. cookieToken', cookieToken);

  return cookieToken;
}
