import { NextRequest } from 'next/server';

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
        message: '사용자 상세 정보 조회를 실패했습니다.',
        status: 404,
      });
    }

    return createResponse<User>({
      message: '사용자 상세 정보 조회가 완료되었습니다.',
      status: 200,
    });
  } catch (error) {
    console.error(error, '사용자 상세 정보 조회 실패');

    return createResponse<null>({
      message: '사용자 상세 정보 조회를 실패했습니다.',
      status: 500,
    });
  }
}
