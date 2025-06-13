import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import type { DeleteUser } from '@/_entities/users';
import { UsersApi, usersKeys } from '@/_entities/users';

export function useDeleteUser(options?: MutationOptions<null, DeleteUser>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (deleteUser: DeleteUser) => (
      UsersApi.delete(deleteUser)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all(), });
    },
    ...options,
  });

  return query;
}
