import { useMutation } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import type { CreateUser } from '@/_entities/users';
import { UsersApi } from '@/_entities/users';
import type { User } from '@/_prisma/client';

export function useCreateUser(options?: MutationOptions<User, CreateUser>) {
  const query = useMutation({
    mutationFn: (createUser: CreateUser) => (
      UsersApi.create(createUser)
    ),
    ...options,
  });

  return query;
}
