import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersApi } from '@/_entities/users/users.api';
import type { CreateUser } from '@/_types';
import { userKeys } from '@/_data';

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
