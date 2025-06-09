import { NextRequest, NextResponse } from 'next/server';

import type { CreatePost } from '@/_entities/posts';
import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

// GET /api/posts - 모든 포스트 조회 (기본: 최신순, 페이징)
export async function GET(req: NextRequest) {
  try {
    const { searchParams, } = new URL(req.url);

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = {};

    if (status) {
      where.status = status.toUpperCase();
    }

    if (category) {
      where.category_id = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive', }, },
        { content: { contains: search, mode: 'insensitive', }, },
        { excerpt: { contains: search, mode: 'insensitive', }, },
      ];
    }

    const [ posts, total, ] = await Promise.all([
      DB.posts().findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc', },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              color: true,
            },
          },
          subcategory: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          post_hashtags: {
            include: {
              hashtag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      }),
      DB.posts().count({ where, }),
    ]);

    return NextResponse.json({
      message: '포스트 목록 조회 성공',
      response: {
        posts,
        total,
        page,
        limit,
      },
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

    const body: CreatePost = await req.json();
    if (!body.title || !body.content || !body.category_id) {
      return NextResponse.json(
        {
          message: '제목, 내용, 카테고리는 필수입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // slug 생성
    const baseSlug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    let slug = baseSlug;
    let counter = 1;

    // 중복된 slug가 있는지 확인하고 유니크한 slug 생성
    while (await DB.posts().findUnique({ where: { slug, }, })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // 포스트 생성
    const post = await DB.posts().create({
      data: {
        title: body.title,
        slug,
        content: body.content,
        excerpt: body.excerpt || body.content.substring(0, 200) + '...',
        status: body.status || 'DRAFT',
        is_published: body.is_published || false,
        user_id: tokenData.id,
        category_id: body.category_id,
        subcategory_id: body.subcategory_id || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    // 해시태그가 있다면 연결
    if (body.hashtags && body.hashtags.length > 0) {
      const hashtagConnections = [];

      for (const hashtagName of body.hashtags) {
        // 해시태그가 존재하지 않으면 생성
        let hashtag = await DB.hashtags().findUnique({
          where: { name: hashtagName, },
        });

        if (!hashtag) {
          const hashtagSlug = hashtagName
            .toLowerCase()
            .replace(/[^a-z0-9가-힣\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();

          hashtag = await DB.hashtags().create({
            data: {
              name: hashtagName,
              slug: hashtagSlug,
            },
          });
        }

        hashtagConnections.push({
          post_id: post.id,
          hashtag_id: hashtag.id,
        });
      }

      // 포스트-해시태그 연결 생성
      await DB.postHashtags().createMany({
        data: hashtagConnections,
      });
    }

    return NextResponse.json({
      message: '포스트 작성 성공',
      response: post,
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
