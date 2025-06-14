'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { CommonMain, CommonSidebar } from '@/(common)/_layouts';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonContent({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <CommonSidebar />
      <CommonMain>
        {children}
      </CommonMain>
    </div>
  );
}
