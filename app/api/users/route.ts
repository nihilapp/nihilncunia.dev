import type { NextRequest } from 'next/server';

import { messageData } from '@/_data';
import type { CreateUser, DeleteUsers, DeleteUsersResponse } from '@/_entities/users';
import { User } from '@/_prisma/client';
import { createResponse, DB, serverTools } from '@/api/_libs';

export async function GET() {
  try {
    // 모든 유저 가져오기
    const users = await DB.user().findMany();

    return createResponse<User[]>({
      status: 200,
      message: messageData.user.listSuccess,
      data: users,
    });
  } catch (error) {
    console.error(error, '사용자 목록 조회 실패');

    return createResponse<null>({
      message: messageData.user.listError,
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const createUser: CreateUser = await request.json();

    // 이미 존재하는 이메일인지 확인
    const findUser = await DB.user().findUnique({
      where: {
        email: createUser.email,
      },
    });

    if (findUser) {
      // 이미 존재하는 이메일이면 400 반환
      return createResponse<null>({
        message: messageData.user.emailExists,
        status: 400,
      });
    }

    // 비밀번호 해싱
    const hashedPassword = await serverTools.bcrypt.dataToHash(createUser.password);

    // 유저 생성
    const user = await DB.user().create({
      data: {
        email: createUser.email,
        username: createUser.username,
        role: 'ADMIN',
        password: hashedPassword,
      },
    });

    // 유저 반환
    return createResponse<User>({
      status: 200,
      message: messageData.user.createSuccess,
      data: user,
    });
  } catch (error) {
    console.error(error, '사용자 생성 실패');

    return createResponse<null>({
      message: messageData.user.createError,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const deleteUser: DeleteUsers = await request.json();

    // 유저들의 아이디 값을 이용해 전부 삭제.
    const users = await DB.user().deleteMany({
      where: {
        id: { in: deleteUser.ids, },
      },
    });

    return createResponse<DeleteUsersResponse>({
      status: 200,
      message: messageData.user.deleteSuccess,
      data: {
        count: users.count,
      },
    });
  } catch (error) {
    console.error(error, '사용자 삭제 실패');

    return createResponse<null>({
      message: messageData.user.deleteError,
      status: 500,
    });
  }
}
