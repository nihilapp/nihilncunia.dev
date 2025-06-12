import React from 'react';

import { AdminSidebar, AdminHeader, AdminMain } from '@/(admin)/_layouts';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children, }: AdminLayoutProps) {
  return (
    <div className=''>
      {/* Admin Header */}
      <AdminHeader />

      <div className='flex flex-row'>
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
