'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/_libs';

interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof StatCardVariants> {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  iconBgColor: string;
}

const StatCardVariants = cva(
  [
    `bg-white rounded-lg shadow p-6`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function StatCard({
  className,
  icon,
  label,
  value,
  iconBgColor,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        StatCardVariants({}),
        className
      )}
      {...props}
    >
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
        </div>
        <div className='ml-4'>
          <p className='text-sm font-medium text-gray-600'>{label}</p>
          <p className='text-2xl font-bold text-gray-900'>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
      </div>
    </div>
  );
}
