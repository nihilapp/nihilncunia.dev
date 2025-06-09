import { NextRequest, NextResponse } from 'next/server';

import type { UpdatePost } from '@/_entities/posts';
import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs/tools';

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/posts/[id] - 포스트 상세 조회
export async function GET(request: Request, { params, }: Params) {
  try {
    const { id, } = await params;

    const post = await DB.posts().findUnique({
      where: { id, },
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

    // 조회수 증가
    await DB.posts().update({
      where: { id, },
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
        views: post.views + 1, // 업데이트된 조회수 반영
      },
    });
  } catch (error) {
    console.error('포스트 조회 에러:', error);
    return NextResponse.json(
      {
        message: '포스트 조회 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// PUT /api/posts/[id] - 포스트 수정 (Admin)
export async function PUT(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    // JWT 인증
    const cookie = request.cookies.get('access_token');
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

    // 기존 포스트 확인
    const existingPost = await DB.posts().findUnique({
      where: { id, },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          message: '수정할 포스트를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    const body: UpdatePost = await request.json();
    if (!body.title || !body.content || !body.category_id) {
      return NextResponse.json(
        {
          message: '제목, 내용, 카테고리는 필수입니다.',
          response: null,
        },
        { status: 400, }
      );
    }

    // 슬러그가 변경되었다면 중복 체크
    let slug = existingPost.slug;
    if (body.slug && body.slug !== existingPost.slug) {
      const duplicatePost = await DB.posts().findUnique({
        where: { slug: body.slug, },
      });

      if (duplicatePost && duplicatePost.id !== id) {
        return NextResponse.json(
          {
            message: '이미 존재하는 슬러그입니다.',
            response: null,
          },
          { status: 400, }
        );
      }

      slug = body.slug;
    }

    // 포스트 업데이트
    const updatedPost = await DB.posts().update({
      where: { id, },
      data: {
        title: body.title,
        slug,
        content: body.content,
        excerpt: body.excerpt || body.content.substring(0, 200) + '...',
        featured_image: body.featured_image,
        status: body.status || existingPost.status,
        published_at: body.status === 'PUBLISHED' && existingPost.status !== 'PUBLISHED'
          ? new Date()
          : existingPost.published_at,
        reading_time: Math.ceil(body.content.length / 1000),
        seo_title: body.seo_title || body.title,
        seo_description: body.seo_description || body.excerpt,
        seo_keywords: body.seo_keywords,
        category_id: body.category_id,
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
      },
    });

    // 기존 해시태그 연결 제거
    await DB.postHashtags().deleteMany({
      where: { post_id: id, },
    });

    // 새로운 해시태그 연결
    if (body.hashtags && body.hashtags.length > 0) {
      const hashtagConnections = [];

      for (const hashtagName of body.hashtags) {
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
          post_id: id,
          hashtag_id: hashtag.id,
        });
      }

      await DB.postHashtags().createMany({
        data: hashtagConnections,
      });
    }

    return NextResponse.json({
      message: '포스트 수정 성공',
      response: updatedPost,
    });
  } catch (error) {
    console.error('포스트 수정 에러:', error);
    return NextResponse.json(
      {
        message: '포스트 수정 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}

// DELETE /api/posts/[id] - 포스트 삭제 (Admin)
export async function DELETE(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    // JWT 인증
    const cookie = request.cookies.get('access_token');
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

    // 포스트 존재 확인
    const existingPost = await DB.posts().findUnique({
      where: { id, },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          message: '삭제할 포스트를 찾을 수 없습니다.',
          response: null,
        },
        { status: 404, }
      );
    }

    // 포스트 삭제 (cascade로 연결된 해시태그 관계도 자동 삭제됨)
    await DB.posts().delete({
      where: { id, },
    });

    return NextResponse.json({
      message: '포스트 삭제 성공',
      response: null,
    });
  } catch (error) {
    console.error('포스트 삭제 에러:', error);
    return NextResponse.json(
      {
        message: '포스트 삭제 실패',
        response: null,
      },
      { status: 500, }
    );
  }
}
