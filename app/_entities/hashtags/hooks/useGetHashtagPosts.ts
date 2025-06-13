import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useLoading, useDone } from '@/_entities/common';
import { HashtagsApi, hashtagsKeys } from '@/_entities/hashtags';

export function useGetHashtagPosts(id: string, options?: UseQueryOptions) {
  const {
    data: posts,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: hashtagsKeys.posts(id),
    queryFn: () => HashtagsApi.getPosts(id),
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
