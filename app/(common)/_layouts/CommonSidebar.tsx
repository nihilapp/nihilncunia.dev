'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/_libs';

export function CommonSidebar() {
  const pathname = usePathname();

  return (
    <aside className='fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-20'>
      <div className='h-full overflow-y-auto px-3 py-4'>
        <ul className='space-y-2'>
          <li>
            <Link
              href='/'
              className={cn(
                'flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100',
                pathname === '/' && 'bg-gray-100'
              )}
            >
              <span className='ml-3'>홈</span>
            </Link>
          </li>

          <li>
            <Link
              href='/posts'
              className={cn(
                'flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100',
                pathname === '/posts' && 'bg-gray-100'
              )}
            >
              <span className='ml-3'>포스트</span>
            </Link>
          </li>

          <li>
            <Link
              href='/categories'
              className={cn(
                'flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100',
                pathname === '/categories' && 'bg-gray-100'
              )}
            >
              <span className='ml-3'>카테고리</span>
            </Link>
          </li>

          <li>
            <Link
              href='/about'
              className={cn(
                'flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100',
                pathname === '/about' && 'bg-gray-100'
              )}
            >
              <span className='ml-3'>소개</span>
            </Link>
          </li>

          <li className='pt-4 mt-4 border-t border-gray-200'>
            <Link
              href='/admin'
              className={cn(
                'flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100',
                pathname.startsWith('/admin') && 'bg-gray-100'
              )}
            >
              <span className='ml-3'>관리자</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
