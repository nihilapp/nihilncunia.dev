'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { array, object, string } from 'yup';

import { PostFormFields, PostStatusInfo } from './';

import { MarkdownEditor } from '@/(admin)/_components';
import { Button } from '@/(common)/_components/ui/button';
import { useGetCategories } from '@/_entities/categories';
import { useCreatePost, PostStatus } from '@/_entities/posts';
import type { PostFormData } from '@/_entities/posts';
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

// Yup validation schema
const validationSchema = object({
  title: string()
    .required('제목을 입력해주세요.')
    .trim()
    .min(1, '제목은 최소 1글자 이상이어야 합니다.')
    .max(200, '제목은 200글자를 초과할 수 없습니다.'),
  content: string()
    .required('내용을 입력해주세요.')
    .trim()
    .min(1, '내용은 최소 1글자 이상이어야 합니다.'),
  excerpt: string()
    .trim()
    .max(500, '요약은 500글자를 초과할 수 없습니다.')
    .optional(),
  category_id: string()
    .required('카테고리를 선택해주세요.'),
  subcategory_id: string()
    .optional(),
  hashtags: array()
    .of(string())
    .max(10, '해시태그는 최대 10개까지 추가할 수 있습니다.')
    .optional(),
});

// Form 타입 정의
interface PostFormInput {
  title: string;
  content: string;
  excerpt?: string;
  category_id: string;
  subcategory_id?: string;
  hashtags?: string[];
}

// 커스텀 validation 함수
const validateFormData = async (data: PostFormInput) => {
  try {
    await validationSchema.validate(data, { abortEarly: false, });
    return {};
  } catch (error: any) {
    const errors: Record<string, string> = {};
    if (error.inner) {
      error.inner.forEach((err: any) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
    }
    return errors;
  }
};

export function NewPost({ className, ...props }: NewPostProps) {
  const router = useRouter();

  const [ customErrors, setCustomErrors, ] = React.useState<Record<string, string>>({});

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, },
  } = useForm<PostFormInput>({
    mode: 'all',
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

  // Create Post Hook
  const createPostMutation = useCreatePost();

  // 폼 제출 함수들 - status를 여기서 결정
  const onClickSaveDraft = handleSubmit(async (data) => {
    try {
      // 커스텀 validation 체크
      const validationErrors = await validateFormData(data);
      if (Object.keys(validationErrors).length > 0) {
        setCustomErrors(validationErrors);
        return;
      }
      setCustomErrors({});

      const formData: PostFormData = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || '',
        category_id: data.category_id,
        subcategory_id: data.subcategory_id || '',
        hashtags: data.hashtags || [],
        status: PostStatus.DRAFT,
        is_published: false,
      };

      await createPostMutation.mutateAsync(formData);
      toast.success('임시 저장되었습니다!');
    } catch (error) {
      console.error('임시 저장 실패:', error);
      toast.error('임시 저장에 실패했습니다.');
    }
  });

  const onClickPublish = handleSubmit(async (data) => {
    try {
      // 커스텀 validation 체크
      const validationErrors = await validateFormData(data);
      if (Object.keys(validationErrors).length > 0) {
        setCustomErrors(validationErrors);
        return;
      }
      setCustomErrors({});

      const formData: PostFormData = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || '',
        category_id: data.category_id,
        subcategory_id: data.subcategory_id || '',
        hashtags: data.hashtags || [],
        status: PostStatus.PUBLISHED,
        is_published: true,
      };

      await createPostMutation.mutateAsync(formData);
      toast.success('포스트가 발행되었습니다!');
      router.push('/admin/posts');
    } catch (error) {
      console.error('발행 실패:', error);
      toast.error('발행에 실패했습니다.');
    }
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
        <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                새 포스트 작성
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mt-2'>
                새로운 블로그 포스트를 작성하고 발행해보세요.
              </p>
            </div>

            <div className='flex space-x-3'>
              <Button
                variant='outline'
                onClick={onClickSaveDraft}
                disabled={isSubmitting || createPostMutation.isPending}
                className='px-6 py-2 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200'
              >
                {isSubmitting || createPostMutation.isPending ? '저장 중...' : '임시 저장'}
              </Button>

              <Button
                onClick={onClickPublish}
                disabled={isSubmitting || createPostMutation.isPending}
                className='px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
              >
                {isSubmitting || createPostMutation.isPending ? '발행 중...' : '발행하기'}
              </Button>
            </div>
          </div>
        </div>

        {/* Post Form */}
        <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8 space-y-8'>
          {/* Form Fields */}
          <PostFormFields
            register={register}
            setValue={setValue}
            watch={watch}
            categories={categories}
            subcategories={subcategories}
            customErrors={customErrors}
            categoriesLoading={categoriesLoading}
            subcategoriesLoading={subcategoriesLoading}
          />

          {/* Post Status Info */}
          <PostStatusInfo />

          {/* Content Editor */}
          <div className='space-y-3'>
            <label className='block text-lg font-semibold text-gray-800 dark:text-gray-200'>
              내용 <span className='text-red-500'>*</span>
            </label>
            <div className='border-2 border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-700 shadow-inner'>
              <MarkdownEditor
                value={watch('content') || ''}
                onChange={(content) => setValue('content', content)}
                className='min-h-[600px]'
              />
            </div>
            {customErrors.content && (
              <p className='text-red-500 text-sm font-medium flex items-center gap-2'>
                <span className='w-1 h-1 bg-red-500 rounded-full'></span>
                {customErrors.content}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
