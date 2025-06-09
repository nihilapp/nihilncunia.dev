import { NextRequest, NextResponse } from 'next/server';

import type { UpdateUserPassword } from '@/_entities/users';
import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

// PUT /api/admin/password - 관리자 비밀번호 변경
export async function PUT(req: NextRequest) {
  try {
    // JWT 인증
    const cookie = req.cookies.get('access_token');
    if (!cookie) {
      return NextResponse.json(
        {
          message: '인증 정보가 없습니다.',
          response: null,
        },
        { status: 401, }
      );
    }

    if (!serverTools.jwt || !serverTools.bcrypt) {
      return NextResponse.json(
        {
          message: '인증 시스템 오류가 발생했습니다.',
          response: null,
        },
        { status: 500, }
      );
    }

    const tokenData = await serverTools.jwt.tokenInfo('accessToken', cookie.value);
    if (!tokenData || !tokenData.id) {
      return NextResponse.json(
        {
          message: '관리자 권한이 없습니다.',
          response: null,
        },
        { status: 403, }
      );
    }

    const body: UpdateUserPassword = await req.json();
    if (!body.currentPassword || !body.newPassword) {
      return NextResponse.json(
        {
          message: '현재 비밀번호와 새 비밀번호는 필수입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 새 비밀번호 유효성 검사
    if (body.newPassword.length < 8) {
      return NextResponse.json(
        {
          message: '새 비밀번호는 최소 8자 이상이어야 합니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 현재 사용자의 인증 정보 조회
    const userAuth = await DB.userAuth().findUnique({
      where: { user_id: tokenData.id, },
    });

    if (!userAuth) {
      return NextResponse.json(
        {
          message: '사용자 인증 정보를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    // 현재 비밀번호 검증
    const isCurrentPasswordValid = await serverTools.bcrypt.dataCompare(
      userAuth.hashed_password,
      body.currentPassword
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        {
          message: '현재 비밀번호가 올바르지 않습니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 새 비밀번호가 현재 비밀번호와 같은지 확인
    const isSamePassword = await serverTools.bcrypt.dataCompare(
      userAuth.hashed_password,
      body.newPassword
    );

    if (isSamePassword) {
      return NextResponse.json(
        {
          message: '새 비밀번호는 현재 비밀번호와 달라야 합니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 새 비밀번호 해싱
    const hashedNewPassword = await serverTools.bcrypt.dataToHash(body.newPassword);

    // 비밀번호 업데이트
    await DB.userAuth().update({
      where: { user_id: tokenData.id, },
      data: {
        hashed_password: hashedNewPassword,
        refresh_token: null, // 보안을 위해 리프레시 토큰 무효화
      },
    });

    return NextResponse.json({
      message: '비밀번호 변경 성공',
      response: null,
    });
  } catch (error) {
    console.error('비밀번호 변경 에러:', error);
    return NextResponse.json(
      {
        message: '비밀번호 변경 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
