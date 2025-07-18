import { useMutation } from '@tanstack/react-query';

import { AuthApi } from '@/_entities/auth/auth.api';
import type { SignOutUser } from '@/_entities/user-auth';

export function useSignOut() {
  const query = useMutation({
    mutationFn: (signOutData: SignOutUser) => {
      return AuthApi.signOut(signOutData);
    },
  });

  return query;
}
