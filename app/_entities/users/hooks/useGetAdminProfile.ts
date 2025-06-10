import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { AdminApi } from '../users.api';

import { userAuthKeys } from '@/_data';
import { useDone, useLoading } from '@/_entities/common';

export function useGetAdminProfile(options?: UseQueryOptions) {
  const {
    data: adminProfile,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: userAuthKeys.adminProfile(),
    queryFn: AdminApi.getProfile,
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    adminProfile,
    loading,
    done,
    ...other,
  };
}
