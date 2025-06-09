'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { menuItems } from '@/_data';
import { iconMap, type IconType } from '@/_data/icons.data';
import { cn } from '@/_libs';

export function AdminSidebar() {
  const pathname = usePathname();

  function renderIcon(icon: IconType) {
    const IconComponent = iconMap[icon];
    return IconComponent ? <IconComponent /> : null;
  }

  return (
    <aside className='w-64 h-screen bg-white/80 backdrop-blur-md border-r border-gray-200/50 dark:bg-slate-900/80 dark:border-slate-700/50 fixed left-0 top-0 shadow-lg'>
      <div className='p-6 pt-20'>
        <div className='flex items-center space-x-2'>
          <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>📋</span>
          </div>
          <h1 className='text-lg font-bold text-gray-800 dark:text-gray-200'>Dashboard</h1>
        </div>
      </div>

      <nav className='px-4'>
        <ul className='space-y-2'>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800/50 rounded-lg transition-all duration-200 group',
                  pathname === item.href && 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300'
                )}
              >
                <div className={cn(
                  'w-5 h-5 transition-colors duration-200',
                  pathname === item.href ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                )}>
                  {renderIcon(item.icon as IconType)}
                </div>
                <span className='ml-3 font-medium'>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
