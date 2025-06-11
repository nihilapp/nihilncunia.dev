import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { userKeys } from '@/_data';
import { useDone, useLoading } from '@/_entities/common';
import { UsersApi } from '@/_entities/users/users.api';
import type { UserEx } from '@/_entities/users/users.types';

export function useGetUserById(id: string, options?: UseQueryOptions) {
  const {
    data: user,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: userKeys.detailId(id),
    queryFn: () => UsersApi.getById(id),
    enabled: !!id,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    user: user as unknown as UserEx,
    loading,
    done,
    ...other,
  };
}
