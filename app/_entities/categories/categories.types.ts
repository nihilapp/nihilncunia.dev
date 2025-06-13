import type { Category } from '@/_prisma/client';

export interface CreateCategory {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateCategory {
  name?: string;
  description?: string;
  color?: string;
}

export interface DeleteCategory {
  id: string;
}

export interface CategoryPostsParams {
  id: string;
}
