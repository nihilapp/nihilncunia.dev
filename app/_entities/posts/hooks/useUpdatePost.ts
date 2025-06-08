import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';
import type { PostFormData } from '../posts.types';

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<PostFormData>;
    }) => PostsApi.update(
      id,
      data
    ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: postsKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: postsKeys.detail(variables.id),
      });
    },
  });
};
