import { NextRequest, NextResponse } from 'next/server';

import type { CreateHashtag } from '@/_entities/hashtags';
import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

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

// POST /api/hashtags - 새 해시태그 생성 (Admin)
export async function POST(req: NextRequest) {
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

    const body: CreateHashtag = await req.json();
    if (!body.name) {
      return NextResponse.json(
        {
          message: '해시태그 이름은 필수입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // slug 생성
    const baseSlug = body.slug || body.name
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    let slug = baseSlug;
    let counter = 1;

    // 중복된 slug가 있는지 확인하고 유니크한 slug 생성
    while (await DB.hashtags().findUnique({ where: { slug, }, })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // 해시태그 생성
    const hashtag = await DB.hashtags().create({
      data: {
        name: body.name,
        slug,
      },
    });

    return NextResponse.json({
      message: '해시태그 생성 성공',
      response: hashtag,
    });
  } catch (error) {
    console.error('해시태그 생성 에러:', error);

    return NextResponse.json(
      {
        message: '해시태그 생성 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
