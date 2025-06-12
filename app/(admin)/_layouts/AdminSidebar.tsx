'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';

const AdminSidebarVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface AdminSidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof AdminSidebarVariants> {
  className?: string;
}

export function AdminSidebar({
  className,
  ...props
}: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        AdminSidebarVariants({}),
        className
      )}
      {...props}
    >
      admin sidebar
    </aside>
  );
}
