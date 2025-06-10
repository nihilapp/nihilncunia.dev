import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CreateUser } from '../users.types';

import { userKeys } from '@/_data';
import { UsersApi } from '@/_entities/users/users.api';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: CreateUser) => (
      UsersApi.create(data)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.list,
      });
    },
  });

  return query;
}
