'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FiPlus, FiTag } from 'react-icons/fi';

import { cva, type VariantProps } from 'class-variance-authority';
import { CategoryList, CategoryForm, CategoryStatistics } from '.';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { CategoriesApi } from '@/_entities/categories';
import { cn } from '@/_libs';
import type { Category } from '@/_prisma/client';

interface CategoryWithCount extends Category {
  post_count: number;
  published_post_count: number;
}

const AdminCategoriesVariants = cva(
  [
    'min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 p-6',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface AdminCategoriesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof AdminCategoriesVariants> {}

export function AdminCategories({ className, ...props }: AdminCategoriesProps) {
  const [ showForm, setShowForm, ] = useState(false);
  const [ editingCategory, setEditingCategory, ] = useState<CategoryWithCount | null>(null);

  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: [ 'categories', ],
    queryFn: CategoriesApi.getAll,
  });

  const categories = (categoriesResponse?.response || []) as CategoryWithCount[];

  const onClickNewCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const onClickEditCategory = (category: CategoryWithCount) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const onCloseCategoryForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  if (isLoading) {
    return (
      <div className={cn(AdminCategoriesVariants({}), className)} {...props}>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
              <p className='text-gray-600 dark:text-gray-400'>카테고리를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(AdminCategoriesVariants({}), className)} {...props}>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <p className='text-red-600 dark:text-red-400 mb-4'>카테고리 목록을 불러오는데 실패했습니다.</p>
              <button
                onClick={() => window.location.reload()}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(AdminCategoriesVariants({}), className)}
      {...props}
    >
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* 헤더 */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='text-3xl mb-2 flex items-center gap-3'>
                  <FiTag className='text-blue-600 dark:text-blue-400' />
                  카테고리 관리
                </CardTitle>
                <CardDescription>
                  블로그 카테고리를 생성, 수정, 삭제할 수 있습니다.
                </CardDescription>
              </div>
              <Button
                onClick={onClickNewCategory}
                className='flex items-center gap-2'
              >
                <FiPlus className='w-5 h-5' />
                새 카테고리
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <CategoryStatistics categories={categories} />
          </CardContent>
        </Card>

        {/* 카테고리 목록 */}
        <CategoryList
          categories={categories}
          onEditCategory={onClickEditCategory}
        />

        {/* 카테고리 폼 모달 */}
        <CategoryForm
          category={editingCategory}
          open={showForm}
          onClose={onCloseCategoryForm}
        />
      </div>
    </div>
  );
}
