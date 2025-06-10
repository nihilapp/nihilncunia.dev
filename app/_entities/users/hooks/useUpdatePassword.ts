import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UpdateUserPassword } from '../users.types';

import { userKeys } from '@/_data';
import { UsersApi } from '@/_entities/users/users.api';

interface UseUpdatePasswordParams {
  id: string;
  data: UpdateUserPassword;
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: ({ id, data, }: UseUpdatePasswordParams) => (
      UsersApi.updatePassword(id, data)
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
