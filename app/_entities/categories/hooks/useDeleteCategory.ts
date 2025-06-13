import { useMutation, useQueryClient } from '@tanstack/react-query';

import { categoriesKeys, CategoriesApi } from '@/_entities/categories';
import type { DeleteCategory } from '@/_entities/categories';
import type { MutationOptions } from '@/_entities/common';

export function useDeleteCategory(options?: MutationOptions<null, DeleteCategory>) {
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
