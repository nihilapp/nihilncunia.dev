import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useLoading, useDone } from '@/_entities/common';
import { HashtagsApi, hashtagsKeys } from '@/_entities/hashtags';

export function useHashtagAutocomplete(keyword: string, options?: UseQueryOptions) {
  const {
    data: hashtags,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: hashtagsKeys.autocomplete(keyword),
    queryFn: () => HashtagsApi.autocomplete(keyword),
    enabled: !!keyword,
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
