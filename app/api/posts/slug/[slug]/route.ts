import { NextRequest, NextResponse } from 'next/server';

import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

interface Params {
	params: Promise<{ slug: string }>;
}

// GET /api/posts/slug/[slug] - slug로 포스트 조회
export async function GET(request: NextRequest, { params, }: Params) {
  try {
    const { slug, } = await params;

    const post = await DB.posts().findUnique({
      where: {
        slug,
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
    });

    if (!post) {
      return NextResponse.json(
        {
          message: '포스트를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    // 포스트 접근 권한 확인
    let isAdmin = false;
    const cookie = request.cookies?.get('accessToken');

    if (cookie && serverTools.jwt) {
      try {
        const tokenData = await serverTools.jwt.tokenInfo('accessToken', cookie.value);
        if (tokenData && tokenData.id) {
          isAdmin = true;
        }
      } catch (error) {
        // 토큰이 유효하지 않아도 계속 진행 (일반 사용자로 처리)
      }
    }

    // 포스트 상태별 접근 제어
    if (post.status === 'DRAFT' || post.status === 'PENDING') {
      if (!isAdmin) {
        return NextResponse.json(
          {
            message: '작성 중인 포스트입니다.',
            response: null,
          },
          { status: 403, }
        );
      }
    } else if (post.status === 'ARCHIVED') {
      if (!isAdmin) {
        return NextResponse.json(
          {
            message: '보관된 포스트입니다.',
            response: null,
          },
          { status: 403, }
        );
      }
    } else if (post.status === 'PROTECTED') {
      if (!isAdmin) {
        return NextResponse.json(
          {
            message: '보호된 포스트입니다. 접근 권한이 필요합니다.',
            response: null,
          },
          { status: 403, }
        );
      }
    } else if (post.status === 'PUBLISHED') {
      // PUBLISHED 상태는 모든 사용자가 접근 가능
      if (!post.is_published && !isAdmin) {
        return NextResponse.json(
          {
            message: '공개되지 않은 포스트입니다.',
            response: null,
          },
          { status: 403, }
        );
      }
    } else {
      // 알 수 없는 상태
      if (!isAdmin) {
        return NextResponse.json(
          {
            message: '접근할 수 없는 포스트입니다.',
            response: null,
          },
          { status: 403, }
        );
      }
    }

    // 조회수 증가
    await DB.posts().update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      message: '포스트 조회 성공',
      response: {
        ...post,
        views: post.views + 1,
      },
    });
  } catch (error) {
    console.error('포스트 slug 조회 에러:', error);

    return NextResponse.json(
      {
        message: '포스트 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
