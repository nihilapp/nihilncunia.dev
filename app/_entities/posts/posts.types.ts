import type { Post } from '@/_prisma/client';

export interface PostFormData {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  published: boolean;
  featured_image?: string;
}

export interface PostFilters {
  published?: boolean;
  user_id?: string;
  search?: string;
  category?: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}
