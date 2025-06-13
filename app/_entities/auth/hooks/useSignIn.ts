import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthApi } from '../auth.api';
import { authKeys } from '../auth.keys';
import type { SignIn, AuthResponse } from '../auth.types';

import type { MutationOptions } from '@/_entities/common';

export function useSignIn(options?: MutationOptions<AuthResponse, SignIn>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (signIn: SignIn) => (
      AuthApi.signIn(signIn)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session(), });
    },
    ...options,
  });

  return query;
}
