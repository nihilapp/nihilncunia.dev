import { useMutation } from '@tanstack/react-query';

import { PostsApi } from '../posts.api';

export const useAutoSave = () => {
  return useMutation({
    mutationFn: ({ id, data, }: { id: string; data: any }) => PostsApi.autosave(id, data),
    onSuccess: () => {
      // 자동 저장은 조용히 진행 (캐시 무효화 없음)
    },
  });
};
