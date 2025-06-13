import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { postsKeys, PostsApi } from '@/_entities/posts';
import type { BatchPosts } from '@/_entities/posts';
import type { Post } from '@/_prisma/client';

export function useBatchPosts(options?: MutationOptions<Post[], BatchPosts>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (batchPosts: BatchPosts) => (
      PostsApi.batchStatus(batchPosts)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all(), });
    },
    ...options,
  });

  return query;
}
