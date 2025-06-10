import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UpdateUserImage } from '../users.types';

import { userKeys } from '@/_data';
import { UsersApi } from '@/_entities/users/users.api';

interface UseUpdateImageParams {
  id: string;
  data: UpdateUserImage;
}

export function useUpdateImage() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: ({ id, data, }: UseUpdateImageParams) => (
      UsersApi.updateImage(id, data)
    ),
    onSuccess: (res, postData) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.list,
      });
      queryClient.invalidateQueries({
        queryKey: userKeys.detailId(postData.id),
      });
    },
  });

  return query;
}
