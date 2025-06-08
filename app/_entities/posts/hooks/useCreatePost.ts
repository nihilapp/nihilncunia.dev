import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';
import type { PostFormData } from '../posts.types';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostFormData) => PostsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsKeys.all,
      });
    },
  });
};
