import { NextResponse } from 'next/server';

// PUT /api/admin/password - 관리자 비밀번호 변경
export async function PUT() {
  try {
    // TODO: 인증 확인 및 비밀번호 변경 구현
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
