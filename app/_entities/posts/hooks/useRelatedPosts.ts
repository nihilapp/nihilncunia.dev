import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useLoading, useDone } from '@/_entities/common';
import { PostsApi, postsKeys } from '@/_entities/posts';

export function useRelatedPosts(id: string, options?: UseQueryOptions) {
  const {
    data: posts,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: postsKeys.related(id),
    queryFn: () => PostsApi.getRelated(id),
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
