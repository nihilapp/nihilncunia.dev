import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { SubcategoriesApi } from '../subcategories.api';
import { subcategoriesKeys } from '../subcategories.keys';

import { useDone, useLoading } from '@/_entities/common';

export const useGetSubcategories = (
  categoryId?: string,
  options?: UseQueryOptions
) => {
  const {
    data: subcategoriesResponse,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: categoryId
      ? subcategoriesKeys.byCategory(categoryId)
      : subcategoriesKeys.all,
    queryFn: () => SubcategoriesApi.getSubcategories(categoryId),
    enabled: !!categoryId,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    subcategories: subcategoriesResponse?.response || [],
    subcategoriesResponse,
    loading,
    done,
    ...other,
  };
};
