'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/(common)/_components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/(common)/_components/ui/form';
import { Input } from '@/(common)/_components/ui/input';

// 아이콘 컴포넌트들
const EyeIcon = ({ className, }: { className?: string }) => (
  <svg className={className} fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
    <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
  </svg>
);

const EyeOffIcon = ({ className, }: { className?: string }) => (
  <svg className={className} fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.243 4.243L9.88 9.88' />
  </svg>
);

interface FormInputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export function FormInputField({
  name,
  label,
  placeholder,
  type = 'text',
  icon: Icon,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
}: FormInputFieldProps) {
  const form = useFormContext();
  const fieldValue = form.watch(name);
  const hasError = !!form.formState.errors[name];
  const isValid = !hasError && fieldValue && fieldValue.length > 0;

  const PasswordToggle = () => (
    <Button
      type='button'
      variant='ghost'
      size='sm'
      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
      onClick={onTogglePassword}
    >
      {showPassword ? (
        <EyeOffIcon className='h-4 w-4 text-muted-foreground' />
      ) : (
        <EyeIcon className='h-4 w-4 text-muted-foreground' />
      )}
    </Button>
  );

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className='relative'>
          <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
            hasError
              ? 'text-red-500'
              : isValid
                ? 'text-green-500'
                : 'text-muted-foreground'
          }`} />
          <Input
            type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
            placeholder={placeholder}
            className={`pl-10 ${
              showPasswordToggle ? 'pr-10' : ''
            } ${
              hasError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : isValid
                  ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                  : ''
            }`}
            {...form.register(name)}
          />
          {showPasswordToggle && <PasswordToggle />}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
