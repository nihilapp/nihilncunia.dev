import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useLoading, useDone } from '@/_entities/common';
import { PostsApi, postsKeys } from '@/_entities/posts';

export function useGetPost(id: string, options?: UseQueryOptions) {
  const {
    data: post,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: postsKeys.byId(id),
    queryFn: () => PostsApi.getById(id),
    enabled: !!id,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    post,
    loading,
    done,
    ...other,
  };
}
