import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { AuthApi } from '../auth.api';
import { authKeys } from '../auth.keys';

import { useLoading, useDone } from '@/_entities/common';

export function useGetSession(options?: UseQueryOptions) {
  const {
    data: session,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery({
    queryKey: authKeys.session(),
    queryFn: AuthApi.getSession,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    session,
    loading,
    done,
    ...other,
  };
}
