import type { Category, Prisma } from '@/_prisma/client';

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
export type CategoryEx = Prisma.CategoryGetPayload<{
  include: {
    // 필요한 관계가 있다면 여기에 추가
  };
}>;

export interface CategoryWithCounts extends Category {
  post_count: number;
  published_post_count: number;
}
