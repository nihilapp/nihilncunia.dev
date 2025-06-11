'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';

import type { SaveStatus as SaveStatusType } from '@/(common)/_hooks/useAutoSave';
import { cn } from '@/_libs';

const saveStatusVariants = cva(
  'flex items-center gap-2 text-sm font-medium transition-all duration-200',
  {
    variants: {
      status: {
        idle: 'text-gray-500',
        saving: 'text-blue-600',
        saved: 'text-green-600',
        error: 'text-red-600',
      },
    },
    defaultVariants: {
      status: 'idle',
    },
  }
);

interface SaveStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof saveStatusVariants> {
  status: SaveStatusType;
  lastSaved?: Date | null;
}

export function SaveStatus({
  className,
  status,
  lastSaved,
  ...props
}: SaveStatusProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'saving':
        return <Loader2 className='w-4 h-4 animate-spin' />;
      case 'saved':
        return <CheckCircle className='w-4 h-4' />;
      case 'error':
        return <AlertCircle className='w-4 h-4' />;
      default:
        return <Clock className='w-4 h-4' />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'saving':
        return '저장 중...';
      case 'saved':
        return lastSaved
          ? `저장됨 - ${lastSaved.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}`
          : '저장됨';
      case 'error':
        return '저장 실패';
      default:
        return '자동 저장 대기';
    }
  };

  return (
    <div
      className={cn(
        saveStatusVariants({ status, }),
        className
      )}
      {...props}
    >
      {getStatusIcon()}
      <span>{getStatusText()}</span>
    </div>
  );
}
