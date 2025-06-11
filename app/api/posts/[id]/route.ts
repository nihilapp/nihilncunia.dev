import { NextRequest, NextResponse } from 'next/server';

import type { ApiResponse, ApiError } from '@/_entities/common';
import type { UpdatePost } from '@/_entities/posts';
import { DB } from '@/api/_libs';
import { getHeaderToken, refreshCheck, serverTools } from '@/api/_libs';

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/posts/[id] - 포스트 상세 조회 (인증 불필요)
export async function GET(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

    const findPost = await DB.posts().findUnique({
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

    if (!findPost) {
      const errorResponse: ApiError = {
        response: null,
        message: '포스트를 찾을 수 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
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

    const postWithUpdatedViews = {
      ...findPost,
      views: findPost.views + 1,
    };

    const successResponse: ApiResponse<typeof postWithUpdatedViews> = {
      response: postWithUpdatedViews,
      message: '포스트를 성공적으로 조회했습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('포스트 조회 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 조회 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

// PUT /api/posts/[id] - 포스트 수정 (인증 필요)
export async function PUT(request: NextRequest, { params, }: Params) {
  let updateData: UpdatePost;

  try {
    updateData = await request.json();
  } catch (error) {
    console.error('포스트 수정 중 요청 파싱 오류:', error);

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
  const accessToken = getHeaderToken(request);

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
    console.error('포스트 수정 중 토큰 디코딩 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '유효하지 않은 토큰입니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 401, }
    );
  }

  const { id, } = await params;

  // 토큰 검증 및 갱신
  const checkResult = await refreshCheck(
    userId,
    accessToken
  );

  if (checkResult.error) {
    console.error('포스트 수정 중 토큰 검증 오류:', checkResult.error);

    const errorResponse: ApiError = {
      response: null,
      message: checkResult.message,
    };

    return NextResponse.json(
      errorResponse,
      { status: checkResult.status, }
    );
  }

  try {
    // 기존 포스트 확인
    const findExistingPost = await DB.posts().findUnique({
      where: { id, },
    });

    if (!findExistingPost) {
      const errorResponse: ApiError = {
        response: null,
        message: '수정할 포스트를 찾을 수 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    // 작성자 권한 확인
    if (findExistingPost.user_id !== userId) {
      const errorResponse: ApiError = {
        response: null,
        message: '본인의 포스트만 수정할 수 있습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 403, }
      );
    }

    // 필수 필드 검증
    if (!updateData.title || !updateData.content || !updateData.category_id) {
      const errorResponse: ApiError = {
        response: null,
        message: '제목, 내용, 카테고리는 필수입니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 400, }
      );
    }

    // 슬러그가 변경되었다면 중복 체크
    let slug = findExistingPost.slug;
    if (updateData.slug && updateData.slug !== findExistingPost.slug) {
      const findDuplicatePost = await DB.posts().findUnique({
        where: { slug: updateData.slug, },
      });

      if (findDuplicatePost && findDuplicatePost.id !== id) {
        const errorResponse: ApiError = {
          response: null,
          message: '이미 존재하는 슬러그입니다.',
        };

        return NextResponse.json(
          errorResponse,
          { status: 400, }
        );
      }

      slug = updateData.slug;
    } else if (updateData.title !== findExistingPost.title && !updateData.slug) {
      // 제목이 변경되었는데 슬러그가 제공되지 않았다면 자동 생성
      const baseSlug = updateData.title
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      slug = baseSlug;
      let counter = 1;

      while (await DB.posts().findUnique({ where: { slug, }, })) {
        if (slug === findExistingPost.slug) break; // 기존 slug와 같다면 OK
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // 포스트 업데이트
    const updatedPost = await DB.posts().update({
      where: { id, },
      data: {
        title: updateData.title,
        slug,
        content: updateData.content,
        excerpt: updateData.excerpt || updateData.content.substring(0, 200) + '...',
        status: updateData.status || findExistingPost.status,
        is_published: updateData.is_published !== undefined ? updateData.is_published : findExistingPost.is_published,
        category_id: updateData.category_id,
        subcategory_id: updateData.subcategory_id || null,
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
    if (updateData.hashtags && updateData.hashtags.length > 0) {
      const hashtagConnections = [];

      for (const hashtagName of updateData.hashtags) {
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
          post_id: id,
          hashtag_id: findHashtag.id,
        });
      }

      await DB.postHashtags().createMany({
        data: hashtagConnections,
      });
    }

    const successResponse: ApiResponse<typeof updatedPost> = {
      response: updatedPost,
      message: '포스트가 성공적으로 수정되었습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('포스트 수정 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 수정 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

// DELETE /api/posts/[id] - 포스트 삭제 (인증 필요)
export async function DELETE(request: NextRequest, { params, }: Params) {
  // JWT 인증
  const accessToken = getHeaderToken(request);

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
    console.error('포스트 삭제 중 토큰 디코딩 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '유효하지 않은 토큰입니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 401, }
    );
  }

  const { id, } = await params;

  // 토큰 검증 및 갱신
  const checkResult = await refreshCheck(
    userId,
    accessToken
  );

  if (checkResult.error) {
    console.error('포스트 삭제 중 토큰 검증 오류:', checkResult.error);

    const errorResponse: ApiError = {
      response: null,
      message: checkResult.message,
    };

    return NextResponse.json(
      errorResponse,
      { status: checkResult.status, }
    );
  }

  try {
    // 포스트 존재 확인
    const findExistingPost = await DB.posts().findUnique({
      where: { id, },
    });

    if (!findExistingPost) {
      const errorResponse: ApiError = {
        response: null,
        message: '삭제할 포스트를 찾을 수 없습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    // 작성자 권한 확인
    if (findExistingPost.user_id !== userId) {
      const errorResponse: ApiError = {
        response: null,
        message: '본인의 포스트만 삭제할 수 있습니다.',
      };

      return NextResponse.json(
        errorResponse,
        { status: 403, }
      );
    }

    // 포스트 삭제 (cascade로 연결된 해시태그 관계도 자동 삭제됨)
    await DB.posts().delete({
      where: { id, },
    });

    const successResponse: ApiResponse<null> = {
      response: null,
      message: '포스트가 성공적으로 삭제되었습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    console.error('포스트 삭제 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '포스트 삭제 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
