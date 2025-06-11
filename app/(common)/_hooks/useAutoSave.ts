'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useAutoSave as useAutoSaveMutation } from '@/_entities/posts';
import { useGetAdminProfile } from '@/_entities/users';
import { toast } from '@/_libs';

interface UseAutoSaveOptions {
  interval?: number; // 자동 저장 간격 (ms)
  enabled?: boolean; // 자동 저장 활성화 여부
  onSave?: (data: any) => void; // 저장 성공 콜백
  onError?: (error: any) => void; // 저장 실패 콜백
}

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export const useAutoSave = (
  postId: string | null,
  formData: any,
  options: UseAutoSaveOptions = {}
) => {
  const {
    interval = 30000, // 30초
    enabled = true,
    onSave,
    onError,
  } = options;

  const [ status, setStatus, ] = useState<SaveStatus>('idle');
  const [ lastSaved, setLastSaved, ] = useState<Date | null>(null);
  const lastDataRef = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveMutation = useAutoSaveMutation();
  const { adminProfile, } = useGetAdminProfile();

  // 자동 저장 함수
  const performAutoSave = useCallback(async () => {
    if (!postId || !enabled) return;

    const userId = (adminProfile as any)?.response?.id;
    if (!userId) return;

    const currentData = JSON.stringify(formData);

    // 데이터가 변경되지 않았으면 저장하지 않음
    if (currentData === lastDataRef.current) return;

    // 필수 데이터가 없으면 저장하지 않음
    if (!formData.title?.trim() && !formData.content?.trim()) return;

    try {
      setStatus('saving');

      await autoSaveMutation.mutateAsync({
        id: postId,
        data: {
          userId, // 사용자 ID 추가
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          categoryId: formData.category_id,
          subcategoryId: formData.subcategory_id,
          hashtags: formData.hashtags,
        },
      });

      lastDataRef.current = currentData;
      setStatus('saved');
      setLastSaved(new Date());
      onSave?.(formData);

      // 3초 후 상태를 idle로 변경
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      onError?.(error);
      console.error('자동 저장 실패:', error);

      // 5초 후 상태를 idle로 변경
      setTimeout(() => setStatus('idle'), 5000);
    }
  }, [
    postId,
    enabled,
    formData,
    autoSaveMutation,
    onSave,
    onError,
    adminProfile,
  ]);

  // 수동 저장 함수
  const manualSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    performAutoSave();
  }, [ performAutoSave, ]);

  // 자동 저장 타이머 설정
  useEffect(() => {
    if (!enabled || !postId) return;

    timeoutRef.current = setTimeout(() => {
      performAutoSave();
    }, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [ enabled, postId, interval, performAutoSave, ]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    status,
    lastSaved,
    manualSave,
    isAutoSaving: status === 'saving',
    isSaved: status === 'saved',
    hasError: status === 'error',
  };
};
