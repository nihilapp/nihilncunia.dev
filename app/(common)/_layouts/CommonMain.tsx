'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';

interface CommonMainProps
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof CommonMainVariants> {
  children: React.ReactNode;
}

const CommonMainVariants = cva(
  [
    `flex-1 p-6 ml-64 pt-20`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonMain({
  className,
  children,
  ...props
}: CommonMainProps) {
  return (
    <main
      className={cn(
        CommonMainVariants({}),
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
