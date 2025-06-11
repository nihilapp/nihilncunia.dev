import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';
import { postsKeys } from '../posts.keys';

import type { PostStatus } from '@/_prisma/client';

interface BatchUpdateStatusParams {
  postIds: string[];
  status?: PostStatus;
  is_published?: boolean;
}

interface BatchUpdateStatusResponse {
  updated_count: number;
  updated_posts: {
    id: string;
    title: string;
    status: string;
    is_published: boolean;
    updated_at: string;
  }[];
  not_found_ids: string[];
  changes: {
    status?: string;
    is_published?: boolean;
  };
}

export const useBatchUpdatePostStatus = (): UseMutationResult<
  BatchUpdateStatusResponse,
  unknown,
  BatchUpdateStatusParams
> => {
  const queryClient = useQueryClient();

  return useMutation<
    BatchUpdateStatusResponse,
    unknown,
    BatchUpdateStatusParams
  >({
    mutationFn: ({ postIds, status, is_published, }) =>
      PostsApi.batchUpdateStatus(postIds, { status, is_published, }).then(res => res.response),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: postsKeys.all,
      });
      if (variables?.postIds?.length === 1) {
        queryClient.invalidateQueries({
          queryKey: postsKeys.detail(variables.postIds[0]),
        });
      }
    },
  });
};
