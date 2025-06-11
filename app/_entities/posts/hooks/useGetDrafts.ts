import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';

import { useDone, useLoading } from '@/_entities/common';

export const useGetDrafts = (
  page?: number,
  limit?: number,
  options?: UseQueryOptions
) => {
  const {
    data: draftsResponse,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: postsKeys.drafts(),
    queryFn: () => PostsApi.getDrafts(page, limit),
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    drafts: (draftsResponse as any)?.response?.posts || [],
    total: (draftsResponse as any)?.response?.total ?? 0,
    page: (draftsResponse as any)?.response?.page ?? 1,
    limit: (draftsResponse as any)?.response?.limit ?? 10,
    loading,
    done,
    ...other,
  };
};
