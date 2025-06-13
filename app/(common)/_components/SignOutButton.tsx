'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Button } from './ui/button';

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

  const onClickSignOut = () => {};

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
