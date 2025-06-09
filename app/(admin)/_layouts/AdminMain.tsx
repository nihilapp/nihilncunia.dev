'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';

const AdminMainVariants = cva(
  [
    `flex-1 p-6 ml-64 pt-20`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface AdminMainProps
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof AdminMainVariants> {
  children: React.ReactNode;
}

export function AdminMain({
  className,
  children,
  ...props
}: AdminMainProps) {
  return (
    <main
      className={cn(
        AdminMainVariants({}),
        className
      )}
      {...props}
    >
      <div className='max-w-full'>
        {children}
      </div>
    </main>
  );
}
