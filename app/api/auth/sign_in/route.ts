import { NextRequest, NextResponse } from 'next/server';
import { DB, serverTools } from '@/api/_libs';
import type {
  ApiResponse,
  ApiError,
  SignInUser,
  Tokens,
  UserSession
} from '@/_types';

export async function POST(request: NextRequest) {
  try {
    const body: SignInUser = await request.json();
    const { email, password, } = body;

    const findUser = await DB.users().findUnique({
      where: {
        email,
      },
      include: {
        user_auth: true,
      },
    });

    if (!findUser || !findUser.user_auth) {
      const errorResponse: ApiError = {
        response: null,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      };

      return NextResponse.json(
        errorResponse,
        {
          status: 401,
        }
      );
    }

    const isPasswordValid = await serverTools.bcrypt.dataCompare(
      findUser.user_auth.hashed_password,
      password
    );

    if (!isPasswordValid) {
      const errorResponse: ApiError = {
        response: null,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      };

      return NextResponse.json(
        errorResponse,
        {
          status: 401,
        }
      );
    }

    const tokens: Tokens = await serverTools.jwt.genTokens(findUser);
    const { accessToken, refreshToken, } = tokens;

    await DB.client().$transaction(async (tx) => {
      await tx.userAuth.update({
        where: {
          user_id: findUser.id,
        },
        data: {
          refresh_token: refreshToken.token,
        },
      });

      await tx.user.update({
        where: {
          id: findUser.id,
        },
        data: {
          last_sign_in: new Date(),
        },
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user_auth, ...userWithoutAuth } = findUser;

    const userSession: UserSession = {
      ...userWithoutAuth,
      access_token: accessToken,
    };

    await serverTools.cookie.set(
      'refreshToken',
      serverTools.common.string(refreshToken),
      refreshToken.exp
    );

    await serverTools.cookie.set(
      'accessToken',
      serverTools.common.string(accessToken),
      accessToken.exp
    );

    const responseData: ApiResponse<UserSession> = {
      message: '로그인 성공',
      response: userSession,
    };

    return NextResponse.json(
      responseData,
      { status: 200, }
    );
  } catch (error) {
    console.error('로그인 처리 중 오류 발생:', error);
    const errorResponse: ApiError = {
      message: '로그인 처리 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      {
        status: 500,
      }
    );
  }
}
