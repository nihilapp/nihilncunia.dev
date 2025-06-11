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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/(common)/_components/ui/select';
import { SubcategoriesApi } from '@/_entities/subcategories';
import type { CreateSubcategory } from '@/_entities/subcategories';
import { cn } from '@/_libs';

const SubcategoryCreateModalVariants = cva(
  [
    '',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface SubcategoryCreateModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof SubcategoryCreateModalVariants> {
  open: boolean;
  onClose: () => void;
  onSuccess: (subcategoryId: string) => void;
  categories: any[];
  selectedCategoryId?: string;
}

export function SubcategoryCreateModal({
  className,
  open,
  onClose,
  onSuccess,
  categories,
  selectedCategoryId,
  ...props
}: SubcategoryCreateModalProps) {
  const [ formData, setFormData, ] = useState<CreateSubcategory>({
    name: '',
    slug: '',
    description: '',
    category_id: '',
  });

  const queryClient = useQueryClient();

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (open) {
      setFormData({
        name: '',
        slug: '',
        description: '',
        category_id: selectedCategoryId || '',
      });
    }
  }, [ open, selectedCategoryId, ]);

  const createMutation = useMutation({
    mutationFn: SubcategoriesApi.createSubcategory,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [ 'subcategories', ], });

      const subcategory = response?.response as any;
      if (subcategory?.id) {
        toast.success('서브카테고리가 생성되었습니다!');
        onSuccess(subcategory.id);
        onClose();
      }
    },
    onError: (error: any) => {
      console.error('서브카테고리 생성 실패:', error);
      toast.error('서브카테고리 생성에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('서브카테고리 이름을 입력해주세요.');
      return;
    }

    if (!formData.category_id) {
      toast.error('상위 카테고리를 선택해주세요.');
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
            <FiTag className='text-purple-600 dark:text-purple-400' />
            새 서브카테고리 생성
          </DialogTitle>
          <DialogDescription>
            새로운 서브카테고리를 생성합니다. 생성 후 자동으로 선택됩니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            {/* 상위 카테고리 선택 */}
            <div className='space-y-2'>
              <Label htmlFor='parent-category' className='text-sm font-medium'>
                상위 카테고리 <span className='text-red-500'>*</span>
              </Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => handleInputChange('category_id', value)}
              >
                <SelectTrigger className='border-2 focus:border-purple-500'>
                  <SelectValue placeholder='상위 카테고리를 선택하세요' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: any) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 서브카테고리 이름 */}
            <div className='space-y-2'>
              <Label htmlFor='subcategory-name' className='text-sm font-medium'>
                서브카테고리 이름 <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='subcategory-name'
                type='text'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder='서브카테고리 이름을 입력하세요'
                className='border-2 focus:border-purple-500'
              />
            </div>

            {/* 슬러그 */}
            <div className='space-y-2'>
              <Label htmlFor='subcategory-slug' className='text-sm font-medium'>
                슬러그 <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='subcategory-slug'
                type='text'
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder='subcategory-slug'
                className='border-2 focus:border-purple-500 font-mono text-sm'
              />
              <p className='text-xs text-gray-500'>
                URL에 사용되는 고유 식별자입니다. 영문, 숫자, 하이픈만 사용 가능합니다.
              </p>
            </div>

            {/* 설명 */}
            <div className='space-y-2'>
              <Label htmlFor='subcategory-description' className='text-sm font-medium'>
                설명
              </Label>
              <Input
                id='subcategory-description'
                type='text'
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder='서브카테고리 설명을 입력하세요 (선택사항)'
                className='border-2 focus:border-purple-500'
              />
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
              className='flex items-center gap-2 bg-purple-600 hover:bg-purple-700'
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
