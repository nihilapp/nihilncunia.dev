import { VariantProps } from 'class-variance-authority';
import Link, { LinkProps } from 'next/link';
import * as React from 'react';

import { Button, buttonVariants } from './button';

interface LinkButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>, VariantProps<typeof buttonVariants> {
  href: LinkProps['href'];
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

export function LinkButton({
  href,
  children,
  variant,
  size,
  className,
  target,
  rel,
  ...props
}: LinkButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={href} target={target} rel={rel} {...props}>
        {children}
      </Link>
    </Button>
  );
}
