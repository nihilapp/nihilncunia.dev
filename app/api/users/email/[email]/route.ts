import { NextRequest } from 'next/server';

import { messageData } from '@/_data';
import type { User } from '@/_prisma/client';
import { createResponse, DB } from '@/api/_libs';

interface Params {
  params: Promise<{ email: string; }>;
}

export async function GET(request: NextRequest, { params, }: Params) {
  try {
    const { email, } = await params;

    const user = await DB.user().findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return createResponse<null>({
        message: messageData.user.notFound,
        status: 400,
      });
    }

    return createResponse<User>({
      status: 200,
      message: messageData.user.fetchSuccess,
      data: user,
    });
  } catch (error) {
    console.error(error, '이메일 조회 실패');

    return createResponse<null>({
      message: messageData.user.fetchError,
      status: 500,
    });
  }
}
