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
    `bg-white/80 backdrop-blur-md border-b border-gray-200/50 dark:bg-slate-900/80 dark:border-slate-700/50 h-16 fixed top-0 left-0 right-0 z-50 shadow-sm`,
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
            className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200'
          >
            🚀 Nihil Blog Admin
          </Link>
        </div>

        {/* Right Side - User Actions */}
        <div className='flex items-center space-x-3'>
          <LinkButton 
            href='/' 
            variant='outline' 
            size='sm' 
            target='_blank'
            className='bg-white/50 hover:bg-white/80 dark:bg-slate-800/50 dark:hover:bg-slate-800/80 border-blue-200 dark:border-slate-600 text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 transition-all duration-200'
          >
            🌐 사이트 보기
          </LinkButton>

          <SignOutButton size='sm' className='bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' />
        </div>
      </div>
    </header>
  );
}
