import type { ApiResponse } from '../common';

import type { Post, PostStatus, Prisma } from '@/_prisma/client';

// 포스트 생성
export interface CreatePost {
  title: string; // 제목 (필수)
  slug?: string; // URL slug (선택, 자동생성)
  content: string; // 내용 (필수)
  excerpt?: string; // 요약 (선택)
  category_id: string; // 카테고리 (필수)
  subcategory_id?: string; // 서브카테고리 (선택)
  hashtags?: string[]; // 해시태그 (선택)
  status?: PostStatus; // 현 상태 (기본값: PENDING)
  is_published?: boolean; // 공개여부 (기본값: false)
}

// 포스트 수정
export interface UpdatePost {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  category_id?: string;
  subcategory_id?: string;
  hashtags?: string[];
  status?: PostStatus;
  is_published?: boolean;
}

// 포스트 필터
export interface PostFilters {
  status?: PostStatus;
  is_published?: boolean;
  user_id?: string;
  search?: string;
  category_id?: string;
  subcategory_id?: string;
}

// 포스트 목록 응답
export interface PostsResponse {
  posts: PostEx[];
  total: number;
  page: number;
  limit: number;
}

// Include 관계가 있는 포스트 (Ex 접미사)
export type PostEx = Prisma.PostGetPayload<{
  include: {
    user: true;
    category: true;
    // 필요한 관계가 있다면 여기에 추가
  };
}>;

// 포스트 복제 데이터
export interface DuplicatePost {
  title: string;
  copy_content?: boolean;
  copy_category?: boolean;
  copy_hashtags?: boolean;
}

// 일괄 작업 데이터
export interface BatchOperation {
  post_ids: string[];
  action: 'delete' | 'archive' | 'publish' | 'draft';
}

// 포스트 통계
export interface PostStats {
  total_posts: number;
  published_posts: number;
  draft_posts: number;
  archived_posts: number;
  total_views: number;
  total_likes: number;
  most_viewed_posts: PostEx[];
  most_liked_posts: PostEx[];
  recent_posts: PostEx[];
}

// 정렬 옵션
export type PostSortOption = 'newest' | 'oldest' | 'popular' | 'most_viewed' | 'most_liked' | 'title';

// 포스트 필터 확장
export interface PostFiltersEx extends PostFilters {
  sort?: PostSortOption;
  date_from?: string;
  date_to?: string;
}

export interface BatchDeleteResponseData {
  deleted_count: number;
  deleted_posts: { id: string; title: string }[];
  not_found_ids: string[];
}

export type BatchDeleteResponse = ApiResponse<BatchDeleteResponseData>;

export interface UpdatedPostInfo {
  id: string;
  title: string;
  status: string;
  is_published: boolean;
  updated_at: string;
}

export interface BatchUpdateChanges {
  status?: string;
  is_published?: boolean;
}

export interface BatchUpdateResponseData {
  updated_count: number;
  updated_posts: UpdatedPostInfo[];
  not_found_ids: string[];
  changes: BatchUpdateChanges;
}

export interface BatchUpdateRequest {
  post_ids: string[];
  status?: string;
  is_published?: boolean;
}

export type BatchUpdateStatusResponse = ApiResponse<BatchUpdateResponseData>;
