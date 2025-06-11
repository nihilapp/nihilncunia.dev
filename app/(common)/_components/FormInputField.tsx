'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/(common)/_components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/(common)/_components/ui/form';
import { Input } from '@/(common)/_components/ui/input';
import { EyeIcon, EyeOffIcon } from '@/_icons';

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
