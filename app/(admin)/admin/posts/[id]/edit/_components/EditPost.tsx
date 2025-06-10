'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { array, object, string } from 'yup';

import { EditPostFormFields, EditPostStatusInfo } from './';

import { MarkdownEditor } from '@/(admin)/_components';
import { Button } from '@/(common)/_components/ui/button';
import { Input } from '@/(common)/_components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/(common)/_components/ui/select';
import { useGetCategories } from '@/_entities/categories';
import { useGetPostById, useUpdatePost, PostStatus } from '@/_entities/posts';
import type { PostFormData } from '@/_entities/posts';
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
  params: Promise<{ id: string }>;
}

// Form 타입 정의
interface PostFormInput {
  title: string;
  content: string;
  excerpt?: string;
  category_id: string;
  subcategory_id?: string;
  hashtags?: string[];
}

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

export function EditPost({ className, params, ...props }: EditPostProps) {
  const router = useRouter();
  const [ postId, setPostId, ] = useState<string>('');
  const [ customErrors, setCustomErrors, ] = useState<Record<string, string>>({});

  // params에서 id 추출
  useEffect(() => {
    const getPostId = async () => {
      const { id, } = await params;
      setPostId(id);
    };
    getPostId();
  }, [ params, ]);

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, },
  } = useForm<PostFormInput>({
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

  // 포스트 데이터 로드 시 폼에 설정
  useEffect(() => {
    if (post) {
      const postData = post as any;
      reset({
        title: postData.title || '',
        content: postData.content || '',
        excerpt: postData.excerpt || '',
        category_id: postData.category_id || '',
        subcategory_id: postData.subcategory_id || '',
        hashtags: postData.post_hashtags?.map((ph: any) => ph.hashtag.name) || [],
      });
    }
  }, [ post, reset, ]);

  // 카테고리 변경 시 서브카테고리 초기화
  useEffect(() => {
    if (selectedCategoryId && post && selectedCategoryId !== (post as any).category_id) {
      setValue('subcategory_id', ''); // 카테고리 변경 시 서브카테고리 초기화
    }
  }, [ selectedCategoryId, setValue, post, ]);

  // Update Post Hook
  const updatePostMutation = useUpdatePost();

  // 폼 제출 함수들
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

      await updatePostMutation.mutateAsync({
        id: postId,
        data: formData,
      });
      toast.success('임시 저장되었습니다!');
    } catch (error) {
      console.error('임시 저장 실패:', error);
      toast.error('임시 저장에 실패했습니다.');
    }
  });

  const onClickUpdate = handleSubmit(async (data) => {
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
        status: (post as any)?.status || PostStatus.DRAFT,
        is_published: (post as any)?.is_published || false,
      };

      await updatePostMutation.mutateAsync({
        id: postId,
        data: formData,
      });
      toast.success('포스트가 수정되었습니다!');
      router.push('/admin/posts');
    } catch (error) {
      console.error('수정 실패:', error);
      toast.error('수정에 실패했습니다.');
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

      await updatePostMutation.mutateAsync({
        id: postId,
        data: formData,
      });
      toast.success('포스트가 발행되었습니다!');
      router.push('/admin/posts');
    } catch (error) {
      console.error('발행 실패:', error);
      toast.error('발행에 실패했습니다.');
    }
  });

  // 로딩 상태
  if (postLoading || !postId) {
    return (
      <div className={cn(EditPostVariants({}), className)} {...props}>
        <div className='flex items-center justify-center h-64'>
          <div className='text-lg text-gray-600'>포스트를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 포스트가 없는 경우
  if (!post) {
    return (
      <div className={cn(EditPostVariants({}), className)} {...props}>
        <div className='flex items-center justify-center h-64'>
          <div className='text-lg text-red-600'>포스트를 찾을 수 없습니다.</div>
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
        <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                포스트 수정
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mt-2'>
                기존 포스트를 수정하고 업데이트해보세요.
              </p>
            </div>

            <div className='flex space-x-3'>
              <Button
                variant='outline'
                onClick={onClickSaveDraft}
                disabled={isSubmitting || updatePostMutation.isPending}
                className='px-6 py-2 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200'
              >
                {isSubmitting || updatePostMutation.isPending ? '저장 중...' : '임시 저장'}
              </Button>

              <Button
                variant='outline'
                onClick={onClickUpdate}
                disabled={isSubmitting || updatePostMutation.isPending}
                className='px-6 py-2 border-2 border-green-300 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200'
              >
                {isSubmitting || updatePostMutation.isPending ? '수정 중...' : '수정하기'}
              </Button>

              <Button
                onClick={onClickPublish}
                disabled={isSubmitting || updatePostMutation.isPending}
                className='px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
              >
                {isSubmitting || updatePostMutation.isPending ? '발행 중...' : '발행하기'}
              </Button>
            </div>
          </div>
        </div>

        {/* Post Form */}
        <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8 space-y-8'>
          {/* Form Fields */}
          <EditPostFormFields
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
          <EditPostStatusInfo post={post} />

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
