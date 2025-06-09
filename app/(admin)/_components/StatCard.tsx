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
    `bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-slate-700/50 p-6 transition-all duration-300 hover:scale-105`,
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
          <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center shadow-lg ring-4 ring-white/20 dark:ring-slate-800/20`}>
            <div className='w-6 h-6 text-white'>
              {icon}
            </div>
          </div>
        </div>
        <div className='ml-4'>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-1'>{label}</p>
          <p className='text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight'>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
      </div>
    </div>
  );
}
