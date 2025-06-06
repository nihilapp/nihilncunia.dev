import { NextRequest, NextResponse } from 'next/server';
import type { User } from '@/_prisma/client';
import type { UpdateUser, ApiResponse, ApiError } from '@/_types';
import { DB } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/users/[id] - ID로 사용자 조회
export async function GET(_request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    const user = await DB.users().findUnique({
      where: { id, },
    });

    if (!user) {
      const errorResponse: ApiError = {
        message: '사용자를 찾을 수 없습니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    const response: ApiResponse<User> = {
      message: '사용자 정보를 성공적으로 조회했습니다.',
      response: user,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error) {
    console.error('사용자 정보 조회 중 오류가 발생했습니다.', error);

    const errorResponse: ApiError = {
      message: '사용자 정보 조회 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

// PUT /api/users/[id] - 사용자 정보 수정
export async function PUT(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;
    const body: UpdateUser = await request.json();
    const { name, role, } = body;

    const dataToUpdate: Partial<UpdateUser> = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (role !== undefined) dataToUpdate.role = role;

    if (Object.keys(dataToUpdate).length === 0) {
      const errorResponse: ApiError = {
        message: '수정할 사용자 정보가 없습니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 400, }
      );
    }

    const updatedUser = await DB.users().update({
      where: { id, },
      data: dataToUpdate,
    });

    const response: ApiResponse<User> = {
      message: '사용자 정보를 성공적으로 수정했습니다.',
      response: updatedUser,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('사용자 정보 수정 중 오류가 발생했습니다.', error);

    let statusCode = 500;
    let message = '사용자 정보 수정 중 오류가 발생했습니다.';

    if (error.code === 'P2025') {
      statusCode = 404;
      message = '수정할 사용자를 찾을 수 없습니다.';
    }

    const errorResponse: ApiError = {
      message,
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: statusCode, }
    );
  }
}

// DELETE /api/users/[id] - ID로 사용자 삭제
export async function DELETE(_request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    await DB.users().delete({
      where: { id, },
    });

    const response: ApiResponse<null> = {
      message: '사용자를 성공적으로 삭제했습니다.',
      response: null,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('사용자 삭제 중 오류가 발생했습니다.', error);

    let statusCode = 500;
    let message = '사용자 삭제 중 오류가 발생했습니다.';

    if (error.code === 'P2025') {
      statusCode = 404;
      message = '삭제할 사용자를 찾을 수 없습니다.';
    }

    const errorResponse: ApiError = {
      message,
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: statusCode, }
    );
  }
}
