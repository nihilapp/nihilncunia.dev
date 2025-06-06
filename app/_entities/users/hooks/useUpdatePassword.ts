import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersApi } from '@/_entities/users/users.api';
import type { UpdateUserPassword } from '@/_types';
import { userKeys } from '@/_data';

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
