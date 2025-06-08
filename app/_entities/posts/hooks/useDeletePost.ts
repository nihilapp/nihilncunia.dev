import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => PostsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsKeys.all,
      });
    },
  });
};
