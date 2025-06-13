import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { hashtagsKeys, HashtagsApi } from '@/_entities/hashtags';
import type { UpdateHashtag } from '@/_entities/hashtags';
import type { Hashtag } from '@/_prisma/client';

interface UpdateHashtagParams {
  id: string;
  data: UpdateHashtag;
}

export function useUpdateHashtag(options?: MutationOptions<Hashtag, UpdateHashtagParams>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: ({ id, data, }: UpdateHashtagParams) => (
      HashtagsApi.update(id, data)
    ),
    onSuccess: (_, { id, }) => {
      queryClient.invalidateQueries({ queryKey: hashtagsKeys.all(), });
      queryClient.invalidateQueries({ queryKey: hashtagsKeys.byId(id), });
    },
    ...options,
  });

  return query;
}
