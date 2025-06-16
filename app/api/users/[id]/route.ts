import { NextRequest } from 'next/server';

import { messageData } from '@/_data';
import type { UpdateUser } from '@/_entities/users';
import type { User } from '@/_prisma/client';
import { createResponse, DB } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    // 유저 조회
    const user = await DB.user().findUnique({
      where: {
        id,
      },
    });

    // 유저 없으면 404 반환
    if (!user) {
      return createResponse<null>({
        message: messageData.user.notFound,
        status: 404,
      });
    }

    // 유저 반환
    return createResponse<User>({
      message: messageData.user.fetchSuccess,
      status: 200,
      data: user,
    });
  } catch (error) {
    console.error(error, '사용자 상세 정보 조회 실패');

    return createResponse<null>({
      message: messageData.user.fetchError,
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    const updateUser: UpdateUser = await request.json();

    // 유저 조회
    const user = await DB.user().findUnique({
      where: {
        id,
      },
    });

    // 유저 없으면 404 반환
    if (!user) {
      return createResponse<null>({
        message: messageData.user.notFound,
        status: 404,
      });
    }

    // 유저 업데이트
    const updatedUser = await DB.user().update({
      where: {
        id,
      },
      data: updateUser,
    });

    // 유저 반환
    return createResponse<User>({
      message: messageData.user.updateSuccess,
      status: 200,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error, '사용자 정보 수정 실패');

    return createResponse<null>({
      message: messageData.user.updateError,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    // 유저 조회
    const user = await DB.user().findUnique({
      where: {
        id,
      },
    });

    // 유저 없으면 404 반환
    if (!user) {
      return createResponse<null>({
        message: messageData.user.notFound,
        status: 404,
      });
    }

    // 유저 삭제
    await DB.user().delete({
      where: {
        id,
      },
    });

    // 유저 반환
    return createResponse<null>({
      message: messageData.user.deleteSuccess,
      status: 200,
    });
  } catch (error) {
    console.error(error, '사용자 삭제 실패');

    return createResponse<null>({
      message: messageData.user.deleteError,
      status: 500,
    });
  }
}
