'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MarkdownEditor } from '@/(admin)/_components';
import { Button } from '@/(common)/_components/ui/button';
import { Input } from '@/(common)/_components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/(common)/_components/ui/select';
import { useCreatePost } from '@/_entities/posts';
import type { PostFormData, PostStatus } from '@/_entities/posts';

// 유효성 검사 스키마
const schema = yup.object({
  title: yup.string().required('제목은 필수입니다').min(1, '제목을 입력해주세요'),
  content: yup.string().required('내용은 필수입니다').min(1, '내용을 입력해주세요'),
  excerpt: yup.string(),
  category_id: yup.string().required('카테고리는 필수입니다'),
  subcategory_id: yup.string(),
  hashtags: yup.array().of(yup.string()),
  status: yup.string().oneOf(['DRAFT', 'PENDING', 'PUBLISHED']).required(),
  is_published: yup.boolean().required(),
});

// 카테고리 더미 데이터 (실제로는 API에서 가져와야 함)
const categories = [
  { id: '1', name: '개발', slug: 'development' },
  { id: '2', name: '일상', slug: 'daily' },
  { id: '3', name: '여행', slug: 'travel' },
];

// 서브카테고리 더미 데이터
const subcategories = [
  { id: '1', name: 'Frontend', slug: 'frontend', category_id: '1' },
  { id: '2', name: 'Backend', slug: 'backend', category_id: '1' },
  { id: '3', name: 'React', slug: 'react', category_id: '1' },
];

export default function NewPostPage() {
  const router = useRouter();

  const [ hashtagInput, setHashtagInput, ] = useState('');
  const [ filteredSubcategories, setFilteredSubcategories, ] = useState(subcategories);

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      category_id: '',
      subcategory_id: '',
      hashtags: [],
      status: 'DRAFT',
      is_published: false,
    },
  });

  // 카테고리 변경 시 서브카테고리 필터링
  const selectedCategoryId = watch('category_id');
  const currentHashtags = watch('hashtags') || [];

  useEffect(() => {
    if (selectedCategoryId) {
      const filtered = subcategories.filter(sub => sub.category_id === selectedCategoryId);
      setFilteredSubcategories(filtered);
      setValue('subcategory_id', ''); // 카테고리 변경 시 서브카테고리 초기화
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategoryId, setValue]);

  // Create Post Hook
  const createPostMutation = useCreatePost();

  // 해시태그 관련 함수들
  const handleHashtagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hashtagInput.trim()) {
      e.preventDefault();
      const newHashtag = hashtagInput.trim();

      if (!currentHashtags.includes(newHashtag)) {
        setValue('hashtags', [...currentHashtags, newHashtag]);
      }

      setHashtagInput('');
    }
  };

  const removeHashtag = (indexToRemove: number) => {
    const updatedHashtags = currentHashtags.filter((_, index) => index !== indexToRemove);
    setValue('hashtags', updatedHashtags);
  };

  // 폼 제출 함수들
  const handleSaveDraft = handleSubmit(async (data) => {
    try {
      await createPostMutation.mutateAsync({
        ...data,
        status: 'DRAFT',
        is_published: false,
      });
      alert('임시 저장되었습니다!');
    } catch (error) {
      console.error('임시 저장 실패:', error);
      alert('임시 저장에 실패했습니다.');
    }
  });

  const handlePublish = handleSubmit(async (data) => {
    try {
      await createPostMutation.mutateAsync({
        ...data,
        status: 'PUBLISHED',
        is_published: true,
      });
      alert('포스트가 발행되었습니다!');
      router.push('/admin/posts');
    } catch (error) {
      console.error('발행 실패:', error);
      alert('발행에 실패했습니다.');
    }
  });

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900'>새 포스트 작성</h1>

        <div className='flex space-x-3'>
          <Button
            variant='outline'
            onClick={handleSaveDraft}
            disabled={isSubmitting || createPostMutation.isPending}
          >
            임시 저장
          </Button>

          <Button
            onClick={handlePublish}
            disabled={isSubmitting || createPostMutation.isPending}
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
            <Select onValueChange={(value) => setValue('category_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
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
              onValueChange={(value) => setValue('subcategory_id', value)}
              disabled={!selectedCategoryId || filteredSubcategories.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="서브카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {filteredSubcategories.map((subcategory) => (
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
              onKeyPress={handleHashtagKeyPress}
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
                      onClick={() => removeHashtag(index)}
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
            임시 저장: 작성 중인 포스트를 저장합니다 (DRAFT 상태). | 발행하기: 포스트를 즉시 공개합니다 (PUBLISHED 상태).
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
