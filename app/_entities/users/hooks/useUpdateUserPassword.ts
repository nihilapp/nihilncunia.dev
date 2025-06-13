import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import type { UpdateUserPassword } from '@/_entities/users';
import { UsersApi, usersKeys } from '@/_entities/users';
import type { User } from '@/_prisma/client';

interface UpdateUserPasswordParams {
  id: string;
  data: UpdateUserPassword;
}

export function useUpdateUserPassword(options?: MutationOptions<User, UpdateUserPasswordParams>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: ({ id, data, }: UpdateUserPasswordParams) => (
      UsersApi.updatePassword(id, data)
    ),
    onSuccess: (_, { id, }) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all(), });
      queryClient.invalidateQueries({ queryKey: usersKeys.byId(id), });
    },
    ...options,
  });

  return query;
}
