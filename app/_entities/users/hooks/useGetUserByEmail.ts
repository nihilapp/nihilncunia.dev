import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useDone, useLoading } from '@/_entities/common';
import { UsersApi, usersKeys } from '@/_entities/users';

export function useGetUserByEmail(email: string, options?: UseQueryOptions) {
  const {
    data: user,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: usersKeys.byEmail(email),
    queryFn: () => UsersApi.getByEmail(email),
    enabled: !!email,
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
