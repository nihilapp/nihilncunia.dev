'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';

import { SignOutButton } from '@/(common)/_components';
import { Button } from '@/(common)/_components/ui/button';
import { LinkButton } from '@/(common)/_components/ui/LinkButton';
import { cn } from '@/_libs';

const AdminHeaderVariants = cva(
  [
    `bg-white border-b border-gray-200 h-16 fixed top-0 left-0 right-0 z-50`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface AdminHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof AdminHeaderVariants> {
  className?: string;
}

export function AdminHeader({
  className,
  ...props
}: AdminHeaderProps) {
  return (
    <header
      className={cn(
        AdminHeaderVariants({}),
        className
      )}
      {...props}
    >
      <div className='flex items-center justify-between h-full px-6'>
        {/* Left Side - Blog Title */}
        <div className='flex items-center space-x-4'>
          <Link
            href='/admin'
            className='text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors'
          >
            Nihil Blog Admin
          </Link>
        </div>

        {/* Right Side - User Actions */}
        <div className='flex items-center space-x-4'>
          <LinkButton href='/' variant='outline' size='sm' target='_blank'>
            사이트 보기
          </LinkButton>

          <SignOutButton size='sm' />
        </div>
      </div>
    </header>
  );
}
