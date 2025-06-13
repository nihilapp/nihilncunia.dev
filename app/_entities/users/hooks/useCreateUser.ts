import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import type { CreateUser } from '@/_entities/users';
import { UsersApi, usersKeys } from '@/_entities/users';
import type { User } from '@/_prisma/client';

export function useCreateUser(options?: MutationOptions<User, CreateUser>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (createUser: CreateUser) => (
      UsersApi.create(createUser)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all(), });
    },
    ...options,
  });

  return query;
}
