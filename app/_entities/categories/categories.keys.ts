export const categoriesKeys = {
  categories: ['categories'] as const,
  all: () => [...categoriesKeys.categories, 'all'] as const,
  byId: (id: string) => [...categoriesKeys.categories, 'byId', id] as const,
  posts: (id: string) => [...categoriesKeys.categories, 'posts', id] as const,
};
