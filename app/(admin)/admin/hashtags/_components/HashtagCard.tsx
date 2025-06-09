'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FiEdit3, FiTrash2, FiHash, FiFileText } from 'react-icons/fi';
import { toast } from 'sonner';

import { Badge } from '@/(common)/_components/ui/badge';
import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { HashtagsApi } from '@/_entities/hashtags';
import type { Hashtag } from '@/_prisma/client';

interface HashtagWithCount extends Hashtag {
  post_count: number;
}

interface HashtagCardProps {
  hashtag: HashtagWithCount;
  onEdit: (hashtag: HashtagWithCount) => void;
}

export function HashtagCard({ hashtag, onEdit, }: HashtagCardProps) {
  const [ isDeleting, setIsDeleting, ] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: HashtagsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'hashtags', ], });
      toast.success('해시태그가 성공적으로 삭제되었습니다.');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || '해시태그 삭제에 실패했습니다.';
      toast.error(message);
    },
    onSettled: () => {
      setIsDeleting(false);
    },
  });

  const handleDelete = async () => {
    if (hashtag.post_count > 0) {
      toast.error('해당 해시태그가 사용 중인 포스트가 존재하여 삭제할 수 없습니다.');
      return;
    }

    const confirmed = window.confirm(`'${hashtag.name}' 해시태그를 정말로 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`);

    if (!confirmed) return;

    setIsDeleting(true);
    deleteMutation.mutate(hashtag.id);
  };

  return (
    <Card className='group hover:shadow-lg transition-all duration-200 border-2 hover:border-emerald-200 dark:hover:border-emerald-800'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg flex items-center gap-2'>
            <div className='p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20'>
              <FiHash className='w-4 h-4 text-emerald-600 dark:text-emerald-400' />
            </div>
            {hashtag.name}
          </CardTitle>

          <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => onEdit(hashtag)}
              className='h-8 w-8 p-0'
            >
              <FiEdit3 className='w-4 h-4' />
            </Button>

            <Button
              variant='outline'
              size='sm'
              onClick={handleDelete}
              disabled={isDeleting}
              className='h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-900/20'
            >
              <FiTrash2 className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* 슬러그 */}
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-500 dark:text-gray-400'>슬러그:</span>
          <Badge variant='secondary' className='font-mono'>
            {hashtag.slug}
          </Badge>
        </div>

        {/* 포스트 개수 */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
            <FiFileText className='w-4 h-4' />
            사용된 포스트
          </div>
          <Badge
            variant={hashtag.post_count > 0 ? 'default' : 'secondary'}
            className={hashtag.post_count > 0 ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
          >
            {hashtag.post_count}개
          </Badge>
        </div>

        {/* 생성일 */}
        <div className='text-xs text-gray-500 dark:text-gray-400 pt-2 border-t'>
          생성일: {new Date(hashtag.created_at).toLocaleDateString('ko-KR')}
        </div>
      </CardContent>
    </Card>
  );
}
