import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { userKeys } from '@/_data';
import { UsersApi } from '@/_entities/users/users.api';
import { useDone, useLoading } from '@/_entities/common';

export function useGetUserByEmail(email: string, options?: UseQueryOptions) {
  const {
    data: user,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: userKeys.detailEmail(email),
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
