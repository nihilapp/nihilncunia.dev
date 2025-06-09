import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AdminApi } from '../users.api';
import type { AdminProfileUpdateRequest } from '../users.types';

import { userAuthKeys } from '@/_data';

export function useUpdateAdminProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AdminProfileUpdateRequest) => AdminApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userAuthKeys.adminProfile(),
      });
    },
  });
}
