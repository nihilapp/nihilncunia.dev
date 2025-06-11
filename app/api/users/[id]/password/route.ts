import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import type { UpdateUserPassword } from '@/_entities/users';
import { DB, serverTools } from '@/api/_libs';
import { getHeaderToken, refreshCheck } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

// PUT /api/users/[id]/password - 사용자 비밀번호 수정 (인증 필요)
export async function PUT(request: NextRequest, { params, }: Params) {
  let passwordData: UpdateUserPassword;

  try {
    passwordData = await request.json();
  } catch (error) {
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
    const errorResponse: ApiError = {
      response: null,
      message: '유효하지 않은 토큰입니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 401, }
    );
  }

  const { id, } = await params;

  // 본인만 비밀번호 변경 가능하도록 권한 확인
  if (userId !== id) {
    const errorResponse: ApiError = {
      response: null,
      message: '본인의 비밀번호만 변경할 수 있습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 403, }
    );
  }

  // 토큰 검증 및 갱신
  const checkResult = await refreshCheck(
    userId,
    accessToken
  );

  if (checkResult.error) {
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
    const { currentPassword, newPassword, } = passwordData;

    // 사용자 존재 확인
    const findUser = await DB.user().findUnique({
      where: { id, },
    });

    if (!findUser) {
      const errorResponse: ApiError = {
        response: null,
        message: '사용자를 찾을 수 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    // 사용자 인증 정보 조회
    const findUserAuth = await DB.userAuth().findUnique({
      where: { user_id: id, },
    });

    if (!findUserAuth) {
      const errorResponse: ApiError = {
        response: null,
        message: '사용자 인증 정보를 찾을 수 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    // 현재 비밀번호 확인
    const isCurrentPasswordValid = await serverTools.bcrypt!.dataCompare(
      findUserAuth.hashed_password,
      currentPassword
    );

    if (!isCurrentPasswordValid) {
      const errorResponse: ApiError = {
        response: null,
        message: '현재 비밀번호가 올바르지 않습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 400, }
      );
    }

    // 새 비밀번호 해싱
    const hashedNewPassword = await serverTools.bcrypt!.dataToHash(newPassword);

    // 비밀번호 업데이트
    await DB.userAuth().update({
      where: { user_id: id, },
      data: { hashed_password: hashedNewPassword, },
    });

    const successResponse: ApiResponse<null> = {
      response: null,
      message: '비밀번호가 성공적으로 변경되었습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('비밀번호 변경 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '비밀번호 변경 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
