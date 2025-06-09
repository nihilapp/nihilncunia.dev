import { NextRequest, NextResponse } from 'next/server';

import type { UpdateUser } from '@/_entities/users';
import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

// GET /api/admin/profile - 관리자 정보 조회
export async function GET(req: NextRequest) {
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

    if (!serverTools.jwt) {
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

    // 관리자 정보 조회
    const user = await DB.user().findUnique({
      where: { id: tokenData.id, },
      select: {
        id: true,
        email: true,
        name: true,
        image_url: true,
        last_sign_in: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: '관리자 정보를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    return NextResponse.json({
      message: '관리자 정보 조회 성공',
      response: user,
    });
  } catch (error) {
    console.error('관리자 정보 조회 에러:', error);
    return NextResponse.json(
      {
        message: '관리자 정보 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// PUT /api/admin/profile - 관리자 정보 수정
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

    if (!serverTools.jwt) {
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

    const body: UpdateUser = await req.json();
    if (!body.name || !body.email) {
      return NextResponse.json(
        {
          message: '이름과 이메일은 필수입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 이메일 중복 체크 (현재 사용자 제외)
    if (body.email !== tokenData.email) {
      const existingUser = await DB.user().findUnique({
        where: { email: body.email, },
      });

      if (existingUser) {
        return NextResponse.json(
          {
            message: '이미 사용중인 이메일입니다.',
            response: null,
          },
          { status: 400, }
        );
      }
    }

    // 관리자 정보 업데이트
    const updatedUser = await DB.user().update({
      where: { id: tokenData.id, },
      data: {
        name: body.name,
        email: body.email,
        image_url: body.image_url,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image_url: true,
        last_sign_in: true,
        created_at: true,
        updated_at: true,
      },
    });

    return NextResponse.json({
      message: '관리자 정보 수정 성공',
      response: updatedUser,
    });
  } catch (error) {
    console.error('관리자 정보 수정 에러:', error);
    return NextResponse.json(
      {
        message: '관리자 정보 수정 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
