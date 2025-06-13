import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthApi } from '../auth.api';
import { authKeys } from '../auth.keys';
import type { Refresh, AuthResponse } from '../auth.types';

import type { MutationOptions } from '@/_entities/common';

export function useRefresh(options?: MutationOptions<AuthResponse, Refresh>) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (refresh: Refresh) => (
      AuthApi.refresh(refresh)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session(), });
    },
    ...options,
  });

  return query;
}
