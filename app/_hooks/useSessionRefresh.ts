'use client';

import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

export function useSessionRefresh() {
  const { update, } = useSession();

  const refreshSession = useCallback(async () => {
    try {
      console.log('세션 수동 갱신 중...');
      await update();
      console.log('세션 갱신 완료');
    } catch (error) {
      console.error('세션 갱신 실패:', error);
    }
  }, [ update, ]);

  return { refreshSession, };
}
