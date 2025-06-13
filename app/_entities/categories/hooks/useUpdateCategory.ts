import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { categoriesKeys, CategoriesApi } from '@/_entities/categories';
import type { UpdateCategory } from '@/_entities/categories';
import type { Category } from '@/_prisma/client';

interface UpdateCategoryParams {
  id: string;
  data: UpdateCategory;
}

export function useUpdateCategory(options?: MutationOptions<Category, UpdateCategoryParams>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: ({ id, data, }: UpdateCategoryParams) => (
      CategoriesApi.update(id, data)
    ),
    onSuccess: (_, { id, }) => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all(), });
      queryClient.invalidateQueries({ queryKey: categoriesKeys.byId(id), });
    },
    ...options,
  });

  return query;
}
