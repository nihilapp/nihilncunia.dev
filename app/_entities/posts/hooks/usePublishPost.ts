import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { postsKeys, PostsApi } from '@/_entities/posts';
import type { PublishPostParams } from '@/_entities/posts';
import type { Post } from '@/_prisma/client';

export function usePublishPost(options?: MutationOptions<Post, PublishPostParams>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (params: PublishPostParams) => (
      PostsApi.publish(params)
    ),
    onSuccess: (_, { id, }) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.byId(id), });
    },
    ...options,
  });

  return query;
}
