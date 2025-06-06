import { NextResponse } from 'next/server';

// GET /api/admin/profile - 관리자 정보 조회
export async function GET() {
  try {
    // TODO: 인증 확인 및 관리자 정보 조회 구현
    return NextResponse.json({
      message: '관리자 정보 조회 성공',
      response: null,
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
export async function PUT() {
  try {
    // TODO: 인증 확인 및 관리자 정보 수정 구현
    return NextResponse.json({
      message: '관리자 정보 수정 성공',
      response: null,
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
