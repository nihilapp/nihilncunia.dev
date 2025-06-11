import type {
  CreateCategory,
  UpdateCategory,
  CategoryEx,
  CategoriesResponse,
  CategoryResponse,
  CategoryPostsResponse,
  DeleteCategoryResponse
} from './categories.types';

import { Api } from '@/_libs';
import type { Category } from '@/_prisma/client';

export class CategoriesApi {
  // 모든 카테고리 조회
  static async getAll() {
    return Api.getQuery<CategoriesResponse>('/categories');
  }

  // 개별 카테고리 조회 (ID)
  static async getById(id: string) {
    return Api.getQuery<CategoryResponse>(`/categories/${id}`);
  }

  // 카테고리 생성
  static async create(data: CreateCategory) {
    return Api.postQuery<CategoryResponse, CreateCategory>(
      '/categories',
      data
    );
  }

  // 카테고리 수정
  static async update(
    id: string,
    data: UpdateCategory
  ) {
    return Api.putQuery<CategoryResponse, UpdateCategory>(
      `/categories/${id}`,
      data
    );
  }

  // 카테고리 삭제
  static async delete(id: string) {
    return Api.deleteQuery<DeleteCategoryResponse>(`/categories/${id}`);
  }

  // 카테고리별 포스트 목록 조회
  static async getPostsByCategory(categoryId: string) {
    return Api.getQuery<CategoryPostsResponse>(`/posts?category=${categoryId}`);
  }
}
