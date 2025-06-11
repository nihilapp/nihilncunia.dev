import type {
  PostFormData,
  PostFilters,
  PostsResponse,
  PostEx,
  PostStats
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

    if (filters?.category_id) {
      params.append('category', filters.category_id);
    }

    if (filters?.subcategory_id) {
      params.append('subcategory', filters.subcategory_id);
    }

    if (filters?.is_published !== undefined) {
      params.append('is_published', filters.is_published.toString());
    }

    return Api.getQuery<PostsResponse>(`/posts?${params.toString()}`);
  }

  // 개별 포스트 조회 (ID)
  static async getById(id: string) {
    return Api.getQuery<PostEx>(`/posts/${id}`);
  }

  // 개별 포스트 조회 (slug)
  static async getBySlug(slug: string) {
    return Api.getQuery<PostEx>(`/posts/slug/${slug}`);
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

  // 포스트 검색
  static async search(query: string, filters?: PostFilters & { page?: number; limit?: number }) {
    const params = new URLSearchParams();
    params.append('q', query);

    if (filters?.page) {
      params.append('page', filters.page.toString());
    }

    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }

    if (filters?.category_id) {
      params.append('category', filters.category_id);
    }

    if (filters?.subcategory_id) {
      params.append('subcategory', filters.subcategory_id);
    }

    if (filters?.status) {
      params.append('status', filters.status);
    }

    return Api.getQuery<PostsResponse>(`/posts/search?${params.toString()}`);
  }

  // 임시 저장
  static async saveDraft(data: any) {
    return Api.postQuery<PostEx, any>('/posts/draft', data);
  }

  // 임시 저장 목록 조회
  static async getDrafts(page?: number, limit?: number) {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());

    return Api.getQuery<PostsResponse>(`/posts/drafts?${params.toString()}`);
  }

  // 임시 저장 복구
  static async restoreDraft(id: string) {
    return Api.getQuery<PostEx>(`/posts/drafts/${id}/restore`);
  }

  // 자동 저장
  static async autosave(id: string, data: any) {
    return Api.patchQuery<PostEx, any>(`/posts/${id}/autosave`, data);
  }

  // 일괄 삭제
  static async batchDelete(postIds: string[]) {
    return Api.deleteWithDataQuery<{
      deleted_count: number;
      deleted_posts: { id: string; title: string }[];
      not_found_ids: string[];
    }, { post_ids: string[] }>('/posts/batch', {
      post_ids: postIds,
    });
  }

  // 일괄 상태 변경
  static async batchUpdateStatus(
    postIds: string[],
    updates: {
      status?: string;
      is_published?: boolean;
    }
  ) {
    return Api.patchQuery<{
      updated_count: number;
      updated_posts: {
        id: string;
        title: string;
        status: string;
        is_published: boolean;
        updated_at: string;
      }[];
      not_found_ids: string[];
      changes: {
        status?: string;
        is_published?: boolean;
      };
    }, {
      post_ids: string[];
      status?: string;
      is_published?: boolean;
    }>('/posts/batch-status', {
      post_ids: postIds,
      ...updates,
    });
  }
}
