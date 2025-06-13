import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthApi } from '../auth.api';
import { authKeys } from '../auth.keys';
import type { SignOut } from '../auth.types';

import type { MutationOptions } from '@/_entities/common';

export function useSignOut(options?: MutationOptions<null, SignOut>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (signOut: SignOut) => (
      AuthApi.signOut(signOut)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session(), });
    },
    ...options,
  });

  return query;
}
