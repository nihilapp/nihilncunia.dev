import { NextRequest, NextResponse } from 'next/server';

import { DB } from '@/api/_libs';

// GET /api/hashtags/[slug] - 특정 해시태그 정보 조회
export async function GET(
  req: NextRequest,
  { params, }: { params: { slug: string } }
) {
  try {
    const { slug, } = params;

    if (!slug) {
      return NextResponse.json(
        {
          message: '해시태그 슬러그가 필요합니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 해시태그 정보 조회
    const hashtag = await DB.hashtags().findUnique({
      where: { slug, },
      include: {
        post_hashtags: {
          select: {
            post_id: true,
          },
        },
      },
    });

    if (!hashtag) {
      return NextResponse.json(
        {
          message: '해당 해시태그를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    // 포스트 개수 계산
    const hashtagWithCount = {
      ...hashtag,
      post_count: hashtag.post_hashtags.length,
      post_hashtags: undefined, // 응답에서 제외
    };

    return NextResponse.json({
      message: '해시태그 정보 조회 성공',
      response: hashtagWithCount,
    });
  } catch (error) {
    console.error('해시태그 정보 조회 에러:', error);
    return NextResponse.json(
      {
        message: '해시태그 정보 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
