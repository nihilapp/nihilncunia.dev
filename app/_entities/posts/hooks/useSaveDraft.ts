import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';

export const useSaveDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => PostsApi.saveDraft(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsKeys.drafts(),
      });
      queryClient.invalidateQueries({
        queryKey: postsKeys.all,
      });
    },
  });
};
