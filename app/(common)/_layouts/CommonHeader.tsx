'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Logo } from '@/(common)/_layouts/Logo';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
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

export function CommonHeader({ className, ...props }: Props) {
  return (
    <header
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <Logo />
      header
    </header>
  );
}
