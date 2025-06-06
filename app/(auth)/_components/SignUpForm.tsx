'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useEffect } from 'react';
import {
  type InferType, object, ref, string, mixed
} from 'yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { UserRole } from '@/_prisma/client';
import { useRouter } from 'next/navigation';
import { cn } from '@/_libs';
import { useCreateUser } from '@/_entities/users';

interface Props
  extends React.FormHTMLAttributes<HTMLFormElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface FormValues {
  email: string;
  name: string;
  role: ('USER' | 'ADMIN');
  password: string;
  passwordConfirm: string;
}

export function SignUpForm({ className, ...props }: Props) {
  const model = object({
    email: string()
      .email('이메일 형식이 올바르지 않습니다.')
      .required('이메일을 입력해주세요.'),
    name: string()
      .required('이름을 입력해주세요.'),
    role: mixed<'USER' | 'ADMIN'>()
      .oneOf([ 'USER', 'ADMIN', ], '역할은 USER 또는 ADMIN이어야 합니다.')
      .required('역할을 선택해주세요.'),
    password: string()
      .required('비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(16, '비밀번호는 16자 이하여야 합니다.')
      .matches(/[a-zA-Z]/, '비밀번호는 영문자를 포함해야 합니다.')
      .matches(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
      .matches(/[!@#$%^&*]/, '비밀번호는 특수문자를 포함해야 합니다.'),
    passwordConfirm: string()
      .required('비밀번호를 확인해주세요.')
      .oneOf(
        [ ref('password'), ],
        '비밀번호가 일치하지 않습니다.'
      ),
  });

  const form = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(model),
    defaultValues: {
      email: '',
      name: '',
      role: 'USER',
      password: '',
      passwordConfirm: '',
    },
  });

  const { formState: { errors, }, } = form;

  useEffect(() => {
    form.trigger();
  }, [ form.trigger, ]);

  const signUp = useCreateUser();
  const router = useRouter();

  const onSubmitForm: SubmitHandler<InferType<typeof model>> = (
    (data) => {
      console.log('submit');

      signUp.mutate({
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role as UserRole,
      }, {
        onSuccess() {
          router.push('/auth/signin');
        },
      });
    }
  );

  const onResetForm = () => {
    form.reset();
  };

  return (
    <form
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
      onSubmit={form.handleSubmit(onSubmitForm)}
    >
      <label htmlFor='email'>
        <span>이메일</span>
        <input
          type='email'
          id='email'
          {...form.register('email')}
        />
        {errors.email && (
          <span>{errors.email.message}</span>
        )}
      </label>

      <label htmlFor='name'>
        <span>이름</span>
        <input
          type='text'
          id='name'
          {...form.register('name')}
        />
        {errors.name && (
          <span>{errors.name.message}</span>
        )}
      </label>

      <div>
        <div>
          <label htmlFor='roleUser'>
            <input
              type='radio'
              id='roleUser'
              value='USER'
              {...form.register('role')}
            />
            <span>사용자</span>
          </label>

          <label htmlFor='roleAdmin'>
            <input
              type='radio'
              id='roleAdmin'
              value='ADMIN'
              {...form.register('role')}
            />
            <span>관리자</span>
          </label>
        </div>
        {errors.role && (
          <span>{errors.role.message}</span>
        )}
      </div>

      <label htmlFor='password'>
        <span>비밀번호</span>
        <input
          type='password'
          id='password'
          {...form.register('password')}
        />
        {errors.password && (
          <span>{errors.password.message}</span>
        )}
      </label>

      <label htmlFor='passwordConfirm'>
        <span>비밀번호 확인</span>
        <input
          type='password'
          id='passwordConfirm'
          {...form.register('passwordConfirm')}
        />
        {errors.passwordConfirm && (
          <span>{errors.passwordConfirm.message}</span>
        )}
      </label>
      <div>
        <button>회원가입</button>
        <button
          type='button'
          onClick={onResetForm}
        >
          초기화
        </button>
      </div>
    </form>
  );
}
