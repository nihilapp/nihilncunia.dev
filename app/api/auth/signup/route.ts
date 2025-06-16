import { NextRequest } from 'next/server';

import type { CreateUser } from '@/_entities/users';
import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs';
import { createResponse } from '@/api/_libs';
import { messageData } from '@/_data';

export async function POST(request: NextRequest) {
  try {
    const body: CreateUser = await request.json();
    const { email, username, password, role = 'ADMIN', } = body;

    // 입력값 검증
    if (!email || !username || !password) {
      return createResponse({
        status: 400,
        message: '이메일, 사용자명, 비밀번호는 필수입니다.',
      });
    }

    // 이메일 중복 확인
    const findUser = await DB.user().findUnique({
      where: { email, },
    });

    if (findUser) {
      return createResponse({
        status: 409,
        message: messageData.auth.emailInUse,
      });
    }

    // 비밀번호 해시화
    const hashedPassword = await serverTools.bcrypt!.dataToHash(password);

    // 사용자 생성
    const newUser = await DB.user().create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        created_at: true,
      },
    });

    return createResponse({
      status: 201,
      message: messageData.auth.signUpSuccess,
      data: newUser,
    });

  } catch (error) {
    console.error('회원가입 오류:', error);

    return createResponse({
      status: 500,
      message: messageData.auth.signUpError,
    });
  }
}
