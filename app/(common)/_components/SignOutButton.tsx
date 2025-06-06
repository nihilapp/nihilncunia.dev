'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { redirect } from 'next/navigation';
import type { AxiosError } from 'axios';
import { cn } from '@/_libs';
import { useAuthActions, useSignOut, useUserSession } from '@/_entities/auth';
import type { ApiError } from '@/_types';

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
    signOut.mutate(
      {
        id: userSession.id,
      },
      {
        onSuccess() {
          setUserSession(null);

          redirect('/auth/signin');
        },
        onError(error: AxiosError<ApiError>) {
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
