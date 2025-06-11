import type {
  CreateHashtag,
  UpdateHashtag,
  HashtagEx,
  HashtagsResponse,
  HashtagResponse,
  CreateHashtagResponse,
  UpdateHashtagResponse,
  DeleteHashtagResponse,
  HashtagPostsResponse
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

    return Api.getQuery<HashtagsResponse>(url);
  }

  // 개별 해시태그 조회 (ID) - slug API 사용
  static async getById(id: string) {
    return Api.getQuery<HashtagResponse>(`/hashtags/${id}`);
  }

  // 개별 해시태그 조회 (Slug)
  static async getBySlug(slug: string) {
    return Api.getQuery<HashtagResponse>(`/hashtags/${slug}`);
  }

  // 해시태그 생성
  static async create(data: CreateHashtag) {
    return Api.postQuery<CreateHashtagResponse, CreateHashtag>(
      '/hashtags',
      data
    );
  }

  // 해시태그 수정 - slug API 사용 (id도 처리 가능)
  static async update(
    id: string,
    data: UpdateHashtag
  ) {
    return Api.putQuery<UpdateHashtagResponse, UpdateHashtag>(
      `/hashtags/${id}`,
      data
    );
  }

  // 해시태그 삭제 - slug API 사용 (id도 처리 가능)
  static async delete(id: string) {
    return Api.deleteQuery<DeleteHashtagResponse>(`/hashtags/${id}`);
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

    return Api.getQuery<HashtagPostsResponse>(url);
  }

  // 자동완성을 위한 검색 (제한된 수량)
  static async searchForAutocomplete(search: string, limit = 10) {
    return this.getAll(search, limit);
  }
}
