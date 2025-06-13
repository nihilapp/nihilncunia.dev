import { useMutation } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { UsersApi } from '@/_entities/users';
import type { DeletesUsersResponse, DeleteUsers } from '@/_entities/users';

export function useDeleteUsers(options?: MutationOptions<DeletesUsersResponse, DeleteUsers>) {
  const query = useMutation({
    mutationFn: (deleteUsers: DeleteUsers) => (
      UsersApi.deleteMany(deleteUsers)
    ),
    ...options,
  });

  return query;
}
