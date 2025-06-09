import type { Hashtag } from '@/_prisma/client';

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
export interface HashtagEx extends Hashtag {
  post_hashtags: {
    post_id: string;
  }[];
}
