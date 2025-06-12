import { NextRequest, NextResponse } from 'next/server';

import type { CreateHashtag } from '@/_entities/hashtags';
import { DB, jwtAuth } from '@/api/_libs';

// GET /api/hashtags - 모든 해시태그 조회 (검색 및 자동완성 지원)
export async function GET(req: NextRequest) {
  try {
    const { searchParams, } = new URL(req.url);
    const search = searchParams.get('search');
    const limit = Number(searchParams.get('limit')) || 50;

    let where: any = {};

    // 검색어가 있으면 검색 조건 추가 (자동완성용)
    if (search) {
      where = {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      };
    }

    const hashtags = await DB.hashtags().findMany({
      where,
      take: limit,
      orderBy: [
        { post_hashtags: { _count: 'desc', }, }, // 포스트 수 많은 순
        { created_at: 'desc', },
      ],
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
      message: search
        ? `'${search}' 검색 결과 ${hashtagsWithCount.length}개 해시태그를 찾았습니다.`
        : '해시태그 목록 조회 성공',
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
    const authResult = await jwtAuth(req);
    if (authResult.response) {
      return authResult.response;
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
