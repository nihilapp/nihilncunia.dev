import { NextRequest } from 'next/server';

import type { CreateUser } from '@/_entities/users';
import { createResponse, DB, serverTools } from '@/api/_libs';

export async function POST(request: NextRequest) {
  const createUser: CreateUser = await request.json();

  // 사용자 존재하는지 찾기
  const findUser = await DB.user().findUnique({
    where: {
      email: createUser.email,
    },
  });

  // 사용자가 존재하면 409 에러 반환
  if (findUser) {
    return createResponse<null>({
      message: '이미 존재하는 사용자입니다.',
      status: 409,
    });
  }

  // 사용자가 존재하지 않으면 계속 진행.
  // 우선 사용자 정보부터 저장.
  const user = await DB.user().create({
    data: {
      email: createUser.email,
      name: createUser.name,
      role: createUser.role,
      image_url: createUser.image_url,
    },
  });

  // 비밀번호 해싱
  const hashedPassword = await serverTools.bcrypt
    .dataToHash(createUser.password);

  // 비밀번호 해싱 결과를 사용자 인증 정보에 업데이트
  await DB.userAuth().create({
    data: {
      user_id: user.id,
      hashed_password: hashedPassword,
    },
  });

  return createResponse<null>({
    message: '축하합니다! 회원가입이 완료되었습니다.',
    status: 201,
  });
}
