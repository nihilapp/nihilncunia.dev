'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { EditHashtagInput } from './EditHashtagInput';

import { Input } from '@/(common)/_components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/(common)/_components/ui/select';
import { cn } from '@/_libs';

const EditPostFormFieldsVariants = cva(
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

interface EditPostFormFieldsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof EditPostFormFieldsVariants> {
  register: UseFormRegister<PostFormInput>;
  setValue: UseFormSetValue<PostFormInput>;
  watch: UseFormWatch<PostFormInput>;
  categories: any[];
  subcategories: any[];
  customErrors: Record<string, string>;
  categoriesLoading?: boolean;
  subcategoriesLoading?: boolean;
}

export function EditPostFormFields({
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
}: EditPostFormFieldsProps) {
  const selectedCategoryId = watch('category_id');

  return (
    <div
      className={cn(
        EditPostFormFieldsVariants({}),
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
          className='text-xl p-4 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200'
        />
        {customErrors.title && (
          <p className='text-red-500 text-sm font-medium flex items-center gap-2'>
            <span className='w-1 h-1 bg-red-500 rounded-full'></span>
            {customErrors.title}
          </p>
        )}
      </div>

      {/* Meta Information Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Left Column */}
        <div className='space-y-6'>
          {/* Excerpt */}
          <div className='space-y-3'>
            <label className='block text-lg font-semibold text-gray-800 dark:text-gray-200'>
              요약
            </label>
            <textarea
              {...register('excerpt')}
              placeholder='포스트 요약을 입력하세요 (선택사항)'
              rows={4}
              className='w-full p-4 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 resize-none transition-all duration-200 bg-white dark:bg-slate-700'
            />
            {customErrors.excerpt && (
              <p className='text-red-500 text-sm font-medium flex items-center gap-2'>
                <span className='w-1 h-1 bg-red-500 rounded-full'></span>
                {customErrors.excerpt}
              </p>
            )}
          </div>

          {/* Category */}
          <div className='space-y-3'>
            <label className='block text-lg font-semibold text-gray-800 dark:text-gray-200'>
              카테고리 <span className='text-red-500'>*</span>
            </label>
            <Select
              value={watch('category_id')}
              onValueChange={(value) => setValue('category_id', value)}
            >
              <SelectTrigger className='p-4 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-blue-500 transition-all duration-200'>
                <SelectValue placeholder='카테고리를 선택하세요' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-2 border-gray-200 dark:border-slate-600'>
                {categoriesLoading ? (
                  <div className='p-3 text-gray-500'>로딩 중...</div>
                ) : (
                  categories.map((category: any) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className='p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg'
                    >
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {customErrors.category_id && (
              <p className='text-red-500 text-sm font-medium flex items-center gap-2'>
                <span className='w-1 h-1 bg-red-500 rounded-full'></span>
                {customErrors.category_id}
              </p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className='space-y-6'>
          {/* Subcategory */}
          <div className='space-y-3'>
            <label className='block text-lg font-semibold text-gray-800 dark:text-gray-200'>
              서브카테고리
            </label>
            <Select
              value={watch('subcategory_id')}
              onValueChange={(value) => setValue('subcategory_id', value)}
              disabled={!selectedCategoryId || subcategories.length === 0}
            >
              <SelectTrigger className='p-4 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-blue-500 transition-all duration-200 disabled:opacity-50'>
                <SelectValue placeholder='서브카테고리를 선택하세요' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-2 border-gray-200 dark:border-slate-600'>
                {subcategoriesLoading ? (
                  <div className='p-3 text-gray-500'>로딩 중...</div>
                ) : (
                  subcategories.map((subcategory: any) => (
                    <SelectItem
                      key={subcategory.id}
                      value={subcategory.id}
                      className='p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg'
                    >
                      {subcategory.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {customErrors.subcategory_id && (
              <p className='text-red-500 text-sm font-medium flex items-center gap-2'>
                <span className='w-1 h-1 bg-red-500 rounded-full'></span>
                {customErrors.subcategory_id}
              </p>
            )}
          </div>

          {/* Hashtags */}
          <EditHashtagInput
            setValue={setValue}
            watch={watch}
            customErrors={customErrors}
          />
        </div>
      </div>
    </div>
  );
}
