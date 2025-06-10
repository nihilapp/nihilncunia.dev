export const categoriesKeys = {
  all: [ 'categories', ] as const,
  lists: () => [ ...categoriesKeys.all, 'list', ] as const,
  list: (filters?: any) => [ ...categoriesKeys.lists(), filters, ] as const,
  details: () => [ ...categoriesKeys.all, 'detail', ] as const,
  detail: (id: string) => [ ...categoriesKeys.details(), id, ] as const,
};
