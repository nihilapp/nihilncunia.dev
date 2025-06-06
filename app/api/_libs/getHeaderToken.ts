import { NextRequest } from 'next/server';

export function getHeaderToken(request: NextRequest) {
  const header = request.headers.get('Authorization');
  console.log('1. header', header);

  return header?.split(' ')[1];
}
