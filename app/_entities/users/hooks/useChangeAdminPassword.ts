import { useMutation } from '@tanstack/react-query';

import { AdminApi } from '../users.api';
import type { AdminPasswordChangeRequest } from '../users.types';

export function useChangeAdminPassword() {
  return useMutation({
    mutationFn: (data: AdminPasswordChangeRequest) => AdminApi.changePassword(data),
  });
}
