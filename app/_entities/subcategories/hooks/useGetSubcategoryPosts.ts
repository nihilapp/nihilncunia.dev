import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useLoading, useDone } from '@/_entities/common';
import { SubcategoriesApi, subcategoriesKeys } from '@/_entities/subcategories';

export function useGetSubcategoryPosts(id: string, options?: UseQueryOptions) {
  const {
    data: posts,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: subcategoriesKeys.posts(id),
    queryFn: () => SubcategoriesApi.getPosts(id),
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
