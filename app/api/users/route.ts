import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import type { CreateUser } from '@/_entities/users';
import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, serverTools } from '@/api/_libs';

// GET /api/users - 사용자 목록 조회 (인증 불필요)
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [ users, total, ] = await Promise.all([
      DB.user().findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
      DB.user().count(),
    ]);

    const successResponse: ApiResponse<{
      users: typeof users;
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }> = {
      response: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      message: '사용자 목록을 성공적으로 조회했습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('사용자 목록 조회 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '사용자 목록 조회 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

// POST /api/users - 사용자 생성 (인증 필요)
export async function POST(request: NextRequest) {
  let userData: CreateUser;

  try {
    userData = await request.json();
  } catch (error) {
    console.error('사용자 생성 중 오류:', error);
    const errorResponse: ApiError = {
      response: null,
      message: '잘못된 요청 형식입니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 400, }
    );
  }

  // JWT 인증
  const accessToken = getHeaderToken(request);

  if (!accessToken) {
    const errorResponse: ApiError = {
      response: null,
      message: '액세스 토큰이 필요합니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 401, }
    );
  }

  // JWT 토큰에서 사용자 ID 추출
  let userId: string;

  try {
    const tokenData = await serverTools.jwt!.tokenInfo('accessToken', accessToken);
    userId = tokenData.id;
  } catch (error) {
    console.error('사용자 생성 중 오류:', error);
    const errorResponse: ApiError = {
      response: null,
      message: '유효하지 않은 토큰입니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 401, }
    );
  }

  // 토큰 검증 및 갱신
  const checkResult = await refreshCheck(
    userId,
    accessToken
  );

  if (checkResult.error) {
    console.error('사용자 생성 중 오류:', checkResult.error);
    const errorResponse: ApiError = {
      response: null,
      message: checkResult.message,
    };

    return NextResponse.json(
      errorResponse,
      { status: checkResult.status, }
    );
  }

  try {
    // 이메일 중복 체크
    const findExistingUser = await DB.user().findUnique({
      where: { email: userData.email, },
    });

    if (findExistingUser) {
      const errorResponse: ApiError = {
        response: null,
        message: '이미 존재하는 이메일입니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 409, }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await serverTools.bcrypt!.dataToHash(userData.password);

    // 사용자 생성
    const newUser = await DB.user().create({
      data: {
        name: userData.name,
        email: userData.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });

    // 사용자 인증 정보 생성
    await DB.userAuth().create({
      data: {
        user_id: newUser.id,
        hashed_password: hashedPassword,
      },
    });

    const successResponse: ApiResponse<typeof newUser> = {
      response: newUser,
      message: '사용자가 성공적으로 생성되었습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 201, }
    );
  } catch (error: any) {
    console.error('사용자 생성 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '사용자 생성 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
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
