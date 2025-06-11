import type {
  CreateSubcategory,
  UpdateSubcategory,
  SubcategoryEx,
  SubcategoriesResponse,
  SubcategoryResponse,
  DeleteSubcategoryResponse
} from './subcategories.types';

import { Api } from '@/_libs';

export class SubcategoriesApi {

  static async getSubcategories(categoryId?: string) {
    const params = categoryId ? `?category_id=${categoryId}` : '';
    return Api.getQuery<SubcategoriesResponse>(`/subcategories${params}`);
  }

  static async createSubcategory(data: CreateSubcategory) {
    return Api.postQuery<SubcategoryResponse, CreateSubcategory>(
      '/subcategories',
      data
    );
  }

  static async updateSubcategory(
    id: string,
    data: UpdateSubcategory
  ) {
    return Api.putQuery<SubcategoryResponse, UpdateSubcategory>(
      `/subcategories/${id}`,
      data
    );
  }

  static async deleteSubcategory(id: string) {
    return Api.deleteQuery<DeleteSubcategoryResponse>(`/subcategories/${id}`);
  }

}
