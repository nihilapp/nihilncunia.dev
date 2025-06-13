import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { hashtagsKeys, HashtagsApi } from '@/_entities/hashtags';
import type { CreateHashtag } from '@/_entities/hashtags';
import type { Hashtag } from '@/_prisma/client';

export function useCreateHashtag(options?: MutationOptions<Hashtag, CreateHashtag>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (createHashtag: CreateHashtag) => (
      HashtagsApi.create(createHashtag)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hashtagsKeys.all(), });
    },
    ...options,
  });

  return query;
}
