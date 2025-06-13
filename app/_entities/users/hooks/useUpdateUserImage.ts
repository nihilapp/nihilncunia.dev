import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import type { MutationOptions } from '@/_entities/common';
import type { UpdateUserImage } from '@/_entities/users';
import { UsersApi, usersKeys } from '@/_entities/users';
import type { User } from '@/_prisma/client';

interface UpdateUserImageParams {
  id: string;
  data: UpdateUserImage;
}

export function useUpdateUserImage(options?: MutationOptions<User, UpdateUserImageParams>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: ({ id, data, }: UpdateUserImageParams) => (
      UsersApi.updateImage(id, data)
    ),
    onSuccess: (_, { id, }) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all(), });
      queryClient.invalidateQueries({ queryKey: usersKeys.byId(id), });
    },
    ...options,
  });

  return query;
}
