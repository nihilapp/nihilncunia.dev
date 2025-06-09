'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FiHash } from 'react-icons/fi';
import { toast } from 'sonner';

import { Button } from '@/(common)/_components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/(common)/_components/ui/dialog';
import { Input } from '@/(common)/_components/ui/input';
import { Label } from '@/(common)/_components/ui/label';
import { HashtagsApi, type UpdateHashtag } from '@/_entities/hashtags';
import type { Hashtag } from '@/_prisma/client';

interface HashtagWithCount extends Hashtag {
  post_count: number;
}

interface HashtagFormProps {
  hashtag?: HashtagWithCount | null;
  open: boolean;
  onClose: () => void;
}

export function HashtagForm({ hashtag, open, onClose, }: HashtagFormProps) {
  const [ formData, setFormData, ] = useState({
    name: '',
    slug: '',
  });
  const [ isSubmitting, setIsSubmitting, ] = useState(false);

  const queryClient = useQueryClient();
  const isEditing = !!hashtag;

  // 폼 데이터 초기화
  useEffect(() => {
    if (hashtag) {
      setFormData({
        name: hashtag.name,
        slug: hashtag.slug,
      });
    } else {
      setFormData({
        name: '',
        slug: '',
      });
    }
  }, [ hashtag, open, ]);

  // 생성 뮤테이션
  const createMutation = useMutation({
    mutationFn: HashtagsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'hashtags', ], });
      toast.success('해시태그가 성공적으로 생성되었습니다.');
      onClose();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || '해시태그 생성에 실패했습니다.';
      toast.error(message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  // 수정 뮤테이션
  const updateMutation = useMutation({
    mutationFn: ({ id, data, }: { id: string; data: UpdateHashtag }) =>
      HashtagsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'hashtags', ], });
      toast.success('해시태그가 성공적으로 수정되었습니다.');
      onClose();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || '해시태그 수정에 실패했습니다.';
      toast.error(message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('해시태그 이름을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    const submitData = {
      name: formData.name.trim(),
      slug: formData.slug.trim() || undefined,
    };

    if (isEditing && hashtag) {
      updateMutation.mutate({
        id: hashtag.id,
        data: submitData,
      });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateSlug = () => {
    if (!formData.name) return;

    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    setFormData(prev => ({
      ...prev,
      slug,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FiHash className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
            {isEditing ? '해시태그 수정' : '새 해시태그 생성'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* 해시태그 이름 */}
          <div className='space-y-2'>
            <Label htmlFor='name'>
              해시태그 이름 <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='name'
              type='text'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder='예: React, JavaScript, 개발일기'
              required
            />
          </div>

          {/* 슬러그 */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='slug'>슬러그 (URL용)</Label>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={generateSlug}
                disabled={!formData.name}
              >
                자동 생성
              </Button>
            </div>
            <Input
              id='slug'
              type='text'
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              placeholder='예: react, javascript, dev-diary'
            />
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              비워두면 해시태그 이름으로 자동 생성됩니다.
            </p>
          </div>

          {/* 버튼 */}
          <div className='flex justify-end gap-3 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting || !formData.name.trim()}
            >
              {isSubmitting
                ? (isEditing ? '수정 중...' : '생성 중...')
                : (isEditing ? '수정' : '생성')
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
