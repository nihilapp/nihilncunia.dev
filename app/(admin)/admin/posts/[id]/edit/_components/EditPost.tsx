'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
    'space-y-6',
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

// 기본 validation 함수
const validateForm = (data: PostFormData) => {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = '제목은 필수입니다';
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.content = '내용은 필수입니다';
  }

  if (!data.category_id) {
    errors.category_id = '카테고리는 필수입니다';
  }

  return errors;
};

export function EditPost({ className, params, ...props }: EditPostProps) {
  const router = useRouter();
  const [ postId, setPostId, ] = useState<string>('');
  const [ hashtagInput, setHashtagInput, ] = useState('');

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
    formState: { errors, isSubmitting, },
  } = useForm<PostFormData>({
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      category_id: '',
      subcategory_id: '',
      hashtags: [],
      status: PostStatus.DRAFT,
      is_published: false,
    },
  });

  // API 호출
  const { post, loading: postLoading, } = useGetPostById(postId);
  const { categories, loading: categoriesLoading, } = useGetCategories();
  const selectedCategoryId = watch('category_id');
  const { subcategories, loading: subcategoriesLoading, } = useGetSubcategories(selectedCategoryId);

  const currentHashtags = watch('hashtags') || [];

  // 포스트 데이터 로드 시 폼에 설정
  useEffect(() => {
    if (post) {
      reset({
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        category_id: post.category_id || '',
        subcategory_id: post.subcategory_id || '',
        hashtags: post.post_hashtags?.map((ph: any) => ph.hashtag.name) || [],
        status: post.status || PostStatus.DRAFT,
        is_published: post.is_published || false,
      });
    }
  }, [ post, reset, ]);

  // 카테고리 변경 시 서브카테고리 초기화
  useEffect(() => {
    if (selectedCategoryId && post && selectedCategoryId !== post.category_id) {
      setValue('subcategory_id', ''); // 카테고리 변경 시 서브카테고리 초기화
    }
  }, [ selectedCategoryId, setValue, post, ]);

  // Update Post Hook
  const updatePostMutation = useUpdatePost();

  // 해시태그 관련 함수들
  const onKeyPressHashtagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hashtagInput.trim()) {
      e.preventDefault();
      const newHashtag = hashtagInput.trim();

      if (!currentHashtags.includes(newHashtag)) {
        setValue('hashtags', [ ...currentHashtags, newHashtag, ]);
      }

      setHashtagInput('');
    }
  };

  const onClickRemoveHashtag = (indexToRemove: number) => {
    const updatedHashtags = currentHashtags.filter((_, index) => index !== indexToRemove);
    setValue('hashtags', updatedHashtags);
  };

  // 폼 제출 함수들
  const onClickSaveDraft = handleSubmit(async (data) => {
    try {
      const formData = data as PostFormData;
      const validationErrors = validateForm(formData);

      if (Object.keys(validationErrors).length > 0) {
        console.error('유효성 검사 실패:', validationErrors);
        return;
      }

      await updatePostMutation.mutateAsync({
        id: postId,
        data: {
          ...formData,
          status: PostStatus.DRAFT,
          is_published: false,
        },
      });
      alert('임시 저장되었습니다!');
    } catch (error) {
      console.error('임시 저장 실패:', error);
      alert('임시 저장에 실패했습니다.');
    }
  });

  const onClickUpdate = handleSubmit(async (data) => {
    try {
      const formData = data as PostFormData;
      const validationErrors = validateForm(formData);

      if (Object.keys(validationErrors).length > 0) {
        console.error('유효성 검사 실패:', validationErrors);
        return;
      }

      await updatePostMutation.mutateAsync({
        id: postId,
        data: formData,
      });
      alert('포스트가 수정되었습니다!');
      router.push('/admin/posts');
    } catch (error) {
      console.error('수정 실패:', error);
      alert('수정에 실패했습니다.');
    }
  });

  const onClickPublish = handleSubmit(async (data) => {
    try {
      const formData = data as PostFormData;
      const validationErrors = validateForm(formData);

      if (Object.keys(validationErrors).length > 0) {
        console.error('유효성 검사 실패:', validationErrors);
        return;
      }

      await updatePostMutation.mutateAsync({
        id: postId,
        data: {
          ...formData,
          status: PostStatus.PUBLISHED,
          is_published: true,
        },
      });
      alert('포스트가 발행되었습니다!');
      router.push('/admin/posts');
    } catch (error) {
      console.error('발행 실패:', error);
      alert('발행에 실패했습니다.');
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
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900'>포스트 수정</h1>

        <div className='flex space-x-3'>
          <Button
            variant='outline'
            onClick={onClickSaveDraft}
            disabled={isSubmitting || updatePostMutation.isPending}
          >
            임시 저장
          </Button>

          <Button
            variant='outline'
            onClick={onClickUpdate}
            disabled={isSubmitting || updatePostMutation.isPending}
          >
            수정하기
          </Button>

          <Button
            onClick={onClickPublish}
            disabled={isSubmitting || updatePostMutation.isPending}
          >
            발행하기
          </Button>
        </div>
      </div>

      {/* Post Form */}
      <div className='space-y-6'>
        {/* Title */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            제목 *
          </label>
          <Input
            type='text'
            {...register('title')}
            placeholder='포스트 제목을 입력하세요'
            className='text-lg'
          />
          {errors.title && (
            <p className='mt-1 text-sm text-red-600'>{errors.title.message}</p>
          )}
        </div>

        {/* Meta Information */}
        <div className='space-y-6'>
          {/* Excerpt */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              요약
            </label>
            <textarea
              {...register('excerpt')}
              placeholder='포스트 요약을 입력하세요 (선택사항)'
              rows={4}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
            />
            {errors.excerpt && (
              <p className='mt-1 text-sm text-red-600'>{errors.excerpt.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              카테고리 *
            </label>
            <Select
              value={watch('category_id')}
              onValueChange={(value) => setValue('category_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='카테고리를 선택하세요' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category: any) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category_id && (
              <p className='mt-1 text-sm text-red-600'>{errors.category_id.message}</p>
            )}
          </div>

          {/* Subcategory */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              서브카테고리
            </label>
            <Select
              value={watch('subcategory_id')}
              onValueChange={(value) => setValue('subcategory_id', value)}
              disabled={!selectedCategoryId || subcategories.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder='서브카테고리를 선택하세요' />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((subcategory: any) => (
                  <SelectItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subcategory_id && (
              <p className='mt-1 text-sm text-red-600'>{errors.subcategory_id.message}</p>
            )}
          </div>

          {/* Hashtags */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              해시태그
            </label>
            <Input
              type='text'
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyPress={onKeyPressHashtagInput}
              placeholder='해시태그를 입력하고 Enter를 누르세요'
            />

            {/* Hashtag List */}
            {currentHashtags.length > 0 && (
              <div className='mt-2 flex flex-wrap gap-2'>
                {currentHashtags.map((tag, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
                  >
                    #{tag}
                    <button
                      type='button'
                      onClick={() => onClickRemoveHashtag(index)}
                      className='ml-1 text-blue-600 hover:text-blue-800 focus:outline-none'
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Post Status Info */}
        <div className='p-4 bg-gray-50 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>포스트 상태</h3>
          <p className='text-sm text-gray-600'>
            현재 상태: <span className='font-medium'>{post.status}</span> |
            발행 여부: <span className='font-medium'>{post.is_published ? '발행됨' : '미발행'}</span>
          </p>
        </div>

        {/* Content Editor */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            내용 *
          </label>
          <div className='border border-gray-300 rounded-lg overflow-hidden bg-white'>
            <MarkdownEditor
              value={watch('content') || ''}
              onChange={(content) => setValue('content', content)}
              className='min-h-[600px]'
            />
          </div>
          {errors.content && (
            <p className='mt-1 text-sm text-red-600'>{errors.content.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
