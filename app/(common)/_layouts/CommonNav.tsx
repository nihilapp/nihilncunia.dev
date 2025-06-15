'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';

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

export function CommonNav({ className, ...props }: Props) {
  return (
    <nav
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <ul>
        <li>
          <Link href='/'>홈</Link>
        </li>
        <li>
          <Link href='/admin'>관리자</Link>
        </li>
        {/* <SignedIn>
          <li>
            <UserButton />
            <SignOutButton />
          </li>
        </SignedIn>
        <SignedOut>
          <li>
            <SignInButton />
            <SignUpButton />
          </li>
        </SignedOut> */}
      </ul>
    </nav>
  );
}
