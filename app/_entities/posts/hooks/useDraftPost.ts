import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { postsKeys, PostsApi } from '@/_entities/posts';
import type { DraftPost } from '@/_entities/posts';
import type { Post } from '@/_prisma/client';

export function useDraftPost(options?: MutationOptions<Post, DraftPost>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (draftPost: DraftPost) => (
      PostsApi.draft(draftPost)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.drafts, });
    },
    ...options,
  });

  return query;
}
