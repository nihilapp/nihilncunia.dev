import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersApi } from '@/_entities/users/users.api';
import { userKeys } from '@/_data';

export function useDeleteManyUsers() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (ids: string[]) => UsersApi.deleteMany(ids),
    onSuccess: () => {
      // 성공 시 사용자 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: userKeys.list,
      });
    },
  });

  return query;
}
