import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';

import { useDone, useLoading } from '@/_entities/common';

export const useGetPostById = (
  id: string,
  options?: UseQueryOptions
) => {
  const {
    data: post,
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
    post,
    loading,
    done,
    ...other,
  };
};
