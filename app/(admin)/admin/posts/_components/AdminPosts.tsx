'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { PostList } from './PostList';

import { cn } from '@/_libs';

const AdminPostsVariants = cva(
  [
    'min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 p-6',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface AdminPostsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof AdminPostsVariants> {}

export function AdminPosts({ className, ...props }: AdminPostsProps) {
  return (
    <div
      className={cn(
        AdminPostsVariants({}),
        className
      )}
      {...props}
    >
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>포스트 관리</h1>
          <p className='text-gray-600'>블로그 포스트를 작성하고 관리할 수 있습니다.</p>
        </div>

        {/* Post List */}
        <PostList />
      </div>
    </div>
  );
}
