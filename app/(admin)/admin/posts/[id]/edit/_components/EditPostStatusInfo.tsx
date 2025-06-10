'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

const EditPostStatusInfoVariants = cva(
  [
    'p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border-2 border-green-200 dark:border-green-700',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface EditPostStatusInfoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof EditPostStatusInfoVariants> {
  post: any; // 포스트 데이터
}

export function EditPostStatusInfo({
  className,
  post,
  ...props
}: EditPostStatusInfoProps) {
  return (
    <div
      className={cn(
        EditPostStatusInfoVariants({}),
        className
      )}
      {...props}
    >
      <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2'>
        <span className='w-2 h-2 bg-green-500 rounded-full'></span>
        현재 포스트 상태
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
        <div className='flex items-center gap-2'>
          <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
          <strong className='text-gray-700 dark:text-gray-300'>현재 상태:</strong>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            post?.status === 'PUBLISHED'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
          }`}>
            {post?.status}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
          <strong className='text-gray-700 dark:text-gray-300'>발행 여부:</strong>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            post?.is_published
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
          }`}>
            {post?.is_published ? '발행됨' : '미발행'}
          </span>
        </div>
      </div>
    </div>
  );
}
