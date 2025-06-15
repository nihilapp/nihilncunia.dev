import { Metadata } from 'next';

import { SignInForm } from '@/(auth)/auth/signin/_components';

export const metadata: Metadata = {
  title: '로그인 | 관리자',
  description: '관리자 로그인 페이지입니다.',
};

export default function SignInPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            관리자 로그인
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            관리자 계정으로 로그인하세요
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
