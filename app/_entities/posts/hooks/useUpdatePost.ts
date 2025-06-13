import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { postsKeys, PostsApi } from '@/_entities/posts';
import type { UpdatePost } from '@/_entities/posts';
import type { Post } from '@/_prisma/client';

interface UpdatePostParams {
  id: string;
  data: UpdatePost;
}

export function useUpdatePost(options?: MutationOptions<Post, UpdatePostParams>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: ({ id, data, }: UpdatePostParams) => (
      PostsApi.update(id, data)
    ),
    onSuccess: (_, { id, }) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all(), });
      queryClient.invalidateQueries({ queryKey: postsKeys.byId(id), });
    },
    ...options,
  });

  return query;
}
