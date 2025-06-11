'use client';

import type { SubmitHandler } from 'react-hook-form';

import { PostActions } from './PostActions';

import type { PostFormInput } from '@/(admin)/admin/posts/_data/post-validation.schema';

interface PostHeaderProps {
  isSubmitting: boolean;
  handleSubmit: (handler: SubmitHandler<PostFormInput>) => () => void;
  currentPostId?: string | null;
  onPostCreated?: (postId: string) => void;
}

export function PostHeader({
  isSubmitting,
  handleSubmit,
  currentPostId,
  onPostCreated,
}: PostHeaderProps) {
  return (
    <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            새 포스트 작성
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            새로운 블로그 포스트를 작성하고 발행해보세요.
          </p>
        </div>

        <PostActions
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          currentPostId={currentPostId}
          onPostCreated={onPostCreated}
        />
      </div>
    </div>
  );
}
