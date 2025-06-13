import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useLoading, useDone } from '@/_entities/common';
import { CategoriesApi, categoriesKeys } from '@/_entities/categories';

export function useGetCategoryPosts(id: string, options?: UseQueryOptions) {
  const {
    data: posts,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: categoriesKeys.posts(id),
    queryFn: () => CategoriesApi.getPosts(id),
    enabled: !!id,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    posts,
    loading,
    done,
    ...other,
  };
}
