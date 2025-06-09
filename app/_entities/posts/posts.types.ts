import type { Post, PostStatus } from '@/_prisma/client';

// 포스트 생성
export interface CreatePost {
  title: string; // 제목 (필수)
  slug?: string; // URL slug (선택, 자동생성)
  content: string; // 내용 (필수)
  excerpt?: string; // 요약 (선택)
  category_id: string; // 카테고리 (필수)
  subcategory_id?: string; // 서브카테고리 (선택)
  hashtags?: string[]; // 해시태그 (선택)
  status?: PostStatus; // 현 상태 (기본값: PENDING)
  is_published?: boolean; // 공개여부 (기본값: false)
}

// 포스트 수정
export interface UpdatePost {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  category_id?: string;
  subcategory_id?: string;
  hashtags?: string[];
  status?: PostStatus;
  is_published?: boolean;
}

// 포스트 필터
export interface PostFilters {
  status?: PostStatus;
  is_published?: boolean;
  user_id?: string;
  search?: string;
  category_id?: string;
  subcategory_id?: string;
}

// 포스트 목록 응답
export interface PostsResponse {
  posts: PostEx[];
  total: number;
  page: number;
  limit: number;
}

// Include 관계가 있는 포스트 (Ex 접미사)
export interface PostEx extends Post {
  user: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    color: string | null;
  };
  subcategory?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  post_hashtags: {
    hashtag: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
}

// 포스트 작성 폼 데이터 (클라이언트용)
export interface PostFormData {
  title: string;
  slug?: string;
  content: string;
  excerpt: string;
  category_id: string;
  subcategory_id: string;
  hashtags: string[];
  status: PostStatus;
  is_published: boolean;
}
