import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '@/_entities/auth/auth.api';
import type { RefreshUserAccessToken } from '@/_types';

export function useRefresh() {
  const query = useMutation({
    mutationFn: (refreshData: RefreshUserAccessToken) => (
      AuthApi.refresh(refreshData)
    ),
  });

  return query;
}
