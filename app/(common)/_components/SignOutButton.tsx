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
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

const cssVariants = cva(
  [
    'inline-flex items-center justify-center',
    'px-4 py-2',
    'text-sm font-medium',
    'border border-gray-300',
    'rounded-lg',
    'bg-white text-gray-700',
    'hover:bg-red-600 hover:text-white hover:border-red-600',
    'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
    'active:bg-red-700',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
      },
      variant: {
        default: [
          'bg-white text-gray-700 border-gray-300',
          'hover:bg-red-600 hover:text-white hover:border-red-600',
        ],
        outline: [
          'bg-transparent text-red-600 border-red-300',
          'hover:bg-red-600 hover:text-white hover:border-red-600',
        ],
        ghost: [
          'bg-transparent text-gray-700 border-transparent',
          'hover:bg-red-600 hover:text-white',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
    compoundVariants: [],
  }
);

export function SignOutButton({
  className,
  size,
  variant,
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
    <button
      className={cn(
        cssVariants({
          size,
          variant,
        }),
        className
      )}
      {...props}
      onClick={onClickSignOut}
    >
      로그아웃
    </button>
  );
}
