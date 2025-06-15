'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useSession } from 'next-auth/react';
import React from 'react';

import { SignOutButton } from '@/(common)/_components/SignOutButton';
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

export function SignedIn({ children, className, ...props }: Props) {
  const { data: session, status, } = useSession();

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {session && status === 'authenticated' && (
        <>
          {children}
        </>
      )}
    </div>
  );
}
