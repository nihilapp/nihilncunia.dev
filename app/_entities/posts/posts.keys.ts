export const postsKeys = {
  all: [ 'posts', ] as const,
  lists: () => [ ...postsKeys.all, 'list', ] as const,
  list: (filters: string) => [ ...postsKeys.lists(), { filters, }, ] as const,
  details: () => [ ...postsKeys.all, 'detail', ] as const,
  detail: (id: string) => [ ...postsKeys.details(), id, ] as const,
  search: (query: string) => [ ...postsKeys.all, 'search', query, ] as const,
  bySlug: (slug: string) => [ ...postsKeys.all, 'slug', slug, ] as const,
  drafts: () => [ ...postsKeys.all, 'drafts', ] as const,
  published: () => [ ...postsKeys.all, 'published', ] as const,
};
