'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { EditPostFormFields, EditPostStatusInfo, EditPostHeader, EditPostContent, SaveStatus } from './';

import { postFormValidationSchema, type PostFormInput } from '@/(admin)/admin/posts/_data/post-validation.schema';
import { useAutoSave } from '@/(common)/_hooks/useAutoSave';
import { useBeforeUnload } from '@/(common)/_hooks/useBeforeUnload';
import { useGetCategories } from '@/_entities/categories';
import { useGetPostById } from '@/_entities/posts';
import { useGetSubcategories } from '@/_entities/subcategories';
import { cn } from '@/_libs';

const EditPostVariants = cva(
  [
    'min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 p-6',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface EditPostProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof EditPostVariants> {
  postId: string;
}

export function EditPost({ className, postId, ...props }: EditPostProps) {
  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
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
  const { post, loading: postLoading, } = useGetPostById(postId);
  const { categories, loading: categoriesLoading, } = useGetCategories();
  const selectedCategoryId = watch('category_id');
  const { subcategories, loading: subcategoriesLoading, } = useGetSubcategories(selectedCategoryId);

  // 포스트 데이터로 폼 초기화
  useEffect(() => {
    if (post) {
      const hashtags = post.post_hashtags.map(ph => ph.hashtag.name);

      reset({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        category_id: post.category_id,
        subcategory_id: post.subcategory_id || '',
        hashtags,
      });
    }
  }, [ post, reset, ]);

  // 카테고리 변경 시 서브카테고리 초기화
  useEffect(() => {
    if (selectedCategoryId && post) {
      // 기존 서브카테고리가 새 카테고리에 속하지 않으면 초기화
      const currentSubcategory = subcategories.find(sub => sub.id === watch('subcategory_id'));
      if (!currentSubcategory || currentSubcategory.category_id !== selectedCategoryId) {
        setValue('subcategory_id', '');
      }
    }
  }, [ selectedCategoryId, setValue, subcategories, watch, post, ]);

  // 자동 저장 시스템
  const formData = watch();
  const {
    status: autoSaveStatus,
    lastSaved,
    manualSave,
  } = useAutoSave(postId, formData, {
    enabled: !!post, // 포스트가 로드된 후에만 자동 저장 활성화
    interval: 30000, // 30초
  });

  // 폼 데이터 변경 감지 (페이지 이탈 경고용)
  const hasChanges = post && (
    formData.title !== post.title ||
    formData.content !== post.content ||
    formData.excerpt !== (post.excerpt || '') ||
    formData.category_id !== post.category_id ||
    formData.subcategory_id !== (post.subcategory_id || '')
  );

  useBeforeUnload(!!hasChanges, {
    message: '수정 중인 포스트가 있습니다. 정말로 페이지를 떠나시겠습니까?',
  });

  // 로딩 상태 처리
  if (postLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>포스트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 포스트를 찾을 수 없는 경우
  if (!post) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-800 mb-4'>포스트를 찾을 수 없습니다</h1>
          <p className='text-gray-600'>요청한 포스트가 존재하지 않거나 삭제되었습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        EditPostVariants({}),
        className
      )}
      {...props}
    >
      <div className='max-w-5xl mx-auto space-y-8'>
        {/* Page Header */}
        <EditPostHeader
          post={post}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />

        {/* Post Form */}
        <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8 space-y-8'>
          {/* 저장 상태 표시 */}
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

          {/* Form Fields */}
          <EditPostFormFields
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
          <EditPostStatusInfo post={post} />

          {/* Content Editor */}
          <EditPostContent
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
