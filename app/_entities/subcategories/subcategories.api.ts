import type { CreateSubcategory, UpdateSubcategory, DeleteSubcategory } from './subcategories.types';

import { Api } from '@/_libs';
import type { Category, Post } from '@/_prisma/client';

export class SubcategoriesApi {
  static async getAll() {
    return Api.getQuery<Category[]>('/subcategories');
  }

  static async getById(id: string) {
    return Api.getQuery<Category>(`/subcategories/${id}`);
  }

  static async create(createSubcategory: CreateSubcategory) {
    return Api.postQuery<Category, CreateSubcategory>('/subcategories', createSubcategory);
  }

  static async update(id: string, updateSubcategory: UpdateSubcategory) {
    return Api.putQuery<Category, UpdateSubcategory>(`/subcategories/${id}`, updateSubcategory);
  }

  static async delete(deleteSubcategory: DeleteSubcategory) {
    return Api.deleteWithDataQuery<null, DeleteSubcategory>(
      `/subcategories/${deleteSubcategory.id}`,
      deleteSubcategory
    );
  }

  static async getPosts(id: string) {
    return Api.getQuery<Post[]>(`/subcategories/${id}/posts`);
  }
}
