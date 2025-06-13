export const subcategoriesKeys = {
  subcategories: ['subcategories'] as const,
  all: () => [...subcategoriesKeys.subcategories, 'all'] as const,
  byId: (id: string) => [...subcategoriesKeys.subcategories, 'byId', id] as const,
  posts: (id: string) => [...subcategoriesKeys.subcategories, 'posts', id] as const,
};
