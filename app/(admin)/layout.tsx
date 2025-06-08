import React from 'react';

import { AdminSidebar, AdminHeader } from '@/(admin)/_components';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children, }: AdminLayoutProps) {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Admin Header */}
      <AdminHeader />

      <div className='flex'>
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className='flex-1 p-6 ml-64 pt-20'>
          <div className='max-w-full'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
