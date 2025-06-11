'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cva, type VariantProps } from 'class-variance-authority';
import { useState, useEffect } from 'react';
import { FiSave, FiTag } from 'react-icons/fi';
import { toast } from 'sonner';

import { Button } from '@/(common)/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/(common)/_components/ui/dialog';
import { Input } from '@/(common)/_components/ui/input';
import { Label } from '@/(common)/_components/ui/label';
import { CategoriesApi } from '@/_entities/categories';
import type { CreateCategory } from '@/_entities/categories';
import { cn } from '@/_libs';

const CategoryCreateModalVariants = cva(
  [
    '',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface CategoryCreateModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof CategoryCreateModalVariants> {
  open: boolean;
  onClose: () => void;
  onSuccess: (categoryId: string) => void;
}

export function CategoryCreateModal({
  className,
  open,
  onClose,
  onSuccess,
  ...props
}: CategoryCreateModalProps) {
  const [ formData, setFormData, ] = useState<CreateCategory>({
    name: '',
    slug: '',
    description: '',
    color: '',
  });

  const queryClient = useQueryClient();

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (open) {
      setFormData({
        name: '',
        slug: '',
        description: '',
        color: '',
      });
    }
  }, [ open, ]);

  const createMutation = useMutation({
    mutationFn: CategoriesApi.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [ 'categories', ], });

      const category = response?.response as any;
      if (category?.id) {
        toast.success('카테고리가 생성되었습니다!');
        onSuccess(category.id);
        onClose();
      }
    },
    onError: (error: any) => {
      console.error('카테고리 생성 실패:', error);
      toast.error('카테고리 생성에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('카테고리 이름을 입력해주세요.');
      return;
    }

    if (!formData.slug.trim()) {
      toast.error('카테고리 슬러그를 입력해주세요.');
      return;
    }

    createMutation.mutate(formData);
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // 이름이 변경되면 자동으로 slug 생성
    if (field === 'name') {
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
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FiTag className='text-blue-600 dark:text-blue-400' />
            새 카테고리 생성
          </DialogTitle>
          <DialogDescription>
            새로운 카테고리를 생성합니다. 생성 후 자동으로 선택됩니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            {/* 카테고리 이름 */}
            <div className='space-y-2'>
              <Label htmlFor='category-name' className='text-sm font-medium'>
                카테고리 이름 <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='category-name'
                type='text'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder='카테고리 이름을 입력하세요'
                className='border-2 focus:border-blue-500'
              />
            </div>

            {/* 슬러그 */}
            <div className='space-y-2'>
              <Label htmlFor='category-slug' className='text-sm font-medium'>
                슬러그 <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='category-slug'
                type='text'
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder='category-slug'
                className='border-2 focus:border-blue-500 font-mono text-sm'
              />
              <p className='text-xs text-gray-500'>
                URL에 사용되는 고유 식별자입니다. 영문, 숫자, 하이픈만 사용 가능합니다.
              </p>
            </div>

            {/* 설명 */}
            <div className='space-y-2'>
              <Label htmlFor='category-description' className='text-sm font-medium'>
                설명
              </Label>
              <Input
                id='category-description'
                type='text'
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder='카테고리 설명을 입력하세요 (선택사항)'
                className='border-2 focus:border-blue-500'
              />
            </div>

            {/* 색상 */}
            <div className='space-y-2'>
              <Label htmlFor='category-color' className='text-sm font-medium'>
                색상
              </Label>
              <div className='flex items-center gap-3'>
                <input
                  id='category-color'
                  type='color'
                  value={formData.color || '#3B82F6'}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  className='w-12 h-10 border-2 border-gray-200 rounded-lg cursor-pointer'
                />
                <Input
                  type='text'
                  value={formData.color || '#3B82F6'}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  placeholder='#3B82F6'
                  className='flex-1 border-2 focus:border-blue-500 font-mono text-sm'
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={createMutation.isPending}
            >
              취소
            </Button>
            <Button
              type='submit'
              disabled={createMutation.isPending}
              className='flex items-center gap-2'
            >
              <FiSave className='w-4 h-4' />
              {createMutation.isPending ? '생성 중...' : '생성하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
