'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { LoadingCircle } from '@/(common)/_components/LoadingCircle';
import { Button } from '@/(common)/_components/ui/button';
import { useGetPostById } from '@/_entities/posts';

// 유틸리티 함수
const formatDate = (dateString: string | Date) => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const postDetailVariants = cva(
  'container mx-auto px-4 py-8',
  {
    variants: {
      size: {
        default: 'max-w-4xl',
        full: 'max-w-full',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface PostDetailProps extends VariantProps<typeof postDetailVariants> {
  className?: string;
  params: Promise<{ id: string }>;
}

export function PostDetail({
  className,
  size,
  params,
  ...props
}: PostDetailProps) {
  const router = useRouter();
  const [ postId, setPostId, ] = useState<string>('');

  // params 처리
  useEffect(() => {
    const getParams = async () => {
      const { id, } = await params;
      setPostId(id);
    };
    getParams();
  }, [ params, ]);

  const { post, loading, } = useGetPostById(postId);

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/admin/posts/${postId}/edit`);
  };

  if (loading || !postId) {
    return (
      <div className={postDetailVariants({ size, className, })}>
        <div className='py-12'>
          <LoadingCircle />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={postDetailVariants({ size, className, })}>
        <div className='text-center py-12'>
          <h2 className='text-2xl font-bold mb-4'>포스트를 찾을 수 없습니다</h2>
          <Button onClick={handleBack}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={postDetailVariants({ size, className, })} {...props}>
      {/* 헤더 */}
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-6'>
          <Button
            onClick={handleBack}
            variant='outline'
            size='sm'
          >
            ← 목록으로
          </Button>

          <div className='flex gap-2'>
            <Button
              onClick={handleEdit}
              variant='default'
              size='sm'
            >
              수정하기
            </Button>
          </div>
        </div>

        {/* 메타 정보 */}
        <div className='border-b pb-6 mb-8'>
          <div className='flex items-center gap-2 mb-4'>
            <span
              className='px-2 py-1 rounded text-xs font-medium text-white'
              style={{ backgroundColor: post.category.color, }}
            >
              {post.category.name}
            </span>

            <span className={`px-2 py-1 rounded text-xs font-medium ${
              post.is_published
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
            }`}>
              {post.is_published ? '발행됨' : '미발행'}
            </span>

            <span className='text-sm text-gray-500'>
              {post.status}
            </span>
          </div>

          <h1 className='text-3xl font-bold mb-4'>
            {post.title}
          </h1>

          <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
            <span>작성자: {post.user.name}</span>
            <span>작성일: {formatDate(post.created_at)}</span>
            <span>조회수: {post.views.toLocaleString()}</span>
            <span>좋아요: {post.likes.toLocaleString()}</span>
          </div>

          {post.excerpt && (
            <p className='mt-4 text-gray-600 dark:text-gray-400 leading-relaxed'>
              {post.excerpt}
            </p>
          )}

          {/* 해시태그 */}
          {post.post_hashtags.length > 0 && (
            <div className='mt-4 flex flex-wrap gap-2'>
              {post.post_hashtags.map((ph) => (
                <span
                  key={ph.hashtag.id}
                  className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-300'
                >
                  #{ph.hashtag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 컨텐츠 */}
      <article className='prose prose-lg max-w-none dark:prose-invert'>
        <ReactMarkdown
          remarkPlugins={[ remarkGfm, ]}
          rehypePlugins={[ rehypeHighlight, rehypeRaw, ]}
          components={{
            // 커스텀 스타일링을 위한 컴포넌트들
            h1: ({ children, }) => <h1 className='text-3xl font-bold mt-8 mb-4'>{children}</h1>,
            h2: ({ children, }) => <h2 className='text-2xl font-semibold mt-6 mb-3'>{children}</h2>,
            h3: ({ children, }) => <h3 className='text-xl font-medium mt-4 mb-2'>{children}</h3>,
            p: ({ children, }) => <p className='mb-4 leading-relaxed'>{children}</p>,
            blockquote: ({ children, }) => (
              <blockquote className='border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20 my-4'>
                {children}
              </blockquote>
            ),
            code: ({ children, className, }) => {
              const isInline = !className;
              return isInline ? (
                <code className='bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm'>
                  {children}
                </code>
              ) : (
                <code className={className}>{children}</code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      {/* 푸터 */}
      <div className='mt-12 pt-8 border-t'>
        <div className='flex items-center justify-between'>
          <div className='text-sm text-gray-500'>
            마지막 수정: {formatDate(post.updated_at)}
          </div>

          <div className='flex gap-2'>
            <Button
              onClick={handleEdit}
              variant='default'
              size='sm'
            >
              수정하기
            </Button>

            <Button
              onClick={handleBack}
              variant='outline'
              size='sm'
            >
              목록으로
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
