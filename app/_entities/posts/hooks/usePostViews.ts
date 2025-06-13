import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { postsKeys, PostsApi } from '@/_entities/posts';
import type { PostViewsParams } from '@/_entities/posts';
import type { Post } from '@/_prisma/client';

export function usePostViews(options?: MutationOptions<Post, PostViewsParams>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (params: PostViewsParams) => (
      PostsApi.updateViews(params.id)
    ),
    onSuccess: (_, { id, }) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.byId(id), });
    },
    ...options,
  });

  return query;
}
