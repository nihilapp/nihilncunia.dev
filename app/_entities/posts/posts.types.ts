import type { Post, PostStatus } from '@/_prisma/client';

// 포스트 생성
export interface CreatePost {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  status?: PostStatus;
  featured_image?: string;
  category_id: string;
  hashtags?: string[];
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

// 포스트 수정
export interface UpdatePost {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  status?: PostStatus;
  featured_image?: string;
  category_id: string;
  hashtags?: string[];
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

// 포스트 필터
export interface PostFilters {
  status?: PostStatus;
  user_id?: string;
  search?: string;
  category?: string;
}

// 포스트 목록 응답
export interface PostsResponse {
  posts: Post[];
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
  post_hashtags: {
    hashtag: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
}
