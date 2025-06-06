import { NextRequest, NextResponse } from 'next/server';
import type { User } from '@/_prisma/client';
import type {
  CreateUser, DeleteUsers, ApiResponse, ApiError
} from '@/_types';
import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

// GET /api/users - 모든 사용자 조회
export async function GET() {
  try {
    const users = await DB.users().findMany();

    const response: ApiResponse<User[]> = {
      message: '사용자 목록을 성공적으로 조회했습니다.',
      response: users,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error) {
    console.error('사용자 목록 조회 중 오류가 발생했습니다.', error);

    const errorResponse: ApiError = {
      message: '사용자 목록 조회 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

// POST /api/users - 새 사용자 생성
export async function POST(request: NextRequest) {
  try {
    const body: CreateUser = await request.json();

    const {
      email, password, name, role,
    } = body;

    const findUserByEmail = await DB.users().findUnique({
      where: { email, },
    });

    if (findUserByEmail) {
      const errorResponse: ApiError = {
        message: '이미 사용 중인 이메일입니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 409, }
      );
    }

    const hashedPassword = await serverTools.bcrypt.dataToHash(password);

    const newUser = await DB.client().$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          name,
          role,
        },
      });

      await tx.userAuth.create({
        data: {
          user_id: user.id,
          hashed_password: hashedPassword,
        },
      });

      return tx.user.findUnique({ where: { id: user.id, }, });
    });

    if (!newUser) {
      const errorResponse: ApiError = {
        message: '사용자 생성 후 정보 조회에 실패했습니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 500, }
      );
    }

    const response: ApiResponse<User> = {
      message: '사용자를 성공적으로 생성했습니다.',
      response: newUser,
    };

    return NextResponse.json(
      response,
      { status: 201, }
    );
  } catch (error) {
    console.error('사용자 생성 중 오류가 발생했습니다.', error);

    const errorResponse: ApiError = {
      message: '사용자 생성 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

// DELETE /api/users - 여러 사용자 삭제
export async function DELETE(request: NextRequest) {
  try {
    const body: DeleteUsers = await request.json();
    const { ids, } = body;

    if (!ids || ids.length === 0) {
      const errorResponse: ApiError = {
        message: '삭제할 사용자의 ID를 제공해야 합니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 400, }
      );
    }

    const deleteResult = await DB.users().deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const response: ApiResponse<{ count: number }> = {
      message: `${deleteResult.count}명의 사용자를 성공적으로 삭제했습니다.`,
      response: {
        count: deleteResult.count,
      },
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error) {
    console.error('사용자 삭제 중 오류가 발생했습니다.', error);

    const errorResponse: ApiError = {
      message: '사용자 삭제 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
