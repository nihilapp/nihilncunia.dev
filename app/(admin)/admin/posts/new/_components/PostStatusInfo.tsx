'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

const PostStatusInfoVariants = cva(
  [
    'p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface PostStatusInfoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof PostStatusInfoVariants> {}

export function PostStatusInfo({
  className,
  ...props
}: PostStatusInfoProps) {
  return (
    <div
      className={cn(
        PostStatusInfoVariants({}),
        className
      )}
      {...props}
    >
      <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2'>
        <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
        포스트 상태
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400'>
        <div className='flex items-center gap-2'>
          <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
          <strong>임시 저장:</strong> 작성 중인 포스트를 저장합니다 (DRAFT 상태)
        </div>
        <div className='flex items-center gap-2'>
          <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
          <strong>발행하기:</strong> 포스트를 즉시 공개합니다 (PUBLISHED 상태)
        </div>
      </div>
    </div>
  );
}
