import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { postsKeys, PostsApi } from '@/_entities/posts';
import type { PostLikesParams } from '@/_entities/posts';
import type { Post } from '@/_prisma/client';

export function usePostLikes(options?: MutationOptions<Post, PostLikesParams>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (params: PostLikesParams) => (
      PostsApi.updateLikes(params.id)
    ),
    onSuccess: (_, { id, }) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.byId(id), });
    },
    ...options,
  });

  return query;
}
