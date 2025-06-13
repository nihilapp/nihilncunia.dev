import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { SubcategoriesApi, subcategoriesKeys } from '@/_entities/subcategories';
import type { CreateSubcategory } from '@/_entities/subcategories';
import type { Category } from '@/_prisma/client';

export function useCreateSubcategory(options?: MutationOptions<Category, CreateSubcategory>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (createSubcategory: CreateSubcategory) => (
      SubcategoriesApi.create(createSubcategory)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subcategoriesKeys.all(), });
    },
    ...options,
  });

  return query;
}
