import type { SubcategoryEx } from './subcategories.types';

import { Api } from '@/_libs';
import type { Subcategory } from '@/_prisma/client';

export class SubcategoriesApi {
  static async getAll() {
    return Api.getQuery<Subcategory[]>('/subcategories');
  }

  static async getById(id: string) {
    return Api.getQuery<Subcategory>('/subcategories/' + id);
  }

  static async create(data: any) {
    return Api.postQuery<Subcategory, any>('/subcategories', data);
  }

  static async update(id: string, data: any) {
    return Api.putQuery<Subcategory, any>('/subcategories/' + id, data);
  }

  static async delete(id: string) {
    return Api.deleteQuery<null>('/subcategories/' + id);
  }
}
