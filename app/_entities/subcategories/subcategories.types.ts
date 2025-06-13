import type { Category } from '@/_prisma/client';

export interface CreateSubcategory {
  name: string;
  description?: string;
  color?: string;
  parent_id: string;
}

export interface UpdateSubcategory {
  name?: string;
  description?: string;
  color?: string;
}

export interface DeleteSubcategory {
  id: string;
}

export interface SubcategoryPostsParams {
  id: string;
}
