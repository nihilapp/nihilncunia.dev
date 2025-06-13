import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { postsKeys, PostsApi } from '@/_entities/posts';
import type { AutosavePostParams } from '@/_entities/posts';
import type { Post } from '@/_prisma/client';

export function useAutosavePost(options?: MutationOptions<Post, AutosavePostParams>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (params: AutosavePostParams) => (
      PostsApi.autosave(params)
    ),
    onSuccess: (_, { id, }) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.byId(id), });
    },
    ...options,
  });

  return query;
}
