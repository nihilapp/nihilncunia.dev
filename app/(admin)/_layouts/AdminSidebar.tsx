'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { menuItems } from '@/_data/admin-menu.data';
import { iconMap, type IconType } from '@/_data/icons.data';
import { cn } from '@/_libs';

export function AdminSidebar() {
  const pathname = usePathname();

  function renderIcon(icon: IconType) {
    const IconComponent = iconMap[icon];
    return IconComponent ? <IconComponent /> : null;
  }

  return (
    <aside className='w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0'>
      <div className='p-4'>
        <h1 className='text-xl font-bold text-gray-800'>Admin Dashboard</h1>
      </div>

      <nav className='mt-4'>
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100',
                  pathname === item.href && 'bg-gray-100'
                )}
              >
                {renderIcon(item.icon as IconType)}
                <span className='ml-3'>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
