import type { Hashtag } from '@/_prisma/client';

export interface CreateHashtag {
  name: string;
}

export interface UpdateHashtag {
  name?: string;
}

export interface DeleteHashtag {
  id: string;
}

export interface HashtagPostsParams {
  id: string;
}

export interface HashtagAutocompleteParams {
  keyword: string;
}
