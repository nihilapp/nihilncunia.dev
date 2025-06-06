import { NextResponse } from 'next/server';

// GET /api/posts - 모든 포스트 조회
export async function GET() {
  try {
    // TODO: Prisma를 통한 포스트 목록 조회 구현
    return NextResponse.json({
      message: '포스트 목록 조회 성공',
      response: [],
    });
  } catch (error) {
    console.error('포스트 목록 조회 에러:', error);
    return NextResponse.json(
      {
        message: '포스트 목록 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// POST /api/posts - 새 포스트 작성 (Admin)
export async function POST() {
  try {
    // TODO: 인증 확인 및 포스트 생성 구현
    return NextResponse.json({
      message: '포스트 작성 성공',
      response: null,
    });
  } catch (error) {
    console.error('포스트 작성 에러:', error);
    return NextResponse.json(
      {
        message: '포스트 작성 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
