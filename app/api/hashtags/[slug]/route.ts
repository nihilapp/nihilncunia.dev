import { NextRequest, NextResponse } from 'next/server';

import type { UpdateHashtag } from '@/_entities/hashtags';
import { DB, jwtAuth } from '@/api/_libs';

interface Params {
  params: Promise<{ slug: string }>;
}

// 슬러그가 UUID 형식인지 확인하는 함수
function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

// GET /api/hashtags/[slug] - 특정 해시태그 정보 조회 (slug 또는 id)
export async function GET(
  req: NextRequest,
  { params, }: Params
) {
  try {
    const { slug, } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          message: '해시태그 슬러그 또는 ID가 필요합니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // UUID 형식이면 id로, 아니면 slug로 검색
    const whereCondition = isUUID(slug) ? { id: slug, } : { slug, };

    // 해시태그 정보 조회
    const hashtag = await DB.hashtags().findUnique({
      where: whereCondition,
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

// PUT /api/hashtags/[slug] - 해시태그 수정 (Admin)
export async function PUT(request: NextRequest, { params, }: Params) {
  try {
    const { slug, } = await params;

    // JWT 인증
    const authResult = await jwtAuth(request);
    if (authResult.response) {
      return authResult.response;
    }

    // UUID 형식이면 id로, 아니면 slug로 검색
    const whereCondition = isUUID(slug) ? { id: slug, } : { slug, };

    // 기존 해시태그 확인
    const existingHashtag = await DB.hashtags().findUnique({
      where: whereCondition,
    });

    if (!existingHashtag) {
      return NextResponse.json(
        {
          message: '수정할 해시태그를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    const body: UpdateHashtag = await request.json();
    if (!body.name) {
      return NextResponse.json(
        {
          message: '해시태그 이름은 필수입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 슬러그 처리
    let newSlug = existingHashtag.slug;
    if (body.slug && body.slug !== existingHashtag.slug) {
      newSlug = body.slug;
    } else if (body.name !== existingHashtag.name) {
      newSlug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    }

    // 해시태그 이름/슬러그 중복 체크 (현재 해시태그 제외)
    const duplicateHashtag = await DB.hashtags().findFirst({
      where: {
        AND: [
          { id: { not: existingHashtag.id, }, },
          {
            OR: [
              { name: body.name, },
              { slug: newSlug, },
            ],
          },
        ],
      },
    });

    if (duplicateHashtag) {
      return NextResponse.json(
        {
          message: '이미 존재하는 해시태그 이름 또는 슬러그입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    const updatedHashtag = await DB.hashtags().update({
      where: { id: existingHashtag.id, },
      data: {
        name: body.name,
        slug: newSlug,
      },
    });

    return NextResponse.json({
      message: '해시태그 수정 성공',
      response: updatedHashtag,
    });
  } catch (error) {
    console.error('해시태그 수정 에러:', error);
    return NextResponse.json(
      {
        message: '해시태그 수정 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// DELETE /api/hashtags/[slug] - 해시태그 삭제 (Admin)
export async function DELETE(request: NextRequest, { params, }: Params) {
  try {
    const { slug, } = await params;

    // JWT 인증
    const authResult = await jwtAuth(request);
    if (authResult.response) {
      return authResult.response;
    }

    const authResult = await jwtAuth(request);
    if (authResult.response) {
      return authResult.response;
    }

    // UUID 형식이면 id로, 아니면 slug로 검색
    const whereCondition = isUUID(slug) ? { id: slug, } : { slug, };

    // 해시태그 존재 확인
    const existingHashtag = await DB.hashtags().findUnique({
      where: whereCondition,
      include: {
        post_hashtags: true,
      },
    });

    if (!existingHashtag) {
      return NextResponse.json(
        {
          message: '삭제할 해시태그를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    // 해시태그에 연결된 포스트가 있는지 확인
    if (existingHashtag.post_hashtags.length > 0) {
      return NextResponse.json(
        {
          message: '해당 해시태그가 사용 중인 포스트가 존재하여 삭제할 수 없습니다. 먼저 포스트에서 해시태그를 제거해주세요.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 해시태그 삭제
    await DB.hashtags().delete({
      where: { id: existingHashtag.id, },
    });

    return NextResponse.json({
      message: '해시태그 삭제 성공',
      response: null,
    });
  } catch (error) {
    console.error('해시태그 삭제 에러:', error);
    return NextResponse.json(
      {
        message: '해시태그 삭제 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
