'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';

const AdminMainVariants = cva(
  [
    ``,
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
  className?: string;
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
      {children}
    </main>
  );
}
