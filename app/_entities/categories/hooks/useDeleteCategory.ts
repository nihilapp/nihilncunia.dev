import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { categoriesKeys, CategoriesApi } from '@/_entities/categories';
import type { DeleteCategory } from '@/_entities/categories';
import type { Category } from '@/_prisma/client';

export function useDeleteCategory(options?: MutationOptions<Category, DeleteCategory>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (deleteCategory: DeleteCategory) => (
      CategoriesApi.delete(deleteCategory)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all(), });
    },
    ...options,
  });

  return query;
}
