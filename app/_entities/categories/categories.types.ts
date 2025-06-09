import type { Category } from '@/_prisma/client';

// 카테고리 생성
export interface CreateCategory {
  name: string;
  slug?: string;
  description?: string;
  color?: string;
}

// 카테고리 수정
export interface UpdateCategory {
  name: string;
  slug?: string;
  description?: string;
  color?: string;
}

// Include 관계가 있는 카테고리 (Ex 접미사)
export interface CategoryEx extends Category {
  posts: {
    id: string;
    title: string;
    status: string;
  }[];
}
