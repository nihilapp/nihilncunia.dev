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
    return Api.getQuery<Category[]>('/categories');
  }

  // 개별 카테고리 조회 (ID)
  static async getById(id: string) {
    return Api.getQuery<Category>('/categories/' + id);
  }

  // 카테고리 생성
  static async create(data: any) {
    return Api.postQuery<Category, any>('/categories', data);
  }

  // 카테고리 수정
  static async update(id: string, data: any) {
    return Api.putQuery<Category, any>('/categories/' + id, data);
  }

  // 카테고리 삭제
  static async delete(id: string) {
    return Api.deleteQuery<null>('/categories/' + id);
  }
}
