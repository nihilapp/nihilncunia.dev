import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { SubcategoriesApi, subcategoriesKeys } from '@/_entities/subcategories';
import type { UpdateSubcategory } from '@/_entities/subcategories';
import type { Category } from '@/_prisma/client';

interface UpdateSubcategoryParams {
  id: string;
  data: UpdateSubcategory;
}

export function useUpdateSubcategory(options?: MutationOptions<Category, UpdateSubcategoryParams>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: ({ id, data, }: UpdateSubcategoryParams) => (
      SubcategoriesApi.update(id, data)
    ),
    onSuccess: (_, { id, }) => {
      queryClient.invalidateQueries({ queryKey: subcategoriesKeys.all(), });
      queryClient.invalidateQueries({ queryKey: subcategoriesKeys.byId(id), });
    },
    ...options,
  });

  return query;
}
