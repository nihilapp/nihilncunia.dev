import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { hashtagsKeys, HashtagsApi } from '@/_entities/hashtags';
import type { DeleteHashtag } from '@/_entities/hashtags';
import type { Hashtag } from '@/_prisma/client';

export function useDeleteHashtag(options?: MutationOptions<Hashtag, DeleteHashtag>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (deleteHashtag: DeleteHashtag) => (
      HashtagsApi.delete(deleteHashtag)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hashtagsKeys.all(), });
    },
    ...options,
  });

  return query;
}
