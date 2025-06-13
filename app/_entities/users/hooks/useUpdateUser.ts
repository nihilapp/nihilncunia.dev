import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import type { UpdateUser } from '@/_entities/users';
import { UsersApi, usersKeys } from '@/_entities/users';
import type { User } from '@/_prisma/client';

interface UpdateUserParams {
  id: string;
  data: UpdateUser;
}

export function useUpdateUser(options?: MutationOptions<User, UpdateUserParams>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: ({ id, data, }: UpdateUserParams) => (
      UsersApi.update(id, data)
    ),
    onSuccess: (_, { id, }) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all(), });
      queryClient.invalidateQueries({ queryKey: usersKeys.byId(id), });
    },
    ...options,
  });

  return query;
}
