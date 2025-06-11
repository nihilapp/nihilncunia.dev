import type { ApiResponse } from '../common';

import type { Hashtag, Prisma } from '@/_prisma/client';

// 해시태그 생성
export interface CreateHashtag {
  name: string;
  slug?: string;
}

// 해시태그 수정
export interface UpdateHashtag {
  name: string;
  slug?: string;
}

// Include 관계가 있는 해시태그 (Ex 접미사)
export type HashtagEx = Prisma.HashtagGetPayload<{
  include: {
    // 필요한 관계가 있다면 여기에 추가
  };
}>;

export interface HashtagWithCount extends Hashtag {
  post_count: number;
}

export type HashtagsResponse = ApiResponse<HashtagWithCount[]>;
export type HashtagResponse = ApiResponse<HashtagWithCount>;
export type CreateHashtagResponse = ApiResponse<Hashtag>;
export type UpdateHashtagResponse = ApiResponse<Hashtag>;
export type DeleteHashtagResponse = ApiResponse<null>;

export interface HashtagPostsData {
  hashtag: {
    id: string;
    name: string;
    slug: string;
  };
  posts: any[];
  total: number;
  page: number;
  limit: number;
}

export type HashtagPostsResponse = ApiResponse<HashtagPostsData>;
