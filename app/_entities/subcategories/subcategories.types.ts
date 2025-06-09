import type { Subcategory } from '@/_prisma/client';

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
export interface SubcategoryEx extends Subcategory {
  category: {
    id: string;
    name: string;
    slug: string;
    color: string | null;
  };
  _count?: {
    posts: number;
  };
}