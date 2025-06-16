import { NextRequest } from 'next/server';

import { messageData } from '@/_data';
import type { User } from '@/_prisma/client';
import { createResponse, DB } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    const user = await DB.user().findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return createResponse<null>({
        message: messageData.common.notFound,
        status: 404,
      });
    }

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
