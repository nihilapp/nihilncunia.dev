import { NextResponse } from 'next/server';

import { DB } from '@/api/_libs';

// GET /api/hashtags - 모든 해시태그 조회
export async function GET() {
  try {
    const hashtags = await DB.hashtags().findMany({
      orderBy: { created_at: 'desc', },
      include: {
        post_hashtags: {
          select: {
            post_id: true,
          },
        },
      },
    });

    // 해시태그별 포스트 개수 계산
    const hashtagsWithCount = hashtags.map((hashtag) => ({
      ...hashtag,
      post_count: hashtag.post_hashtags.length,
      post_hashtags: undefined, // 응답에서 제외
    }));

    return NextResponse.json({
      message: '해시태그 목록 조회 성공',
      response: hashtagsWithCount,
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
