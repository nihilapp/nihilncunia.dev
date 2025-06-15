'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';

import { SignedIn, SignedOut } from '@/(common)/_components';
import { SignOutButton } from '@/(common)/_components/SignOutButton';
import { LinkButton } from '@/(common)/_components/ui/LinkButton';
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
        <SignedIn>
          <li>
            <LinkButton href='/admin/dashboard'>관리자 대시보드</LinkButton>
            <SignOutButton />
          </li>
        </SignedIn>
        <SignedOut>
          <li>
            <LinkButton href='/auth/signin'>로그인</LinkButton>
            <LinkButton href='/auth/signup'>회원가입</LinkButton>
          </li>
        </SignedOut>
      </ul>
    </nav>
  );
}
