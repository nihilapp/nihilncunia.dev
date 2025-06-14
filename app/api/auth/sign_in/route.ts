import { NextRequest } from 'next/server';

import type { SignIn } from '@/_entities/auth';
import type { UserSession } from '@/_entities/users';
import { createResponse, DB, serverTools } from '@/api/_libs';

export async function POST(request: NextRequest) {
  try {
    const signIn: SignIn = await request.json();

    // 가장 먼저 사용자가 입력한 아이디와 DB 상의 아이디가 일치하는지 확인.
    const findUser = await DB.user().findUnique({
      where: {
        email: signIn.email,
      },
    });

    if (!findUser) {
      return createResponse<null>({
        message: '존재하지 않는 사용자입니다.',
        status: 404,
      });
    }

    // 사용자가 존재하면 저장되어 있는 비밀번호를 가져옴.
    const findUserAuth = await DB.userAuth().findUnique({
      where: {
        user_id: findUser.id,
      },
    });

    // 사용자가 존재하면 비밀번호가 일치하는지 확인.
    const isPasswordCorrect = await serverTools.bcrypt.dataCompare(
      findUserAuth.hashed_password,
      signIn.password
    );

    if (!isPasswordCorrect) {
      return createResponse<null>({
        message: '비밀번호가 일치하지 않습니다.',
        status: 401,
      });
    }

    // 비밀번호가 일치하면 로그인 성공.
    // 토큰을 생성하고 쿠키에 저장.
    const { access, refresh, } = await serverTools.jwt.genTokens(findUser);

    await serverTools.cookie.set(
      'accessToken',
      access.token,
      access.exp
    );

    await serverTools.cookie.set(
      'refreshToken',
      refresh.token,
      refresh.exp
    );

    return createResponse<UserSession>({
      message: '로그인되었습니다.',
      status: 200,
      data: {
        ...findUser,
        accessToken: access.token,
      },
    });
  } catch (error) {
    console.error(
      '로그인 중 오류가 발생했습니다.',
      error
    );

    return createResponse<null>({
      message: '로그인 중 오류가 발생했습니다.',
      status: 500,
    });
  }
}
