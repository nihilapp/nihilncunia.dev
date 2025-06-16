'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { messageData } from '@/_data';

import { Button } from '@/(common)/_components/ui/button';

export function SignUpForm() {
  const [ email, setEmail, ] = useState('');
  const [ name, setName, ] = useState('');
  const [ password, setPassword, ] = useState('');
  const [ confirmPassword, setConfirmPassword, ] = useState('');
  const [ isLoading, setIsLoading, ] = useState(false);
  const [ error, setError, ] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    try {
      // 회원가입 API 호출
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || messageData.auth.signUpError);
        return;
      }

      // 회원가입 성공 후 자동 로그인
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        // 회원가입은 성공했지만 로그인 실패 시 로그인 페이지로 이동
        router.push('/auth/signin?message=' + messageData.auth.signUpSuccess);
      } else {
        // 로그인 성공 시 관리자 페이지로 이동
        router.push('/admin');
        router.refresh();
      }
    } catch (error) {
      setError(messageData.auth.signUpError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={onSubmit}>
      <div className='space-y-4'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            이메일
          </label>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            className='mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='이메일 주소'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
            이름
          </label>
          <input
            id='name'
            name='name'
            type='text'
            autoComplete='name'
            required
            className='mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='이름'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            비밀번호
          </label>
          <input
            id='password'
            name='password'
            type='password'
            autoComplete='new-password'
            required
            className='mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
            비밀번호 확인
          </label>
          <input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            autoComplete='new-password'
            required
            className='mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='비밀번호 확인'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {isLoading ? '회원가입 중...' : '회원가입'}
        </Button>
      </div>

      <div className='text-center'>
        <p className='text-sm text-gray-600'>
          이미 계정이 있으신가요?{' '}
          <a
            href='/auth/signin'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            로그인하기
          </a>
        </p>
      </div>
    </form>
  );
}
