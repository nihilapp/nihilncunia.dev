'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/(common)/_components/ui/button';

interface SignOutButtonProps {
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function SignOutButton({
  children = '로그아웃',
  className,
  variant = 'outline',
}: SignOutButtonProps) {
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/', // 로그아웃 후 홈페이지로 이동
      redirect: true,
    });
  };

  return (
    <Button
      onClick={handleSignOut}
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
}
