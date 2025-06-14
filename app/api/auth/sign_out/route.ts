import { NextRequest } from 'next/server';

import { Token, type SignOut } from '@/_entities/auth';
import { createResponse, serverTools } from '@/api/_libs';

export async function POST(request: NextRequest) {
  try {
    const { userId, }: SignOut = await request.json();

    // 사용자의 아이디와 토큰에 저장된 아이디가 일치하는지 확인.
    const accessToken = await serverTools.cookie
      .get<Token>('accessToken');
    const refreshToken = await serverTools.cookie
      .get<Token>('refreshToken');

    const accessInfo = await serverTools.jwt
      .tokenInfo('accessToken', accessToken.token);
    const refreshInfo = await serverTools.jwt
      .tokenInfo('refreshToken', refreshToken.token);

    if (accessInfo.id !== userId || refreshInfo.id !== userId) {
      return createResponse<null>({
        message: '사용자 정보가 일치하지 않습니다. 로그인 후 다시 시도해주세요.',
        status: 401,
      });
    }

    // 토큰 삭제
    await serverTools.cookie.remove('accessToken');
    await serverTools.cookie.remove('refreshToken');

    return createResponse<null>({
      message: '로그아웃되었습니다.',
      status: 200,
    });
  } catch (error) {
    console.error('로그아웃 중 오류가 발생했습니다.', error);

    return createResponse<null>({
      message: '로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.',
      status: 500,
    });
  }
}
