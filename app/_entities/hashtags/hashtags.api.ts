import type {
  CreateHashtag,
  UpdateHashtag,
  HashtagEx
} from './hashtags.types';

import { Api } from '@/_libs';
import type { Hashtag } from '@/_prisma/client';

export class HashtagsApi {
  // 모든 해시태그 조회 (검색 지원)
  static async getAll(search?: string, limit?: number) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (limit) params.append('limit', limit.toString());

    const queryString = params.toString();
    const url = queryString ? `/hashtags?${queryString}` : '/hashtags';

    return Api.getQuery<{
      message: string;
      response: (Hashtag & {
        post_count: number;
      })[];
        }>(url);
  }

  // 개별 해시태그 조회 (ID) - slug API 사용
  static async getById(id: string) {
    return Api.getQuery<{
      message: string;
      response: Hashtag & {
        post_count: number;
      };
    }>(`/hashtags/${id}`);
  }

  // 개별 해시태그 조회 (Slug)
  static async getBySlug(slug: string) {
    return Api.getQuery<{
      message: string;
      response: Hashtag & {
        post_count: number;
      };
    }>(`/hashtags/${slug}`);
  }

  // 해시태그 생성
  static async create(data: CreateHashtag) {
    return Api.postQuery<
      {
        message: string;
        response: Hashtag;
      },
      CreateHashtag
    >(
      '/hashtags',
      data
    );
  }

  // 해시태그 수정 - slug API 사용 (id도 처리 가능)
  static async update(
    id: string,
    data: UpdateHashtag
  ) {
    return Api.putQuery<
      {
        message: string;
        response: Hashtag;
      },
      UpdateHashtag
    >(
      `/hashtags/${id}`,
      data
    );
  }

  // 해시태그 삭제 - slug API 사용 (id도 처리 가능)
  static async delete(id: string) {
    return Api.deleteQuery<{
      message: string;
      response: null;
    }>(`/hashtags/${id}`);
  }

  // 해시태그별 포스트 목록 조회
  static async getPostsByHashtag(
    slug: string,
    page?: number,
    limit?: number,
    status?: string
  ) {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    if (status) params.append('status', status);

    const queryString = params.toString();
    const url = queryString
      ? `/hashtags/${slug}/posts?${queryString}`
      : `/hashtags/${slug}/posts`;

    return Api.getQuery<{
      message: string;
      response: {
        hashtag: {
          id: string;
          name: string;
          slug: string;
        };
        posts: any[];
        total: number;
        page: number;
        limit: number;
      };
    }>(url);
  }

  // 자동완성을 위한 검색 (제한된 수량)
  static async searchForAutocomplete(search: string, limit = 10) {
    return this.getAll(search, limit);
  }
}
