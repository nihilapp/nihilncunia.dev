import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useLoading, useDone } from '@/_entities/common';
import { SubcategoriesApi, subcategoriesKeys } from '@/_entities/subcategories';

export function useGetSubcategories(options?: UseQueryOptions) {
  const {
    data: subcategories,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: subcategoriesKeys.all(),
    queryFn: SubcategoriesApi.getAll,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    subcategories,
    loading,
    done,
    ...other,
  };
}
