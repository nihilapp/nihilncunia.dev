'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';

const AuthCenterVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface AuthCenterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof AuthCenterVariants> {
  className?: string;
}

export function AuthCenter({
  className,
  children,
  ...props
}: AuthCenterProps) {
  return (
    <main
      className={cn(
        AuthCenterVariants({}),
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
