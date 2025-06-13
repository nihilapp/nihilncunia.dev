import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { SubcategoriesApi, subcategoriesKeys } from '@/_entities/subcategories';
import type { DeleteSubcategory } from '@/_entities/subcategories';

export function useDeleteSubcategory(options?: MutationOptions<null, DeleteSubcategory>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (deleteSubcategory: DeleteSubcategory) => (
      SubcategoriesApi.delete(deleteSubcategory)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subcategoriesKeys.all(), });
    },
    ...options,
  });

  return query;
}
