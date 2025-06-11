'use client';

import { useRouter } from 'next/navigation';
import { cva } from 'class-variance-authority';
import { PostCard } from './PostCard';
import { LoadingCircle } from '@/(common)/_components/LoadingCircle';
import { useGetPosts, PostStatus } from '@/_entities/posts';
import { cn } from '@/_libs';

const postsVariants = cva('py-8 space-y-6');

export function Posts() {
  const router = useRouter();

  const { posts, loading } = useGetPosts({ status: PostStatus.PUBLISHED, is_published: true });

  const onClickWritePost = () => {
    router.push('/admin/posts/new');
  };

  if (loading) {
    return (
      <div className='py-12 flex justify-center'>
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className={cn(postsVariants(), 'max-w-5xl mx-auto')}>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>블로그 포스트</h1>
        <button
          type='button'
          onClick={onClickWritePost}
          className='text-sm text-blue-600 hover:underline'
        >
          새 글 작성
        </button>
      </div>
      <div className='space-y-4'>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
