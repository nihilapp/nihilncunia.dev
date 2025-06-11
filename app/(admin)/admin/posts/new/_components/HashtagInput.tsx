'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { Input } from '@/(common)/_components/ui/input';
import { cn } from '@/_libs';

const HashtagInputVariants = cva(
  [
    'space-y-3',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface PostFormInput {
  title: string;
  content: string;
  excerpt?: string;
  category_id: string;
  subcategory_id?: string;
  hashtags?: string[];
}

interface HashtagInputProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof HashtagInputVariants> {
  setValue: UseFormSetValue<PostFormInput>;
  watch: UseFormWatch<PostFormInput>;
  customErrors: Record<string, string>;
}

export function HashtagInput({
  className,
  setValue,
  watch,
  customErrors,
  ...props
}: HashtagInputProps) {
  const [ hashtagInput, setHashtagInput, ] = useState('');
  const currentHashtags = watch('hashtags') || [];

  const onKeyDownHashtagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hashtagInput.trim()) {
      e.preventDefault();
      const newHashtag = hashtagInput.trim();

      // 해시태그 개수 제한 체크
      if (currentHashtags.length >= 10) {
        toast.error('해시태그는 최대 10개까지 추가할 수 있습니다.');
        return;
      }

      // 중복 체크
      if (!currentHashtags.includes(newHashtag)) {
        setValue('hashtags', [ ...currentHashtags, newHashtag, ]);
      } else {
        toast.warning('이미 추가된 해시태그입니다.');
      }

      setHashtagInput('');
    }
  };

  const onClickRemoveHashtag = (indexToRemove: number) => {
    const updatedHashtags = currentHashtags.filter((_, index) => index !== indexToRemove);
    setValue('hashtags', updatedHashtags);
  };

  return (
    <div
      className={cn(
        HashtagInputVariants({}),
        className
      )}
      {...props}
    >
      <label className='block text-lg font-semibold text-gray-800 dark:text-gray-200'>
        해시태그
        <span className='ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full'>
          {currentHashtags.length}/10
        </span>
      </label>

      <Input
        type='text'
        value={hashtagInput}
        onChange={(e) => setHashtagInput(e.target.value)}
        onKeyDown={onKeyDownHashtagInput}
        placeholder='해시태그를 입력하고 Enter를 누르세요'
        disabled={currentHashtags.length >= 10}
        className='w-full p-6 h-16 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200 disabled:opacity-50 text-base'
      />

      {customErrors.hashtags && (
        <p className='text-red-500 text-sm font-medium flex items-center gap-2'>
          <span className='w-1 h-1 bg-red-500 rounded-full'></span>
          {customErrors.hashtags}
        </p>
      )}

      {/* Hashtag List */}
      {currentHashtags.length > 0 && (
        <div className='flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl border-2 border-gray-200 dark:border-slate-600'>
          {currentHashtags.map((tag, index) => (
            <span
              key={index}
              className='inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:shadow-lg transition-all duration-200'
            >
              #{tag}
              <button
                type='button'
                onClick={() => onClickRemoveHashtag(index)}
                className='ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white hover:text-red-200 transition-all duration-200'
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
