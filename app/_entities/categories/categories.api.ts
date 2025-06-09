import type {
  CreateCategory,
  UpdateCategory,
  CategoryEx
} from './categories.types';

import { Api } from '@/_libs';
import type { Category } from '@/_prisma/client';

export class CategoriesApi {
  // 모든 카테고리 조회
  static async getAll() {
    return Api.getQuery<{
      message: string;
      response: (Category & {
        post_count: number;
        published_post_count: number;
      })[];
        }>('/categories');
  }

  // 개별 카테고리 조회 (ID)
  static async getById(id: string) {
    return Api.getQuery<{
      message: string;
      response: Category;
    }>(`/categories/${id}`);
  }

  // 카테고리 생성
  static async create(data: CreateCategory) {
    return Api.postQuery<
      {
        message: string;
        response: Category;
      },
      CreateCategory
    >(
      '/categories',
      data
    );
  }

  // 카테고리 수정
  static async update(
    id: string,
    data: UpdateCategory
  ) {
    return Api.putQuery<
      {
        message: string;
        response: Category;
      },
      UpdateCategory
    >(
      `/categories/${id}`,
      data
    );
  }

  // 카테고리 삭제
  static async delete(id: string) {
    return Api.deleteQuery<{
      message: string;
      response: null;
    }>(`/categories/${id}`);
  }

  // 카테고리별 포스트 목록 조회
  static async getPostsByCategory(categoryId: string) {
    return Api.getQuery<{
      message: string;
      response: any[];
    }>(`/posts?category=${categoryId}`);
  }
}
