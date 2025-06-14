import { NextRequest } from 'next/server';

import { createResponse } from '@/api/_libs';
import { getValidSession } from '@/api/_libs/session';

export async function GET(request: NextRequest) {
  try {
    const result = await getValidSession(request);
    if (result.error) {
      return createResponse<null>({
        message: result.message,
        status: result.status,
      });
    }
    return createResponse({
      message: '성공',
      status: 200,
      data: result.session,
    });
  } catch (error) {
    return createResponse<null>({
      message: '서버 오류가 발생했습니다.',
      status: 500,
    });
  }
}
