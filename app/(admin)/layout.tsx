import React from 'react';

import { AdminSidebar, AdminHeader, AdminMain } from '@/(admin)/_layouts';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children, }: AdminLayoutProps) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      {/* Admin Header */}
      <AdminHeader />

      <div className='flex'>
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <AdminMain>
          {children}
        </AdminMain>
      </div>
    </div>
  );
}
