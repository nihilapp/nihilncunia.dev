import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import type { UpdateUser } from '@/_entities/users';
import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, serverTools } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/users/[id] - ID로 사용자 조회 (인증 불필요)
export async function GET(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    const findUser = await DB.user().findUnique({
      where: { id, },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        last_sign_in: true,
        created_at: true,
        updated_at: true,
      },
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

    const successResponse: ApiResponse<typeof findUser> = {
      response: findUser,
      message: '사용자 조회를 성공적으로 완료했습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('사용자 조회 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '사용자 조회 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

// PUT /api/users/[id] - 사용자 정보 수정 (인증 필요)
export async function PUT(request: NextRequest, { params, }: Params) {
  let updateData: UpdateUser;

  try {
    updateData = await request.json();
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

  // 본인만 수정 가능하도록 권한 확인
  if (userId !== id) {
    const errorResponse: ApiError = {
      response: null,
      message: '본인의 정보만 수정할 수 있습니다.',
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

    // 사용자 정보 수정
    const updatedUser = await DB.user().update({
      where: { id, },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        updated_at: true,
      },
    });

    const successResponse: ApiResponse<typeof updatedUser> = {
      response: updatedUser,
      message: '사용자 정보가 성공적으로 수정되었습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('사용자 수정 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '사용자 수정 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

// DELETE /api/users/[id] - 사용자 삭제 (인증 필요)
export async function DELETE(request: NextRequest, { params, }: Params) {
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

  // 본인만 삭제 가능하도록 권한 확인
  if (userId !== id) {
    const errorResponse: ApiError = {
      response: null,
      message: '본인의 계정만 삭제할 수 있습니다.',
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

    // 사용자 삭제 (CASCADE로 user_auth도 자동 삭제됨)
    await DB.user().delete({
      where: { id, },
    });

    const successResponse: ApiResponse<null> = {
      response: null,
      message: '사용자가 성공적으로 삭제되었습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('사용자 삭제 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '사용자 삭제 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
