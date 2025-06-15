import { Metadata } from 'next';

import { SignUpForm } from './_components';

export const metadata: Metadata = {
  title: '회원가입 | 관리자',
  description: '관리자 회원가입 페이지입니다.',
};

export default function SignUpPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            관리자 회원가입
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            새로운 관리자 계정을 생성하세요
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
