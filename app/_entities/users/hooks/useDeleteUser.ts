import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/_data';
import { UsersApi } from '@/_entities/users/users.api';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (id: string) => UsersApi.delete(id),
    onSuccess: (res, id) => {
      // 성공 시 사용자 목록 및 특정 사용자 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: userKeys.list,
      });
      queryClient.invalidateQueries({
        queryKey: userKeys.detailId(id),
      });
    },
  });

  return query;
}
