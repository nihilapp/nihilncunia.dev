'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

export function SessionRefresh() {
  const { data: session, update, } = useSession();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!session?.expires) {
      return;
    }

    const checkAndRefreshSession = () => {
      const expiresAt = new Date(session.expires).getTime();
      const now = Date.now();
      const timeLeft = expiresAt - now;

      // 5분 전에 세션 갱신
      const refreshThreshold = 5 * 60 * 1000; // 5분

      console.log(`세션 만료까지 남은 시간: ${Math.floor(timeLeft / 1000 / 60)}분`);

      if (timeLeft <= refreshThreshold && timeLeft > 0) {
        console.log('세션 갱신 중...');
        update().then(() => {
          console.log('세션 갱신 완료');
        }).catch((error) => {
          console.error('세션 갱신 실패:', error);
        });
      }
    };

    // 1분마다 세션 상태 확인
    intervalRef.current = setInterval(checkAndRefreshSession, 60 * 1000);

    // 초기 체크
    checkAndRefreshSession();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [ session, update, ]);

  return null; // UI를 렌더링하지 않음
}
