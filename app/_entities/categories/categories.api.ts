import type { CreateCategory, UpdateCategory, DeleteCategory } from './categories.types';

import { Api } from '@/_libs';
import type { Category, Post } from '@/_prisma/client';

export class CategoriesApi {
  static async getAll() {
    return Api.getQuery<Category[]>('/categories');
  }

  static async getById(id: string) {
    return Api.getQuery<Category>(`/categories/${id}`);
  }

  static async create(createCategory: CreateCategory) {
    return Api.postQuery<Category, CreateCategory>('/categories', createCategory);
  }

  static async update(id: string, updateCategory: UpdateCategory) {
    return Api.putQuery<Category, UpdateCategory>(`/categories/${id}`, updateCategory);
  }

  static async delete(deleteCategory: DeleteCategory) {
    return Api.deleteWithDataQuery<null, DeleteCategory>(
      `/categories/${deleteCategory.id}`,
      deleteCategory
    );
  }

  static async getPosts(id: string) {
    return Api.getQuery<Post[]>(`/categories/${id}/posts`);
  }
}
