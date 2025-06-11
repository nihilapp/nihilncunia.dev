'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Trash2, Edit, Clock, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoadingCircle } from '@/(common)/_components/LoadingCircle';
import { Button } from '@/(common)/_components/ui/button';
import { useGetDrafts, useDeletePost } from '@/_entities/posts';
import { cn, toast } from '@/_libs';

const draftsListVariants = cva(
  [
    'min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 p-6',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface DraftsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof draftsListVariants> {}

export function DraftsList({ className, ...props }: DraftsListProps) {
  const router = useRouter();
  const [ currentPage, setCurrentPage, ] = useState(1);
  const { drafts, total, loading, } = useGetDrafts(currentPage, 10);
  const deletePostMutation = useDeletePost();

  const handleEditDraft = (draftId: string) => {
    router.push(`/admin/posts/${draftId}/edit`);
  };

  const handleDeleteDraft = async (draftId: string, title: string) => {
    if (!confirm(`"${title}" 포스트를 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await deletePostMutation.mutateAsync(draftId);
      toast.success('임시 저장 포스트가 삭제되었습니다.');
    } catch (error) {
      console.error('임시 저장 포스트 삭제 실패:', error);
      toast.error('삭제에 실패했습니다.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div
      className={cn(
        draftsListVariants({}),
        className
      )}
      {...props}
    >
      <div className='max-w-6xl mx-auto space-y-8'>
        {/* Header */}
        <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                임시 저장 포스트
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mt-2'>
                작성 중인 포스트들을 관리하고 편집할 수 있습니다.
              </p>
            </div>
            <div className='text-sm text-gray-500'>
              총 {total}개의 임시 저장 포스트
            </div>
          </div>
        </div>

        {/* Drafts List */}
        <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden'>
          {drafts.length === 0 ? (
            <div className='p-12 text-center'>
              <Clock className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-600 mb-2'>
                임시 저장된 포스트가 없습니다
              </h3>
              <p className='text-gray-500 mb-6'>
                새로운 포스트를 작성하고 임시 저장해보세요.
              </p>
              <Button
                onClick={() => router.push('/admin/posts/new')}
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              >
                새 포스트 작성
              </Button>
            </div>
          ) : (
            <div className='divide-y divide-gray-200 dark:divide-slate-700'>
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className='p-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>
                        {draft.title || '제목 없음'}
                      </h3>
                      <p className='text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2'>
                        {draft.excerpt || draft.content.substring(0, 200) + '...'}
                      </p>
                      <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <span className='flex items-center gap-1'>
                          <Clock className='w-4 h-4' />
                          {formatDate(draft.updated_at)}
                        </span>
                        <span className='px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs'>
                          임시 저장
                        </span>
                        {draft.category && (
                          <span
                            className='px-2 py-1 rounded-full text-xs text-white'
                            style={{ backgroundColor: draft.category.color || '#6b7280', }}
                          >
                            {draft.category.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-2 ml-4'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleEditDraft(draft.id)}
                        className='flex items-center gap-1'
                      >
                        <Edit className='w-4 h-4' />
                        편집
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleDeleteDraft(draft.id, draft.title)}
                        disabled={deletePostMutation.isPending}
                        className='text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300'
                      >
                        <Trash2 className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {total > 10 && (
          <div className='flex justify-center'>
            <div className='flex gap-2'>
              {Array.from(
                { length: Math.ceil(total / 10), },
                (_, i) => i + 1
              ).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
