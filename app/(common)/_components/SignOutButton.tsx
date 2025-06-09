'use client';

import { type VariantProps } from 'class-variance-authority';
import { redirect } from 'next/navigation';
import React from 'react';

import { Button } from './ui/button';

import { useAuthActions, useUserSession, useSignOut } from '@/_entities/auth';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof Button> {
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost';
}

export function SignOutButton({
  className,
  size = 'default',
  variant = 'default',
  ...props
}: Props) {
  const userSession = useUserSession();
  const { setUserSession, } = useAuthActions();
  const signOut = useSignOut();

  const onClickSignOut = () => {
    if (!userSession) return;

    signOut.mutate(
      {
        id: userSession.id,
      },
      {
        onSuccess() {
          setUserSession(null);
          redirect('/auth/signin');
        },
        onError(error) {
          console.error(error);
        },
      }
    );
  };

  return (
    <Button
      type='button'
      size={size}
      variant={variant}
      className={className}
      onClick={onClickSignOut}
      {...props}
    >
      로그아웃
    </Button>
  );
}
