import { NextResponse } from 'next/server';

// GET /api/hashtags - 모든 해시태그 조회
export async function GET() {
  try {
    // TODO: Prisma를 통한 해시태그 목록 조회 구현
    return NextResponse.json({
      message: '해시태그 목록 조회 성공',
      response: [],
    });
  } catch (error) {
    console.error('해시태그 목록 조회 에러:', error);
    return NextResponse.json(
      {
        message: '해시태그 목록 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
