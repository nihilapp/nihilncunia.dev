import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';
import type { PostFilters } from '../posts.types';

import { useDone, useLoading } from '@/_entities/common';

export const useGetPosts = (
  filters?: PostFilters,
  options?: UseQueryOptions
) => {
  const {
    data: posts,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: postsKeys.list(JSON.stringify(filters || {})),
    queryFn: () => PostsApi.getAll(filters),
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
};
