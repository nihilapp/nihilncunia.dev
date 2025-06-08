'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/_libs';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function SidebarItem({ href, icon, label, isActive, }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center space-x-3 px-4 py-3 text-sm transition-colors rounded-lg mx-2',
        isActive
          ? 'bg-blue-100 text-blue-900 font-medium'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      )}
    >
      <span className='flex-shrink-0'>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/admin',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' />
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z' />
        </svg>
      ),
      label: '대시보드',
    },
    {
      href: '/admin/posts',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
        </svg>
      ),
      label: '포스트 관리',
    },
    {
      href: '/admin/posts/new',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
        </svg>
      ),
      label: '새 포스트',
    },
    {
      href: '/admin/categories',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
        </svg>
      ),
      label: '카테고리',
    },
    {
      href: '/admin/profile',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
        </svg>
      ),
      label: '프로필',
    },
  ];

  return (
    <aside className='w-64 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 overflow-y-auto'>
      <nav className='py-6 space-y-1'>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
}
