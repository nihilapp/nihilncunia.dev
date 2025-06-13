import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useLoading, useDone } from '@/_entities/common';
import { HashtagsApi, hashtagsKeys } from '@/_entities/hashtags';

export function useGetHashtags(options?: UseQueryOptions) {
  const {
    data: hashtags,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: hashtagsKeys.all(),
    queryFn: HashtagsApi.getAll,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    hashtags,
    loading,
    done,
    ...other,
  };
}
