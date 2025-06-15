import { User } from '@/_prisma/client';
import { createResponse, DB } from '@/api/_libs';

export async function GET() {
  try {
    const users = await DB.user().findMany();

    return createResponse<User[]>({
      status: 200,
      message: '사용자 목록 조회가 완료되었습니다.',
      data: users,
    });
  } catch (error) {
    console.error(error, '사용자 목록 조회 실패');

    return createResponse<null>({
      message: '사용자 목록 조회를 실패했습니다.',
      status: 500,
    });
  }
}
