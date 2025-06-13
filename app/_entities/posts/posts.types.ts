import type { Post, PostStatus, PublishType } from '@/_prisma/client';

export interface CreatePost {
  title: string;
  content: string;
  category_id: string;
  subcategory_id?: string;
  hashtag_ids?: string[];
  status?: PostStatus;
  publish?: PublishType;
}

export interface UpdatePost {
  title?: string;
  content?: string;
  category_id?: string;
  subcategory_id?: string;
  hashtag_ids?: string[];
  status?: PostStatus;
  publish?: PublishType;
}

export interface DeletePost {
  id: string;
}

export interface SearchPostsParams {
  keyword: string;
}

export interface PublishPostParams {
  id: string;
  publish: PublishType;
}

export interface PostViewsParams {
  id: string;
}

export interface PostLikesParams {
  id: string;
}

export interface DraftPost {
  title: string;
  content: string;
}

export interface AutosavePostParams {
  id: string;
  data: Partial<CreatePost>;
}

export interface BatchPosts {
  ids: string[];
}

export interface RelatedPostsParams {
  id: string;
}
