import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { postsKeys, PostsApi } from '@/_entities/posts';
import type { CreatePost } from '@/_entities/posts';
import type { Post } from '@/_prisma/client';

export function useCreatePost(options?: MutationOptions<Post, CreatePost>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (createPost: CreatePost) => (
      PostsApi.create(createPost)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all(), });
    },
    ...options,
  });

  return query;
}
