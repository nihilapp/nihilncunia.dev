import { NextRequest } from 'next/server';

import { User } from '@/_prisma/client';
import { createResponse, DB } from '@/api/_libs';

export async function GET(request: NextRequest) {
  try {
    const users = await DB.user().findMany();

    return createResponse<User[]>({
      status: 200,
      message: '사용자 목록 조회가 완료되었습니다.',
      data: users,
    });
  } catch (error) {
    return createResponse<null>({
      message: '사용자 목록 조회를 실패했습니다.',
      status: 500,
    });
  }
}
