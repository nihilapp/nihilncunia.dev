import { useMutation } from '@tanstack/react-query';

import { AuthApi } from '../auth.api';
import type { SignUp, AuthResponse } from '../auth.types';

import type { MutationOptions } from '@/_entities/common';

export function useSignUp(options?: MutationOptions<AuthResponse, SignUp>) {
  const query = useMutation({
    mutationFn: (signUp: SignUp) => (
      AuthApi.signUp(signUp)
    ),
    ...options,
  });

  return query;
}
