export const postsKeys = {
  posts: ['posts'] as const,
  all: () => [...postsKeys.posts, 'all'] as const,
  byId: (id: string) => [...postsKeys.posts, 'byId', id] as const,
  search: (keyword: string) => [...postsKeys.posts, 'search', keyword] as const,
  related: (id: string) => [...postsKeys.posts, 'related', id] as const,
  drafts: ['posts', 'drafts'] as const,
};
