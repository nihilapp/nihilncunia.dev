export const hashtagsKeys = {
  hashtags: ['hashtags'] as const,
  all: () => [...hashtagsKeys.hashtags, 'all'] as const,
  byId: (id: string) => [...hashtagsKeys.hashtags, 'byId', id] as const,
  posts: (id: string) => [...hashtagsKeys.hashtags, 'posts', id] as const,
  autocomplete: (keyword: string) => [...hashtagsKeys.hashtags, 'autocomplete', keyword] as const,
};
