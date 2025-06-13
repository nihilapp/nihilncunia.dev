import { useMutation } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import type { UpdateUser } from '@/_entities/users';
import { UsersApi } from '@/_entities/users';
import type { User } from '@/_prisma/client';

interface UpdateUserParams {
  id: string;
  data: UpdateUser;
}

export function useUpdateUser(options?: MutationOptions<User, UpdateUserParams>) {
  const query = useMutation({
    mutationFn: ({ id, data, }: UpdateUserParams) => (
      UsersApi.update(id, data)
    ),
    ...options,
  });

  return query;
}
