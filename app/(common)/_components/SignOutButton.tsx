'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { redirect } from 'next/navigation';
import React from 'react';

import { useAuthActions, useUserSession, useSignOut } from '@/_entities/auth';
import { cn } from '@/_libs';

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function SignOutButton({ className, ...props }: Props) {
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
    <button
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
      onClick={onClickSignOut}
    >
      로그아웃
    </button>
  );
}
