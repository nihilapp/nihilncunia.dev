import { NextResponse } from 'next/server';

// GET /api/categories - 모든 카테고리 조회
export async function GET() {
  try {
    // TODO: Prisma를 통한 카테고리 목록 조회 구현
    return NextResponse.json({
      message: '카테고리 목록 조회 성공',
      response: [],
    });
  } catch (error) {
    console.error('카테고리 목록 조회 에러:', error);
    return NextResponse.json(
      {
        message: '카테고리 목록 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// POST /api/categories - 새 카테고리 생성 (Admin)
export async function POST() {
  try {
    // TODO: 인증 확인 및 카테고리 생성 구현
    return NextResponse.json({
      message: '카테고리 생성 성공',
      response: null,
    });
  } catch (error) {
    console.error('카테고리 생성 에러:', error);
    return NextResponse.json(
      {
        message: '카테고리 생성 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
