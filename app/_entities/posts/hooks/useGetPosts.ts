import { useQuery } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';
import type { PostFilters } from '../posts.types';

export const useGetPosts = (filters?: PostFilters) => {
  return useQuery({
    queryKey: postsKeys.list(JSON.stringify(filters || {})),
    queryFn: () => PostsApi.getAll(filters),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};
