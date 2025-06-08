'use client';

import Link from 'next/link';
import React from 'react';

import { SignOutButton } from '@/(common)/_components';
import { Button } from '@/(common)/_components/ui/button';

export default function AdminHeader() {
  return (
    <header className='bg-white border-b border-gray-200 h-16 fixed top-0 left-0 right-0 z-50'>
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
          <Link href='/' target='_blank'>
            <Button
              variant='outline'
              size='sm'
            >
              사이트 보기
            </Button>
          </Link>

          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
