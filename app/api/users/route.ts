import { messageData } from '@/_data';
import { User } from '@/_prisma/client';
import { createResponse, DB } from '@/api/_libs';

export async function GET() {
  try {
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
