import { NextResponse } from 'next/server';

import type { CreateUser } from '@/_entities/users';
import { DB, serverTools } from '@/api/_libs';

// GET /api/users - 모든 사용자 조회
export async function GET() {
  try {
    const users = await DB.user().findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json({
      message: '사용자 목록 조회 성공',
      response: users,
    });
  } catch (error) {
    console.error('사용자 목록 조회 에러:', error);
    return NextResponse.json(
      {
        message: '사용자 목록 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// POST /api/users - 새 사용자 생성
export async function POST(request: Request) {
  try {
    const body: CreateUser = await request.json();
    const { email, password, name, } = body;

    // 이메일 중복 확인
    const findExistingUser = await DB.user().findFirst({
      where: {
        email,
      },
    });

    if (findExistingUser) {
      return NextResponse.json(
        {
          message: '이미 존재하는 이메일입니다.',
          response: null,
        },
        { status: 409, }
      );
    }

    // 비밀번호 해싱
    const hashedPassword: string = await serverTools.bcrypt!.dataToHash(password);

    // 사용자 생성
    const user = await DB.user().create({
      data: {
        email,
        name,
      },
    });

    await DB.userAuth().create({
      data: {
        user_id: user.id,
        hashed_password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: '사용자 생성 성공',
      response: user,
    });
  } catch (error) {
    console.error('사용자 생성 에러:', error);
    return NextResponse.json(
      {
        message: '사용자 생성 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// DELETE /api/users - 여러 사용자 삭제
export async function DELETE(request: Request) {
  try {
    const ids: string[] = await request.json();

    await DB.user().deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({
      message: '사용자 삭제 성공',
      response: null,
    });
  } catch (error) {
    console.error('사용자 삭제 에러:', error);
    return NextResponse.json(
      {
        message: '사용자 삭제 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
