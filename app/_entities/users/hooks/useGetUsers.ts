import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { UsersApi } from '../users.api';
import { userKeys } from '@/_data';
import { useDone, useLoading } from '@/_entities/common';

export function useGetUsers(options?: UseQueryOptions) {
  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: userKeys.list,
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
