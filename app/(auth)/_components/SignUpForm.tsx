'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeOff, HiMail, HiUser, HiLockClosed } from 'react-icons/hi';
import {
  object, ref, string
} from 'yup';

import { FormInputField } from '@/(common)/_components';
import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Form, FormField } from '@/(common)/_components/ui/form';
import { useCreateUser } from '@/_entities/users';

interface FormValues {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

const schema = object({
  email: string()
    .email('이메일 형식이 올바르지 않습니다.')
    .required('이메일을 입력해주세요.'),
  name: string()
    .required('이름을 입력해주세요.'),
  password: string()
    .required('비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.')
    .matches(/[a-zA-Z]/, '비밀번호는 영문자를 포함해야 합니다.')
    .matches(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
    .matches(/[!@#$%^&*]/, '비밀번호는 특수문자를 포함해야 합니다.'),
  passwordConfirm: string()
    .required('비밀번호를 확인해주세요.')
    .oneOf([ ref('password'), ], '비밀번호가 일치하지 않습니다.'),
});

export function SignUpForm() {
  const [ showPassword, setShowPassword, ] = useState(false);
  const [ showPasswordConfirm, setShowPasswordConfirm, ] = useState(false);
  const router = useRouter();
  const signUp = useCreateUser();

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
    },
  });

  useEffect(() => {
    // 페이지 로드시 즉시 validation 실행하여 에러메시지 표시
    form.trigger();
  }, [ form, ]);

  const onSubmit = (data: FormValues) => {
    signUp.mutate({
      email: data.email,
      password: data.password,
      name: data.name,
    }, {
      onSuccess() {
        router.push('/auth/signin');
      },
    });
  };

  // 디버깅용 - 에러 상태 확인
  console.log('Form errors:', form.formState.errors);

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold text-center'>
          계정 만들기
        </CardTitle>
        <CardDescription className='text-center'>
          새로운 계정을 생성하여 시작하세요
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
              name='name'
              render={() => (
                <FormInputField
                  name='name'
                  label='이름'
                  placeholder='이름을 입력하세요'
                  type='text'
                  icon={HiUser}
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

            <FormField
              control={form.control}
              name='passwordConfirm'
              render={() => (
                <FormInputField
                  name='passwordConfirm'
                  label='비밀번호 확인'
                  placeholder='비밀번호를 다시 입력하세요'
                  icon={HiLockClosed}
                  showPasswordToggle
                  showPassword={showPasswordConfirm}
                  onTogglePassword={() => setShowPasswordConfirm(!showPasswordConfirm)}
                />
              )}
            />

            <div className='flex gap-3 pt-4'>
              <Button
                type='submit'
                className='flex-1'
                disabled={form.formState.isSubmitting || signUp.isPending}
              >
                {form.formState.isSubmitting || signUp.isPending ? (
                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                    계정 생성 중...
                  </div>
                ) : (
                  '계정 만들기'
                )}
              </Button>

              <Button
                type='button'
                variant='outline'
                onClick={() => form.reset()}
              >
                초기화
              </Button>
            </div>
          </form>
        </Form>

        <div className='mt-6 text-center text-sm'>
          <span className='text-muted-foreground'>이미 계정이 있으신가요? </span>
          <Link
            href='/auth/signin'
            className='text-primary hover:text-primary/80 font-medium hover:underline underline-offset-4'
          >
            로그인하기
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
