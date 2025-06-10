'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/_libs';

const AdminPostsVariants = cva(
  [
    'admin-posts',
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
        className,
      )}
      {...props}
    >
      <h1>포스트 관리</h1>
      <p>블로그 포스트를 관리할 수 있습니다.</p>
    </div>
  );
}
