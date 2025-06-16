'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { messageData } from '@/_data';

import { Button } from '@/(common)/_components/ui/button';

export function SignInForm() {
  const [ email, setEmail, ] = useState('');
  const [ password, setPassword, ] = useState('');
  const [ isLoading, setIsLoading, ] = useState(false);
  const [ error, setError, ] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(messageData.auth.invalidCredentials);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (error) {
      setError(messageData.auth.signInError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={onSubmit}>
      <div className='rounded-md shadow-sm -space-y-px'>
        <div>
          <label htmlFor='email' className='sr-only'>
            이메일
          </label>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='이메일 주소'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password' className='sr-only'>
            비밀번호
          </label>
          <input
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            required
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className='text-red-600 text-sm text-center'>
          {error}
        </div>
      )}

      <div>
        <Button
          type='submit'
          disabled={isLoading}
          className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
      </div>

      <div className='text-center'>
        <p className='text-sm text-gray-600'>
          계정이 없으신가요?{' '}
          <a
            href='/auth/signup'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            회원가입하기
          </a>
        </p>
      </div>
    </form>
  );
}
