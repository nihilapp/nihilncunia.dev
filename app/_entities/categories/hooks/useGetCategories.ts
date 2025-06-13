import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useLoading, useDone } from '@/_entities/common';
import { CategoriesApi, categoriesKeys } from '@/_entities/categories';

export function useGetCategories(options?: UseQueryOptions) {
  const {
    data: categories,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: categoriesKeys.all(),
    queryFn: CategoriesApi.getAll,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    categories,
    loading,
    done,
    ...other,
  };
}
