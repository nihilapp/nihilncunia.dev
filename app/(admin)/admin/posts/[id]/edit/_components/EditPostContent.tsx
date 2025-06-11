'use client';

import type { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { MarkdownEditor } from '@/(admin)/_components';
import type { PostFormInput } from '@/(admin)/admin/posts/_data/post-validation.schema';

interface EditPostContentProps {
  setValue: UseFormSetValue<PostFormInput>;
  watch: UseFormWatch<PostFormInput>;
  errors: FieldErrors<PostFormInput>;
}

export function EditPostContent({
  setValue,
  watch,
  errors,
}: EditPostContentProps) {
  return (
    <div className='space-y-3'>
      <label className='block text-lg font-semibold text-gray-800 dark:text-gray-200'>
        내용 <span className='text-red-500'>*</span>
      </label>
      <div className='border-2 border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-700 shadow-inner'>
        <MarkdownEditor
          value={watch('content') || ''}
          onChange={(content) => setValue('content', content)}
          className='min-h-[600px]'
        />
      </div>
      {errors.content && (
        <p className='text-red-500 text-sm font-medium flex items-center gap-2'>
          <span className='w-1 h-1 bg-red-500 rounded-full'></span>
          {errors.content.message}
        </p>
      )}
    </div>
  );
}
