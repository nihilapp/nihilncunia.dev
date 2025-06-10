export const subcategoriesKeys = {
  all: [ 'subcategories', ] as const,
  lists: () => [ ...subcategoriesKeys.all, 'list', ] as const,
  list: (filters?: any) => [ ...subcategoriesKeys.lists(), filters, ] as const,
  details: () => [ ...subcategoriesKeys.all, 'detail', ] as const,
  detail: (id: string) => [ ...subcategoriesKeys.details(), id, ] as const,
  byCategory: (categoryId: string) => [ ...subcategoriesKeys.all, 'category', categoryId, ] as const,
};
