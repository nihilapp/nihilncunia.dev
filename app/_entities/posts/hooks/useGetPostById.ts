import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';
import type { PostEx } from '../posts.types';

import { useDone, useLoading } from '@/_entities/common';

export const useGetPostById = (
  id: string,
  options?: UseQueryOptions
) => {
  const {
    data: postResponse,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: postsKeys.detail(id),
    queryFn: () => PostsApi.getById(id),
    enabled: !!id,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    post: postResponse?.response as PostEx | undefined,
    loading,
    done,
    ...other,
  };
};
