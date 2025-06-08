import { NextResponse } from 'next/server';

import { DB } from '@/api/_libs';

interface Params {
  params: Promise<{ email: string }>;
}

// GET /api/users/email/[email] - 이메일로 사용자 조회
export async function GET(request: Request, { params, }: Params) {
  try {
    const { email, } = await params;

    const user = await DB.user().findUnique({
      where: {
        email: decodeURIComponent(email),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: '사용자를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    return NextResponse.json({
      message: '사용자 조회 성공',
      response: user,
    });
  } catch (error) {
    console.error('사용자 조회 에러:', error);
    return NextResponse.json(
      {
        message: '사용자 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
