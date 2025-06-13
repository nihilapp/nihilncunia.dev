import { useMutation } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import type { DeleteUser } from '@/_entities/users';
import { UsersApi } from '@/_entities/users';

export function useDeleteUser(options?: MutationOptions<null, DeleteUser>) {
  const query = useMutation({
    mutationFn: (deleteUser: DeleteUser) => (
      UsersApi.delete(deleteUser)
    ),
    ...options,
  });

  return query;
}
