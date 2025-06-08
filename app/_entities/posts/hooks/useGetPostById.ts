import { useQuery } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: postsKeys.detail(id),
    queryFn: () => PostsApi.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};
