import type { CreateSubcategory, UpdateSubcategory, SubcategoryEx } from './subcategories.types';

import { Api } from '@/_libs';

export class SubcategoriesApi {

  static async getSubcategories(categoryId?: string) {
    const params = categoryId ? `?category_id=${categoryId}` : '';
    return Api.getQuery<{
      message: string;
      response: SubcategoryEx[];
    }>(`/subcategories${params}`);
  }

  static async createSubcategory(data: CreateSubcategory) {
    return Api.postQuery<
      {
        message: string;
        response: SubcategoryEx;
      },
      CreateSubcategory
    >(
      '/subcategories',
      data
    );
  }

  static async updateSubcategory(
    id: string,
    data: UpdateSubcategory
  ) {
    return Api.putQuery<
      {
        message: string;
        response: SubcategoryEx;
      },
      UpdateSubcategory
    >(
      `/subcategories/${id}`,
      data
    );
  }

  static async deleteSubcategory(id: string) {
    return Api.deleteQuery<{
      message: string;
      response: null;
    }>(`/subcategories/${id}`);
  }

}
