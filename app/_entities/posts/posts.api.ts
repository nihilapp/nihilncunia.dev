import type {
  PostFormData,
  PostFilters,
  PostsResponse
} from './posts.types';

import { Api } from '@/_libs';
import type { Post } from '@/_prisma/client';

export class PostsApi {
  // 모든 포스트 조회
  static async getAll(filters?: PostFilters) {
    const params = new URLSearchParams();

    if (filters?.status !== undefined) {
      params.append('status', filters.status.toString());
    }

    if (filters?.user_id) {
      params.append('user_id', filters.user_id);
    }

    if (filters?.search) {
      params.append('search', filters.search);
    }

    if (filters?.category) {
      params.append('category', filters.category);
    }

    return Api.getQuery<PostsResponse>(`/posts?${params.toString()}`);
  }

  // 개별 포스트 조회 (ID)
  static async getById(id: string) {
    return Api.getQuery<Post>(`/posts/${id}`);
  }

  // 개별 포스트 조회 (slug)
  static async getBySlug(slug: string) {
    return Api.getQuery<Post>(`/posts/slug/${slug}`);
  }

  // 포스트 생성
  static async create(data: PostFormData) {
    return Api.postQuery<Post, PostFormData>(
      '/posts',
      data
    );
  }

  // 포스트 수정
  static async update(id: string, data: Partial<PostFormData>) {
    return Api.putQuery<Post, Partial<PostFormData>>(
      `/posts/${id}`,
      data
    );
  }

  // 포스트 삭제
  static async delete(id: string) {
    return Api.deleteQuery<Post>(`/posts/${id}`);
  }

  // 포스트 발행/취소
  static async togglePublish(id: string) {
    return Api.patchQuery<Post, void>(
      `/posts/${id}/publish`,
      undefined
    );
  }

  // 조회수 증가
  static async incrementViews(id: string) {
    return Api.patchQuery<void, void>(
      `/posts/${id}/views`,
      undefined
    );
  }

  // 좋아요 증가
  static async incrementLikes(id: string) {
    return Api.patchQuery<Post, void>(
      `/posts/${id}/likes`,
      undefined
    );
  }
}
