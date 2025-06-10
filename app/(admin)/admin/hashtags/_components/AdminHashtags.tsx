'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FiPlus, FiHash } from 'react-icons/fi';

import { cva, type VariantProps } from 'class-variance-authority';
import { HashtagForm } from './HashtagForm';
import { HashtagList } from './HashtagList';
import { HashtagStatistics } from './HashtagStatistics';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { HashtagsApi } from '@/_entities/hashtags';
import { cn } from '@/_libs';
import type { Hashtag } from '@/_prisma/client';

interface HashtagWithCount extends Hashtag {
  post_count: number;
}

const AdminHashtagsVariants = cva(
  [
    'min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-6',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface AdminHashtagsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof AdminHashtagsVariants> {}

export function AdminHashtags({ className, ...props }: AdminHashtagsProps) {
  const [ showForm, setShowForm, ] = useState(false);
  const [ editingHashtag, setEditingHashtag, ] = useState<HashtagWithCount | null>(null);

  const {
    data: hashtagsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: [ 'hashtags', ],
    queryFn: () => HashtagsApi.getAll(),
  });

  const hashtags = (hashtagsResponse?.response || []) as HashtagWithCount[];

  const onClickNewHashtag = () => {
    setEditingHashtag(null);
    setShowForm(true);
  };

  const onClickEditHashtag = (hashtag: HashtagWithCount) => {
    setEditingHashtag(hashtag);
    setShowForm(true);
  };

  const onCloseHashtagForm = () => {
    setShowForm(false);
    setEditingHashtag(null);
  };

  if (isLoading) {
    return (
      <div className={cn(AdminHashtagsVariants({}), className)} {...props}>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <div className='w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
              <p className='text-gray-600 dark:text-gray-400'>해시태그를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(AdminHashtagsVariants({}), className)} {...props}>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <p className='text-red-600 dark:text-red-400 mb-4'>해시태그 목록을 불러오는데 실패했습니다.</p>
              <Button
                onClick={() => window.location.reload()}
                variant='outline'
              >
                다시 시도
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(AdminHashtagsVariants({}), className)}
      {...props}
    >
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* 헤더 */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='text-3xl mb-2 flex items-center gap-3'>
                  <FiHash className='text-emerald-600 dark:text-emerald-400' />
                  해시태그 관리
                </CardTitle>
                <CardDescription>
                  블로그 해시태그를 생성, 수정, 삭제할 수 있습니다.
                </CardDescription>
              </div>
              <Button
                onClick={onClickNewHashtag}
                className='flex items-center gap-2'
              >
                <FiPlus className='w-5 h-5' />
                새 해시태그
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <HashtagStatistics hashtags={hashtags} />
          </CardContent>
        </Card>

        {/* 해시태그 목록 */}
        <HashtagList
          hashtags={hashtags}
          onEditHashtag={onClickEditHashtag}
        />

        {/* 해시태그 폼 모달 */}
        <HashtagForm
          hashtag={editingHashtag}
          open={showForm}
          onClose={onCloseHashtagForm}
        />
      </div>
    </div>
  );
}
