'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import {
  object, string
} from 'yup';

import { FormInputField } from '@/(common)/_components';
import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Form, FormField } from '@/(common)/_components/ui/form';
import { useAuthActions, useSignIn } from '@/_entities/auth';
import type { UserSession, ApiResponse } from '@/_types';

interface FormValues {
  email: string;
  password: string;
}

const schema = object({
  email: string()
    .required('이메일을 입력해주세요.')
    .email('이메일 형식이 올바르지 않습니다.'),
  password: string()
    .required('비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.')
    .matches(/[a-zA-Z]/, '비밀번호는 영문자를 포함해야 합니다.')
    .matches(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
    .matches(/[!@#$%^&*]/, '비밀번호는 특수문자를 포함해야 합니다.'),
});

export function SignInForm() {
  const [ showPassword, setShowPassword, ] = useState(false);
  const { setUserSession, } = useAuthActions();
  const signIn = useSignIn();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    // 페이지 로드시 즉시 validation 실행하여 에러메시지 표시
    form.trigger();
  }, [ form, ]);

  const onSubmit = (data: FormValues) => {
    signIn.mutate({
      email: data.email,
      password: data.password,
    }, {
      onSuccess: (apiResponse: ApiResponse<UserSession>) => {
        setUserSession(apiResponse.response);

        const callbackUrl = searchParams.get('callbackUrl');

        if (callbackUrl && callbackUrl.startsWith('/')) {
          router.push(callbackUrl);
        } else {
          router.push('/');
        }
      },
      onError: (error) => {
        console.error('로그인 실패:', error);
      },
    });
  };

  // 디버깅용 - 에러 상태 확인
  console.log('Form errors:', form.formState.errors);

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold text-center'>
          다시 오신 것을 환영합니다
        </CardTitle>
        <CardDescription className='text-center'>
          계정에 로그인하여 계속하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={() => (
                <FormInputField
                  name='email'
                  label='이메일'
                  placeholder='이메일을 입력하세요'
                  type='email'
                  icon={HiMail}
                />
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={() => (
                <FormInputField
                  name='password'
                  label='비밀번호'
                  placeholder='비밀번호를 입력하세요'
                  icon={HiLockClosed}
                  showPasswordToggle
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
              )}
            />

            <Button
              type='submit'
              className='w-full mt-6'
              disabled={form.formState.isSubmitting || signIn.isPending}
            >
              {form.formState.isSubmitting || signIn.isPending ? (
                <div className='flex items-center gap-2'>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                  로그인 중...
                </div>
              ) : (
                '로그인'
              )}
            </Button>
          </form>
        </Form>

        <div className='mt-6 space-y-4'>
          <div className='text-center text-sm'>
            <span className='text-muted-foreground'>계정이 없으신가요? </span>
            <Link
              href='/auth/signup'
              className='text-primary hover:text-primary/80 font-medium hover:underline underline-offset-4'
            >
              회원가입하기
            </Link>
          </div>

          <div className='text-center'>
            <Button variant='link' className='text-sm text-muted-foreground p-0 h-auto'>
              비밀번호를 잊으셨나요?
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
