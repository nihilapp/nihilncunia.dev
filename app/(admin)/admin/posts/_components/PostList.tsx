'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { BatchActionToolbar } from './BatchActionToolbar';
import { ConfirmDialog } from './ConfirmDialog';
import { PostCard } from './PostCard';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Checkbox } from '@/(common)/_components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/(common)/_components/ui/select';
import {
  PostStatus,
  useBatchDeletePosts,
  useBatchUpdatePostStatus,
  useDeletePost,
  useGetPosts
} from '@/_entities/posts';
import { cn } from '@/_libs';

const PostListVariants = cva(
  [
    'space-y-6',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface PostListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof PostListVariants> {}

export function PostList({ className, ...props }: PostListProps) {
  const router = useRouter();
  const [ statusFilter, setStatusFilter, ] = useState<PostStatus | 'ALL'>('ALL');
  const [ selectedIds, setSelectedIds, ] = useState<string[]>([]);
  const [ isAlertOpen, setIsAlertOpen, ] = useState(false);
  const [ alertContent, setAlertContent, ] = useState({ title: '', description: '', onConfirm: () => {}, });

  // API 호출
  const filters = statusFilter !== 'ALL' ? { status: statusFilter, } : {};
  const {
    posts: allPosts,
    loading,
    error,
  } = useGetPosts(filters);
  const posts = useMemo(() => allPosts?.posts || [], [ allPosts, ]);
  const deletePostMutation = useDeletePost();
  const batchDeleteMutation = useBatchDeletePosts();
  const batchUpdateStatusMutation = useBatchUpdatePostStatus();

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [ ...prev, id, ]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((p) => p.id));
    }
  };

  const openConfirmationAlert = (
    title: string,
    description: string,
    onConfirm: () => void
  ) => {
    setAlertContent({ title, description, onConfirm, });
    setIsAlertOpen(true);
  };

  const handleBatchDelete = () => {
    openConfirmationAlert(
      '일괄 삭제 확인',
      `${selectedIds.length}개의 포스트를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`,
      async () => {
        try {
          await batchDeleteMutation.mutateAsync(selectedIds);
          toast.success(`${selectedIds.length}개의 포스트가 삭제되었습니다.`);
          setSelectedIds([]);
        } catch (error) {
          console.error('일괄 삭제 실패:', error);
          toast.error('일괄 삭제에 실패했습니다.');
        }
      }
    );
  };

  const handleBatchUpdateStatus = (status: PostStatus) => {
    openConfirmationAlert(
      '상태 일괄 변경 확인',
      `${selectedIds.length}개의 포스트 상태를 '${status}'(으)로 변경하시겠습니까?`,
      async () => {
        try {
          await batchUpdateStatusMutation.mutateAsync({ postIds: selectedIds, status, });
          toast.success('포스트 상태가 변경되었습니다.');
          setSelectedIds([]);
        } catch (error) {
          console.error('상태 변경 실패:', error);
          toast.error('상태 변경에 실패했습니다.');
        }
      }
    );
  };

  const onClickNewPost = () => {
    router.push('/admin/posts/new');
  };

  const onClickEditPost = (postId: string) => {
    router.push(`/admin/posts/${postId}/edit`);
  };

  const onClickDeletePost = async (postId: string, title: string) => {
    openConfirmationAlert(
      '포스트 삭제 확인',
      `"${title}" 포스트를 정말 삭제하시겠습니까?`,
      async () => {
        try {
          await deletePostMutation.mutateAsync(postId);
          toast.success('포스트가 삭제되었습니다.');
        } catch (error) {
          console.error('삭제 실패:', error);
          toast.error('삭제에 실패했습니다.');
        }
      }
    );
  };

  if (loading) {
    return (
      <div className={cn(PostListVariants({}), className)} {...props}>
        <div className='flex items-center justify-center h-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700'>
          <div className='text-center'>
            <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
            <div className='text-lg text-gray-600 dark:text-gray-400'>포스트를 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(PostListVariants({}), className)} {...props}>
        <div className='flex items-center justify-center h-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700'>
          <div className='text-center'>
            <div className='w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-red-500 text-xl'>⚠</span>
            </div>
            <div className='text-lg text-red-600 dark:text-red-400'>포스트를 불러오는데 실패했습니다.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(PostListVariants({}), className)} {...props}>
      {/* Header */}
      <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-6'>
            <div>
              <h2 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                포스트 목록
              </h2>
              <p className='text-gray-600 dark:text-gray-400 mt-1'>
                총 {posts.length}개의 포스트
              </p>
            </div>

            {/* Status Filter */}
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-3'>
                <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>필터:</label>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PostStatus | 'ALL')}>
                  <SelectTrigger className='w-36 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-blue-500 transition-all duration-200'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-2 border-gray-200 dark:border-slate-600'>
                    <SelectItem value='ALL' className='p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg'>전체</SelectItem>
                    <SelectItem value={PostStatus.PUBLISHED} className='p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg'>발행됨</SelectItem>
                    <SelectItem value={PostStatus.DRAFT} className='p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg'>초안</SelectItem>
                    <SelectItem value={PostStatus.PENDING} className='p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg'>대기</SelectItem>
                    <SelectItem value={PostStatus.ARCHIVED} className='p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg'>보관됨</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={onClickNewPost}
                className='px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
              >
                새 포스트 작성
              </Button>
            </div>
          </div>
        </div>

        {posts.length > 0 && (
          <div className='mt-6 flex items-center space-x-4 border-t border-gray-200 dark:border-slate-700 pt-4'>
            <Checkbox
              id='select-all'
              checked={selectedIds.length === posts.length && posts.length > 0}
              onCheckedChange={handleSelectAll}
              aria-label='모든 포스트 선택'
            />
            <label htmlFor='select-all' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              {selectedIds.length === posts.length ? '모두 선택 해제' : '모두 선택'}
            </label>
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-12'>
          <div className='text-center'>
            <div className='w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6'>
              <span className='text-gray-400 text-2xl'>📝</span>
            </div>
            <div className='text-gray-500 dark:text-gray-400 text-lg mb-6'>
              {statusFilter === 'ALL' ? '포스트가 없습니다.' : `${statusFilter} 상태의 포스트가 없습니다.`}
            </div>
            <Button
              onClick={onClickNewPost}
              className='px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
            >
              첫 번째 포스트 작성하기
            </Button>
          </div>
        </div>
      ) : (
        <div className='grid gap-6'>
          {posts.map((post: any) => (
            <PostCard
              key={post.id}
              post={post}
              checked={selectedIds.includes(post.id)}
              onSelect={handleSelect}
              onEdit={onClickEditPost}
              onDelete={onClickDeletePost}
            />
          ))}
        </div>
      )}

      {/* Batch Action Toolbar */}
      <BatchActionToolbar
        selectedCount={selectedIds.length}
        onPublish={() => handleBatchUpdateStatus(PostStatus.PUBLISHED)}
        onArchive={() => handleBatchUpdateStatus(PostStatus.ARCHIVED)}
        onDelete={handleBatchDelete}
        onCancel={() => setSelectedIds([])}
      />

      {/* Confirmation Alert Dialog */}
      <ConfirmDialog
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        title={alertContent.title}
        description={alertContent.description}
        onConfirm={alertContent.onConfirm}
      />
    </div>
  );
}
