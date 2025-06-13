import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import { UsersApi, usersKeys } from '@/_entities/users';
import type { DeleteUsers } from '@/_entities/users';

export function useDeleteUsers(options?: MutationOptions<null, DeleteUsers>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (deleteUsers: DeleteUsers) => (
      UsersApi.deleteMany(deleteUsers)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all(), });
    },
    ...options,
  });

  return query;
}
