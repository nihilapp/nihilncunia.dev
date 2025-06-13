import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useDone, useLoading } from '@/_entities/common';
import { UsersApi, usersKeys } from '@/_entities/users';

export function useGetUserById(id: string, options?: UseQueryOptions) {
  const {
    data: user,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: usersKeys.byId(id),
    queryFn: () => UsersApi.getById(id),
    enabled: !!id,
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
