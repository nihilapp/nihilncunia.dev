'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { cn } from '@/_libs';

interface QuickActionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof QuickActionCardVariants> {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
}

const QuickActionCardVariants = cva(
  [
    `bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function QuickActionCard({
  className,
  href,
  icon,
  title,
  description,
  iconBgColor,
  ...props
}: QuickActionCardProps) {
  return (
    <Link href={href} className='block'>
      <div
        className={cn(
          QuickActionCardVariants({}),
          className
        )}
        {...props}
      >
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
              {icon}
            </div>
          </div>
          <div className='ml-4'>
            <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
            <p className='text-sm text-gray-600'>{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
