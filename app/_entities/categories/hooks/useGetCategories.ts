import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { CategoriesApi } from '../categories.api';
import { categoriesKeys } from '../categories.keys';

import { useDone, useLoading } from '@/_entities/common';

export const useGetCategories = (options?: UseQueryOptions) => {
  const {
    data: categoriesResponse,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: categoriesKeys.all,
    queryFn: () => CategoriesApi.getAll(),
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    categories: categoriesResponse?.response || [],
    categoriesResponse,
    loading,
    done,
    ...other,
  };
};
