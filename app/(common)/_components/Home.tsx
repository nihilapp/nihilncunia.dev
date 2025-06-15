'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useSession } from 'next-auth/react';
import React from 'react';

import { SignOutButton } from '@/(common)/_components/SignOutButton';
import { useSessionRefresh } from '@/_hooks';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
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

export function Home({ className, ...props }: Props) {
  const { data: session, status, } = useSession();
  const { refreshSession, } = useSessionRefresh();

  // 세션 정보를 콘솔에 출력
  React.useEffect(() => {
    console.log('세션 상태:', status);
    console.log('세션 데이터:', session);

    if (session) {
      console.log('사용자 정보:', session.user);
      console.log('사용자 이메일:', session.user?.email);
      console.log('사용자 이름:', session.user?.name);

      // 세션 만료 시간 확인
      if (session.expires) {
        const expiresDate = new Date(session.expires);
        const now = new Date();
        const timeLeft = expiresDate.getTime() - now.getTime();
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        console.log('세션 만료 시간:', session.expires);
        console.log('세션 만료 날짜:', expiresDate.toLocaleString());
        console.log(`세션 남은 시간: ${hoursLeft}시간 ${minutesLeft}분`);
      }
    }

    // 로딩이 완료되고 세션이 있는 경우
    if (status === 'authenticated' && session) {
      // 확실히 로그인된 상태
      console.log('자라나라 머리머리');
    }

    // 로딩이 완료되고 세션이 없는 경우
    if (status === 'unauthenticated' || !session) {
      // 확실히 로그인되지 않은 상태
    }
  }, [ session, status, ]);

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <div className='space-y-4'>
        <h1>홈페이지</h1>
        <p>세션 상태: {status}</p>
        {session && (
          <div>
            <p>사용자: {session.user?.name || session.user?.email}</p>
            <p>만료 시간: {session.expires ? new Date(session.expires).toLocaleString() : '없음'}</p>
          </div>
        )}
        <div className='space-x-2'>
          <button
            onClick={refreshSession}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            세션 갱신
          </button>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
