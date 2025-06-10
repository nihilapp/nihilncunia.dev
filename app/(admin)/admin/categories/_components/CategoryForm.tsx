'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { FiSave, FiTag } from 'react-icons/fi';

import { CategoryFormFields } from './CategoryFormFields';

import { Button } from '@/(common)/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/(common)/_components/ui/dialog';
import { CategoriesApi } from '@/_entities/categories';
import type { CreateCategory, UpdateCategory } from '@/_entities/categories';
import type { Category } from '@/_prisma/client';

interface CategoryFormProps {
  category?: Category | null;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CategoryForm({
  category,
  open,
  onClose,
  onSuccess,
}: CategoryFormProps) {
  const [ formData, setFormData, ] = useState<CreateCategory | UpdateCategory>({
    name: '',
    slug: '',
    description: '',
    color: '',
  });

  const queryClient = useQueryClient();
  const isEditing = !!category;

  // 편집 모드일 때 폼 데이터 설정
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        color: category.color || '',
      });
    } else {
      // 새 카테고리일 때 초기화
      setFormData({
        name: '',
        slug: '',
        description: '',
        color: '',
      });
    }
  }, [ category, ]);

  const createMutation = useMutation({
    mutationFn: CategoriesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'categories', ], });
      onSuccess?.();
      onClose();
    },
    onError: (error: any) => {
      console.error('카테고리 생성 실패:', error);
      alert('카테고리 생성에 실패했습니다.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data, }: { id: string; data: UpdateCategory }) =>
      CategoriesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'categories', ], });
      onSuccess?.();
      onClose();
    },
    onError: (error: any) => {
      console.error('카테고리 수정 실패:', error);
      alert('카테고리 수정에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('카테고리 이름을 입력해주세요.');
      return;
    }

    if (isEditing && category) {
      updateMutation.mutate({
        id: category.id,
        data: formData as UpdateCategory,
      });
    } else {
      createMutation.mutate(formData as CreateCategory);
    }
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // 이름이 변경되면 자동으로 slug 생성 (편집 모드가 아닐 때만)
    if (field === 'name' && !isEditing) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      setFormData(prev => ({
        ...prev,
        slug: autoSlug,
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FiTag className='text-blue-600 dark:text-blue-400' />
            {isEditing ? '카테고리 수정' : '새 카테고리'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? '카테고리 정보를 수정할 수 있습니다.'
              : '새로운 카테고리를 생성할 수 있습니다.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <CategoryFormFields
            formData={formData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              type='submit'
              disabled={createMutation.isPending || updateMutation.isPending}
              className='flex items-center gap-2'
            >
              <FiSave className='w-4 h-4' />
              {createMutation.isPending || updateMutation.isPending
                ? '저장 중...'
                : isEditing
                  ? '수정하기'
                  : '생성하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
