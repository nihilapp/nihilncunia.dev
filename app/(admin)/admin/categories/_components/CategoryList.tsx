'use client';

import { useState } from 'react';

import { CategoryCard } from './CategoryCard';

import type { Category } from '@/_prisma/client';

interface CategoryWithCount extends Category {
  post_count: number;
  published_post_count: number;
}

interface CategoryListProps {
  categories: CategoryWithCount[];
  onEditCategory: (category: CategoryWithCount) => void;
}

export function CategoryList({
  categories,
  onEditCategory,
}: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className='text-center py-16'>
        <div className='text-muted-foreground mb-4'>
          <div className='text-4xl mb-2'>📂</div>
          <p className='text-lg font-medium'>아직 카테고리가 없습니다</p>
          <p className='text-sm'>새 카테고리를 만들어 포스트를 분류해보세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEditCategory}
        />
      ))}
    </div>
  );
}
