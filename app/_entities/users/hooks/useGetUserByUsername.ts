import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useDone, useLoading } from '@/_entities/common';
import { UsersApi, usersKeys } from '@/_entities/users';

export function useGetUserByUsername(name: string, options?: UseQueryOptions) {
  const {
    data: user,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: usersKeys.byName(name),
    queryFn: () => UsersApi.getByUsername(name),
    enabled: !!name,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    user,
    loading,
    done,
    ...other,
  };
}
