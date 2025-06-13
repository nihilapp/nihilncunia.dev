import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useLoading, useDone } from '@/_entities/common';
import { PostsApi, postsKeys } from '@/_entities/posts';

export function useSearchPosts(keyword: string, options?: UseQueryOptions) {
  const {
    data: posts,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: postsKeys.search(keyword),
    queryFn: () => PostsApi.search(keyword),
    enabled: !!keyword,
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
