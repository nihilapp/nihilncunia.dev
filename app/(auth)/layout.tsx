import React from 'react';

import { AuthCenter } from '@/(auth)/_layouts';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children, }: LayoutProps) {
  return (
    <AuthCenter>
      {children}
    </AuthCenter>
  );
}
