import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';

export const useBatchDeletePosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postIds: string[]) => PostsApi.batchDelete(postIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsKeys.all,
      });
    },
  });
};
