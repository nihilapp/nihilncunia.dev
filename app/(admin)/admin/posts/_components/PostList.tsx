'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/(common)/_components/ui/select';
import { useGetPosts, useDeletePost, PostStatus } from '@/_entities/posts';
import { cn } from '@/_libs';

const PostListVariants = cva(
  [
    'space-y-4',
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
        alert('포스트가 삭제되었습니다.');
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  const getStatusBadge = (status: PostStatus, isPublished: boolean) => {
    if (isPublished && status === PostStatus.PUBLISHED) {
      return <span className='px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full'>발행됨</span>;
    }

    switch (status) {
      case PostStatus.DRAFT:
        return <span className='px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full'>초안</span>;
      case PostStatus.PENDING:
        return <span className='px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full'>대기</span>;
      case PostStatus.ARCHIVED:
        return <span className='px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full'>보관됨</span>;
      default:
        return <span className='px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full'>{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className={cn(PostListVariants({}), className)} {...props}>
        <div className='flex items-center justify-center h-64'>
          <div className='text-lg text-gray-600'>포스트를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(PostListVariants({}), className)} {...props}>
        <div className='flex items-center justify-center h-64'>
          <div className='text-lg text-red-600'>포스트를 불러오는데 실패했습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(PostListVariants({}), className)} {...props}>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <h2 className='text-xl font-semibold text-gray-900'>포스트 목록</h2>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PostStatus | 'ALL')}>
            <SelectTrigger className='w-32'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ALL'>전체</SelectItem>
              <SelectItem value={PostStatus.PUBLISHED}>발행됨</SelectItem>
              <SelectItem value={PostStatus.DRAFT}>초안</SelectItem>
              <SelectItem value={PostStatus.PENDING}>대기</SelectItem>
              <SelectItem value={PostStatus.ARCHIVED}>보관됨</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onClickNewPost}>
          새 포스트 작성
        </Button>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-gray-500 text-lg mb-4'>포스트가 없습니다.</div>
          <Button onClick={onClickNewPost}>
            첫 번째 포스트 작성하기
          </Button>
        </div>
      ) : (
        <div className='grid gap-4'>
          {posts.map((post: any) => (
            <Card key={post.id} className='hover:shadow-md transition-shadow'>
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <CardTitle className='text-lg mb-2'>{post.title}</CardTitle>
                    <div className='flex items-center space-x-2 text-sm text-gray-500'>
                      {getStatusBadge(post.status, post.is_published)}
                      <span>•</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      {post.category && (
                        <>
                          <span>•</span>
                          <span>{post.category.name}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className='flex space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => onClickEditPost(post.id)}
                    >
                      수정
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => onClickDeletePost(post.id, post.title)}
                      disabled={deletePostMutation.isPending}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {post.excerpt && (
                <CardContent className='pt-0'>
                  <p className='text-gray-600 text-sm line-clamp-2'>{post.excerpt}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
