'use client';

import type { SubmitHandler } from 'react-hook-form';

import { EditPostActions } from './EditPostActions';

import type { PostFormInput } from '@/(admin)/admin/posts/_data/post-validation.schema';
import type { Post } from '@/_prisma/client';

interface EditPostHeaderProps {
  post: Post;
  isSubmitting: boolean;
  handleSubmit: (handler: SubmitHandler<PostFormInput>) => () => void;
}

export function EditPostHeader({
  post,
  isSubmitting,
  handleSubmit,
}: EditPostHeaderProps) {
  return (
    <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            포스트 수정
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            기존 포스트를 수정하고 업데이트해보세요.
          </p>
        </div>

        <EditPostActions
          post={post}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
