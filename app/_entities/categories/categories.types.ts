import type { Category } from '@/_prisma/client';
import type { ApiResponse } from '../common';

// 카테고리 생성
export interface CreateCategory {
  name: string;
  slug?: string;
  description?: string;
  color?: string;
}

// 카테고리 수정
export interface UpdateCategory {
  name: string;
  slug?: string;
  description?: string;
  color?: string;
}

// Include 관계가 있는 카테고리 (Ex 접미사)
export interface CategoryEx extends Category {
  posts: {
    id: string;
    title: string;
    status: string;
  }[];
}

export interface CategoryWithCounts extends Category {
  post_count: number;
  published_post_count: number;
}

export type CategoriesResponse = ApiResponse<CategoryWithCounts[]>;
export type CategoryResponse = ApiResponse<Category>;
export type DeleteCategoryResponse = ApiResponse<null>;
export type CategoryPostsResponse = ApiResponse<any[]>;
