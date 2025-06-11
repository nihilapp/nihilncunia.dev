import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import type { CreatePost, PostsResponse } from '@/_entities/posts';
import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, serverTools } from '@/api/_libs';

// GET /api/posts - 모든 포스트 조회 (인증 불필요)
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

    const successResponse: ApiResponse<PostsResponse> = {
      response: {
        posts,
        total,
        page,
        limit,
      },
      message: '포스트 목록을 성공적으로 조회했습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('포스트 목록 조회 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 목록 조회 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

// POST /api/posts - 새 포스트 작성 (인증 필요)
export async function POST(req: NextRequest) {
  let postData: CreatePost;

  try {
    postData = await req.json();
  } catch (error) {
    console.error('포스트 작성 중 요청 파싱 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '잘못된 요청 형식입니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 400, }
    );
  }

  // JWT 인증
  const accessToken = getHeaderToken(req);

  if (!accessToken) {
    const errorResponse: ApiError = {
      response: null,
      message: '액세스 토큰이 필요합니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 401, }
    );
  }

  // JWT 토큰에서 사용자 ID 추출
  let userId: string;

  try {
    const tokenData = await serverTools.jwt!.tokenInfo('accessToken', accessToken);
    userId = tokenData.id;
  } catch (error) {
    console.error('포스트 작성 중 토큰 디코딩 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '유효하지 않은 토큰입니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 401, }
    );
  }

  // 토큰 검증 및 갱신
  const checkResult = await refreshCheck(
    userId,
    accessToken
  );

  if (checkResult.error) {
    console.error('포스트 작성 중 토큰 검증 오류:', checkResult.error);

    const errorResponse: ApiError = {
      response: null,
      message: checkResult.message,
    };

    return NextResponse.json(
      errorResponse,
      { status: checkResult.status, }
    );
  }

  // 필수 필드 검증
  if (!postData.title || !postData.content || !postData.category_id) {
    const errorResponse: ApiError = {
      response: null,
      message: '제목, 내용, 카테고리는 필수입니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 400, }
    );
  }

  try {
    // slug 생성
    const baseSlug = postData.title
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
    const newPost = await DB.posts().create({
      data: {
        title: postData.title,
        slug,
        content: postData.content,
        excerpt: postData.excerpt || postData.content.substring(0, 200) + '...',
        status: postData.status || 'DRAFT',
        is_published: postData.is_published || false,
        user_id: userId,
        category_id: postData.category_id,
        subcategory_id: postData.subcategory_id || null,
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
    if (postData.hashtags && postData.hashtags.length > 0) {
      const hashtagConnections = [];

      for (const hashtagName of postData.hashtags) {
        // 해시태그가 존재하지 않으면 생성
        let findHashtag = await DB.hashtags().findUnique({
          where: { name: hashtagName, },
        });

        if (!findHashtag) {
          const hashtagSlug = hashtagName
            .toLowerCase()
            .replace(/[^a-z0-9가-힣\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();

          findHashtag = await DB.hashtags().create({
            data: {
              name: hashtagName,
              slug: hashtagSlug,
            },
          });
        }

        hashtagConnections.push({
          post_id: newPost.id,
          hashtag_id: findHashtag.id,
        });
      }

      // 포스트-해시태그 연결 생성
      await DB.postHashtags().createMany({
        data: hashtagConnections,
      });
    }

    const successResponse: ApiResponse<typeof newPost> = {
      response: newPost,
      message: '포스트가 성공적으로 작성되었습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 201, }
    );
  } catch (error: any) {
    console.error('포스트 작성 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 작성 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
