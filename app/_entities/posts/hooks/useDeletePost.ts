import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { postsKeys, PostsApi } from '@/_entities/posts';
import type { DeletePost } from '@/_entities/posts';

export function useDeletePost(options?: MutationOptions<null, DeletePost>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (deletePost: DeletePost) => (
      PostsApi.delete(deletePost)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all(), });
    },
    ...options,
  });

  return query;
}
