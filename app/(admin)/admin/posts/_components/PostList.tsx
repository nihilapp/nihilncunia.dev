'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/(common)/_components/ui/select';
import { useGetPosts, useDeletePost, PostStatus } from '@/_entities/posts';
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

  // API 호출
  const filters = statusFilter !== 'ALL' ? { status: statusFilter, } : undefined;
  const { posts, loading, error, } = useGetPosts(filters);
  const deletePostMutation = useDeletePost();

  console.log('posts', posts);

  const onClickNewPost = () => {
    router.push('/admin/posts/new');
  };

  const onClickEditPost = (postId: string) => {
    router.push(`/admin/posts/${postId}/edit`);
  };

  const onClickDeletePost = async (postId: string, title: string) => {
    if (confirm(`"${title}" 포스트를 삭제하시겠습니까?`)) {
      try {
        await deletePostMutation.mutateAsync(postId);
        toast.success('포스트가 삭제되었습니다.');
      } catch (error) {
        console.error('삭제 실패:', error);
        toast.error('삭제에 실패했습니다.');
      }
    }
  };

  const getStatusBadge = (status: PostStatus, isPublished: boolean) => {
    if (isPublished && status === PostStatus.PUBLISHED) {
      return (
        <span className='inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-sm'>
          <span className='w-1.5 h-1.5 bg-white rounded-full mr-1.5'></span>
          발행됨
        </span>
      );
    }

    switch (status) {
      case PostStatus.DRAFT:
        return (
          <span className='inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full shadow-sm'>
            <span className='w-1.5 h-1.5 bg-white rounded-full mr-1.5'></span>
            초안
          </span>
        );
      case PostStatus.PENDING:
        return (
          <span className='inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow-sm'>
            <span className='w-1.5 h-1.5 bg-white rounded-full mr-1.5'></span>
            대기
          </span>
        );
      case PostStatus.ARCHIVED:
        return (
          <span className='inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-full shadow-sm'>
            <span className='w-1.5 h-1.5 bg-white rounded-full mr-1.5'></span>
            보관됨
          </span>
        );
      default:
        return (
          <span className='inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full shadow-sm'>
            <span className='w-1.5 h-1.5 bg-white rounded-full mr-1.5'></span>
            {status}
          </span>
        );
    }
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
          </div>

          <Button
            onClick={onClickNewPost}
            className='px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
          >
            새 포스트 작성
          </Button>
        </div>
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
            <Card
              key={post.id}
              className='bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600'
            >
              <CardHeader className='pb-4'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <CardTitle className='text-xl mb-3 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'>
                      {post.title}
                    </CardTitle>
                    <div className='flex items-center flex-wrap gap-3 text-sm'>
                      {getStatusBadge(post.status, post.is_published)}
                      <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
                      <span className='text-gray-500 dark:text-gray-400 font-medium'>
                        {new Date(post.created_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      {post.category && (
                        <>
                          <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
                          <span className='px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full'>
                            {post.category.name}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className='flex space-x-3 ml-4'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => onClickEditPost(post.id)}
                      className='px-4 py-2 border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-all duration-200'
                    >
                      수정
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => onClickDeletePost(post.id, post.title)}
                      disabled={deletePostMutation.isPending}
                      className='px-4 py-2 border-2 border-red-300 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-200 disabled:opacity-50'
                    >
                      {deletePostMutation.isPending ? '삭제 중...' : '삭제'}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {post.excerpt && (
                <CardContent className='pt-0'>
                  <div className='p-4 bg-gray-50 dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600'>
                    <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2'>
                      {post.excerpt}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
