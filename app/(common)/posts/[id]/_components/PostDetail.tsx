'use client';

import { useGetPostById } from '@/_entities/posts';
import { LoadingCircle } from '@/(common)/_components/LoadingCircle';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

interface PostDetailProps {
  id: string;
}

export function PostDetail({ id }: PostDetailProps) {
  const { post, loading } = useGetPostById(id);

  if (loading) {
    return (
      <div className='py-12'>
        <LoadingCircle />
      </div>
    );
  }

  if (!post) {
    return <div className='text-center py-12'>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <article className='prose max-w-none dark:prose-invert mx-auto py-8'>
      <h1>{post.title}</h1>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
      >
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
