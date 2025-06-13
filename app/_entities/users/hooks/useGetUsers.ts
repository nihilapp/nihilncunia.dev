import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useDone, useLoading } from '@/_entities/common';
import { UsersApi, usersKeys } from '@/_entities/users';

export function useGetUsers(options?: UseQueryOptions) {
  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: usersKeys.all(),
    queryFn: UsersApi.getAll,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    users,
    loading,
    done,
    ...other,
  };
}
