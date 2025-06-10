'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // 데이터가 신선하다고 간주되는 시간 (5분)
      // 이 시간 내에는 새로운 요청을 하지 않음
      staleTime: 5 * 60 * 1000, // 5분

      // 가비지 컬렉션 시간 (30분)
      // 컴포넌트가 언마운트되어도 30분간 캐시 유지
      gcTime: 30 * 60 * 1000, // 30분
    },
    mutations: {
      retry: false,
      // 뮤테이션 에러 데이터도 30분간 유지
      gcTime: 30 * 60 * 1000, // 30분
    },
  },
});

export function Providers({ children, }: Props) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
