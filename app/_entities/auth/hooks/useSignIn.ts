import { useMutation } from '@tanstack/react-query';

import { AuthApi } from '@/_entities/auth/auth.api';
import type { SignInUser } from '@/_entities/user-auth';

export function useSignIn() {
  const query = useMutation({
    mutationFn: (signInData: SignInUser) => (
      AuthApi.signIn(signInData)
    ),
  });

  return query;
}
