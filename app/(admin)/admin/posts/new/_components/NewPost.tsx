'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { PostFormFields, PostStatusInfo, PostHeader, PostContent, SaveStatus } from './';

import { postFormValidationSchema, type PostFormInput } from '@/(admin)/admin/posts/_data/post-validation.schema';
import { useAutoSave } from '@/(common)/_hooks/useAutoSave';
import { useBeforeUnload } from '@/(common)/_hooks/useBeforeUnload';
import { useGetCategories } from '@/_entities/categories';
import { useGetSubcategories } from '@/_entities/subcategories';
import { cn } from '@/_libs';

const NewPostVariants = cva(
  [
    'min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 p-6',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface NewPostProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof NewPostVariants> {}

export function NewPost({ className, ...props }: NewPostProps) {
  const [ currentPostId, setCurrentPostId, ] = useState<string | null>(null);

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      isSubmitting,
      errors,
    },
  } = useForm<PostFormInput>({
    mode: 'all',
    resolver: zodResolver(postFormValidationSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      category_id: '',
      subcategory_id: '',
      hashtags: [],
    },
  });

  // API 호출
  const { categories, loading: categoriesLoading, } = useGetCategories();
  const selectedCategoryId = watch('category_id');
  const { subcategories, loading: subcategoriesLoading, } = useGetSubcategories(selectedCategoryId);

  // 카테고리 변경 시 서브카테고리 초기화
  useEffect(() => {
    if (selectedCategoryId) {
      setValue('subcategory_id', ''); // 카테고리 변경 시 서브카테고리 초기화
    }
  }, [ selectedCategoryId, setValue, ]);

  // 자동 저장 시스템
  const formData = watch();
  const {
    status: autoSaveStatus,
    lastSaved,
    manualSave,
  } = useAutoSave(currentPostId, formData, {
    enabled: !!currentPostId, // 포스트 ID가 있을 때만 자동 저장 활성화
    interval: 30000, // 30초
  });

  // 포스트 생성 후 콜백
  const handlePostCreated = (postId: string) => {
    setCurrentPostId(postId);
  };

  // 폼 데이터 변경 감지 (페이지 이탈 경고용)
  const hasChanges = formData.title?.trim() || formData.content?.trim();
  useBeforeUnload(!!hasChanges, {
    message: '작성 중인 포스트가 있습니다. 정말로 페이지를 떠나시겠습니까?',
  });

  return (
    <div
      className={cn(
        NewPostVariants({}),
        className
      )}
      {...props}
    >
      <div className='max-w-5xl mx-auto space-y-8'>
        {/* Page Header */}
        <PostHeader
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          currentPostId={currentPostId}
          onPostCreated={handlePostCreated}
        />

        {/* Post Form */}
        <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8 space-y-8'>
          {/* 저장 상태 표시 */}
          {currentPostId && (
            <div className='flex justify-between items-center py-2 px-4 bg-gray-50 dark:bg-slate-700 rounded-lg'>
              <SaveStatus
                status={autoSaveStatus}
                lastSaved={lastSaved}
              />
              <button
                type='button'
                onClick={manualSave}
                className='text-sm text-blue-600 hover:underline'
              >
                수동 저장
              </button>
            </div>
          )}

          {/* Form Fields */}
          <PostFormFields
            register={register}
            setValue={setValue}
            watch={watch}
            categories={categories}
            subcategories={subcategories}
            errors={errors}
            categoriesLoading={categoriesLoading}
            subcategoriesLoading={subcategoriesLoading}
          />

          {/* Post Status Info */}
          <PostStatusInfo />

          {/* Content Editor */}
          <PostContent
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
