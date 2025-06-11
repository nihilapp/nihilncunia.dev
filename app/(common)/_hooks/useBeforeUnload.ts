'use client';

import { useEffect, useRef } from 'react';

interface UseBeforeUnloadOptions {
  enabled?: boolean;
  message?: string;
}

export const useBeforeUnload = (
  hasUnsavedChanges: boolean,
  options: UseBeforeUnloadOptions = {}
) => {
  const {
    enabled = true,
    message = '변경사항이 저장되지 않았습니다. 정말로 페이지를 떠나시겠습니까?',
  } = options;

  const messageRef = useRef(message);

  useEffect(() => {
    messageRef.current = message;
  }, [ message, ]);

  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = messageRef.current;
        return messageRef.current;
      }
    };

    const handlePopState = (event: PopStateEvent) => {
      if (hasUnsavedChanges) {
        const shouldLeave = window.confirm(messageRef.current);
        if (!shouldLeave) {
          // 브라우저 히스토리를 되돌리기
          window.history.pushState(null, '', window.location.pathname);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [ hasUnsavedChanges, enabled, ]);
};
