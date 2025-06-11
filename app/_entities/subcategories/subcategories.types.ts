import type { ApiResponse } from '../common';

import type { Subcategory, Prisma } from '@/_prisma/client';

// 서브카테고리 생성
export interface CreateSubcategory {
  name: string;
  slug?: string;
  description?: string;
  category_id: string;
}

// 서브카테고리 수정
export interface UpdateSubcategory {
  name?: string;
  slug?: string;
  description?: string;
}

// Include 관계가 있는 서브카테고리
export type SubcategoryEx = Prisma.SubcategoryGetPayload<{
  include: {
    // 필요한 관계가 있다면 여기에 추가
  };
}>;

export type SubcategoriesResponse = ApiResponse<SubcategoryEx[]>;
export type SubcategoryResponse = ApiResponse<SubcategoryEx>;
export type DeleteSubcategoryResponse = ApiResponse<null>;
