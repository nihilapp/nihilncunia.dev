'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useState } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';

import { HashtagInput } from './HashtagInput';

import { CategoryCreateModal, SubcategoryCreateModal } from './';

import { Button } from '@/(common)/_components/ui/button';
import { Input } from '@/(common)/_components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/(common)/_components/ui/select';
import { cn } from '@/_libs';

const PostFormFieldsVariants = cva(
  [
    'space-y-8',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface PostFormInput {
  title: string;
  content: string;
  excerpt?: string;
  category_id: string;
  subcategory_id?: string;
  hashtags?: string[];
}

interface PostFormFieldsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof PostFormFieldsVariants> {
  register: UseFormRegister<PostFormInput>;
  setValue: UseFormSetValue<PostFormInput>;
  watch: UseFormWatch<PostFormInput>;
  categories: any[];
  subcategories: any[];
  customErrors: Record<string, string>;
  categoriesLoading?: boolean;
  subcategoriesLoading?: boolean;
}

export function PostFormFields({
  className,
  register,
  setValue,
  watch,
  categories,
  subcategories,
  customErrors,
  categoriesLoading = false,
  subcategoriesLoading = false,
  ...props
}: PostFormFieldsProps) {
  const selectedCategoryId = watch('category_id');

  // 모달 상태 관리
  const [ showCategoryModal, setShowCategoryModal, ] = useState(false);
  const [ showSubcategoryModal, setShowSubcategoryModal, ] = useState(false);

  // 카테고리 생성 성공 시 자동 선택
  const handleCategoryCreateSuccess = (categoryId: string) => {
    setValue('category_id', categoryId);
  };

  // 서브카테고리 생성 성공 시 자동 선택
  const handleSubcategoryCreateSuccess = (subcategoryId: string) => {
    setValue('subcategory_id', subcategoryId);
  };

  return (
    <div
      className={cn(
        PostFormFieldsVariants({}),
        className
      )}
      {...props}
    >
      {/* Title */}
      <div className='space-y-3'>
        <label className='block text-lg font-semibold text-gray-800 dark:text-gray-200'>
          제목 <span className='text-red-500'>*</span>
        </label>
        <Input
          type='text'
          {...register('title')}
          placeholder='포스트 제목을 입력하세요'
          className='w-full text-xl p-6 h-16 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200'
        />
        {customErrors.title && (
          <p className='text-red-500 text-sm font-medium flex items-center gap-2'>
            <span className='w-1 h-1 bg-red-500 rounded-full'></span>
            {customErrors.title}
          </p>
        )}
      </div>

      {/* Excerpt */}
      <div className='space-y-3'>
        <label className='block text-lg font-semibold text-gray-800 dark:text-gray-200'>
          요약
        </label>
        <textarea
          {...register('excerpt')}
          placeholder='포스트 요약을 입력하세요 (선택사항)'
          rows={5}
          className='w-full p-6 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 resize-none transition-all duration-200 bg-white dark:bg-slate-700 text-base'
        />
        {customErrors.excerpt && (
          <p className='text-red-500 text-sm font-medium flex items-center gap-2'>
            <span className='w-1 h-1 bg-red-500 rounded-full'></span>
            {customErrors.excerpt}
          </p>
        )}
      </div>

      {/* Category and Subcategory Row */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Category */}
        <div className='space-y-3'>
          <label className='block text-lg font-semibold text-gray-800 dark:text-gray-200'>
            카테고리 <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <Select onValueChange={(value) => setValue('category_id', value)} value={selectedCategoryId}>
              <SelectTrigger className='w-full p-6 h-16 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-blue-500 transition-all duration-200 text-base'>
                <SelectValue placeholder='카테고리를 선택하세요' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-2 border-gray-200 dark:border-slate-600'>
                {categoriesLoading ? (
                  <div className='p-4 text-gray-500'>로딩 중...</div>
                ) : (
                  categories.map((category: any) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className='p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-base'
                    >
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => setShowCategoryModal(true)}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs h-10 px-3 border-blue-200 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 z-10'
            >
              <FiPlus className='w-3 h-3' />
              새 카테고리
            </Button>
          </div>
          {customErrors.category_id && (
            <p className='text-red-500 text-sm font-medium flex items-center gap-2'>
              <span className='w-1 h-1 bg-red-500 rounded-full'></span>
              {customErrors.category_id}
            </p>
          )}
        </div>

        {/* Subcategory */}
        <div className='space-y-3'>
          <label className='block text-lg font-semibold text-gray-800 dark:text-gray-200'>
            서브카테고리
          </label>
          <div className='relative'>
            <Select
              onValueChange={(value) => setValue('subcategory_id', value)}
              disabled={!selectedCategoryId || subcategories.length === 0}
              value={watch('subcategory_id')}
            >
              <SelectTrigger className='w-full p-6 h-16 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-blue-500 transition-all duration-200 disabled:opacity-50 text-base'>
                <SelectValue placeholder='서브카테고리를 선택하세요' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-2 border-gray-200 dark:border-slate-600'>
                {subcategoriesLoading ? (
                  <div className='p-4 text-gray-500'>로딩 중...</div>
                ) : (
                  subcategories.map((subcategory: any) => (
                    <SelectItem
                      key={subcategory.id}
                      value={subcategory.id}
                      className='p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-base'
                    >
                      {subcategory.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => setShowSubcategoryModal(true)}
              disabled={!selectedCategoryId}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs h-10 px-3 border-purple-200 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 disabled:opacity-50 z-10'
            >
              <FiPlus className='w-3 h-3' />
              새 서브카테고리
            </Button>
          </div>
          {customErrors.subcategory_id && (
            <p className='text-red-500 text-sm font-medium flex items-center gap-2'>
              <span className='w-1 h-1 bg-red-500 rounded-full'></span>
              {customErrors.subcategory_id}
            </p>
          )}
        </div>
      </div>

      {/* Hashtags */}
      <div className='space-y-3'>
        <HashtagInput
          setValue={setValue}
          watch={watch}
          customErrors={customErrors}
        />
      </div>

      {/* 카테고리 생성 모달 */}
      <CategoryCreateModal
        open={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSuccess={handleCategoryCreateSuccess}
      />

      {/* 서브카테고리 생성 모달 */}
      <SubcategoryCreateModal
        open={showSubcategoryModal}
        onClose={() => setShowSubcategoryModal(false)}
        onSuccess={handleSubcategoryCreateSuccess}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
      />
    </div>
  );
}
