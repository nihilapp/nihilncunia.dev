import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children, }: LayoutProps) {
  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-background'>
      <main className='w-full max-w-md' role='main' aria-label='인증 페이지'>
        {children}
      </main>
    </div>
  );
}
