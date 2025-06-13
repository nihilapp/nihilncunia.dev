import { useMutation } from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import type { UpdateUserPassword } from '@/_entities/users';
import { UsersApi } from '@/_entities/users';
import type { User } from '@/_prisma/client';

interface UpdateUserPasswordParams {
  id: string;
  data: UpdateUserPassword;
}

export function useUpdateUserPassword(options?: MutationOptions<User, UpdateUserPasswordParams>) {
  const query = useMutation({
    mutationFn: ({ id, data, }: UpdateUserPasswordParams) => (
      UsersApi.updatePassword(id, data)
    ),
    ...options,
  });

  return query;
}
