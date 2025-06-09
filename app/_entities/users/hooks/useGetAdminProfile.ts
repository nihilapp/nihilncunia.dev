import { useQuery } from '@tanstack/react-query';

import { AdminApi } from '../users.api';

import { userAuthKeys } from '@/_data';

export function useGetAdminProfile() {
  return useQuery({
    queryKey: userAuthKeys.adminProfile(),
    queryFn: AdminApi.getProfile,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
