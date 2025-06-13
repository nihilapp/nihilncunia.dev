import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { categoriesKeys, CategoriesApi } from '@/_entities/categories';
import type { CreateCategory } from '@/_entities/categories';
import type { Category } from '@/_prisma/client';

export function useCreateCategory(options?: MutationOptions<Category, CreateCategory>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (createCategory: CreateCategory) => (
      CategoriesApi.create(createCategory)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all(), });
    },
    ...options,
  });

  return query;
}
