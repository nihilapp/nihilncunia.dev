'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { MarkdownEditor } from '@/(admin)/_components';
import { Button } from '@/(common)/_components/ui/button';
import { Input } from '@/(common)/_components/ui/input';

interface PostFormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  hashtags: string[];
  isPublished: boolean;
}

export default function NewPostPage() {
  const router = useRouter();

  const [ formData, setFormData, ] = useState<PostFormData>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    hashtags: [],
    isPublished: false,
  });

  const [ hashtagInput, setHashtagInput, ] = useState('');
  const [ isLoading, setIsLoading, ] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content,
    }));
  };

  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      excerpt: e.target.value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleHashtagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hashtagInput.trim()) {
      e.preventDefault();
      const newHashtag = hashtagInput.trim();

      if (!formData.hashtags.includes(newHashtag)) {
        setFormData(prev => ({
          ...prev,
          hashtags: [ ...prev.hashtags, newHashtag, ],
        }));
      }

      setHashtagInput('');
    }
  };

  const removeHashtag = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    try {
      // TODO: API 호출로 임시 저장
      console.log('임시 저장:', { ...formData, isPublished: false, });
      // 임시로 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('임시 저장되었습니다!');
    } catch (error) {
      console.error('임시 저장 실패:', error);
      alert('임시 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: API 호출로 발행
      console.log('발행:', { ...formData, isPublished: true, });
      // 임시로 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('포스트가 발행되었습니다!');
      router.push('/admin/posts');
    } catch (error) {
      console.error('발행 실패:', error);
      alert('발행에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900'>새 포스트 작성</h1>

        <div className='flex space-x-3'>
          <Button
            variant='outline'
            onClick={handleSaveDraft}
            disabled={isLoading}
          >
            임시 저장
          </Button>

          <Button
            onClick={handlePublish}
            disabled={isLoading}
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
            제목
          </label>
          <Input
            type='text'
            value={formData.title}
            onChange={handleTitleChange}
            placeholder='포스트 제목을 입력하세요'
            className='text-lg'
          />
        </div>

        {/* Meta Information */}
        <div className='space-y-6'>
          {/* Excerpt */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              요약
            </label>
            <textarea
              value={formData.excerpt}
              onChange={handleExcerptChange}
              placeholder='포스트 요약을 입력하세요 (선택사항)'
              rows={4}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
            />
          </div>

          {/* Category */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              카테고리
            </label>
            <Input
              type='text'
              value={formData.category}
              onChange={handleCategoryChange}
              placeholder='카테고리를 입력하세요'
            />
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
            {formData.hashtags.length > 0 && (
              <div className='mt-2 flex flex-wrap gap-2'>
                {formData.hashtags.map((tag, index) => (
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
            임시 저장: 작성 중인 포스트를 저장합니다. | 발행하기: 포스트를 즉시 공개합니다.
          </p>
        </div>

        {/* Content Editor */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            내용
          </label>
          <div className='border border-gray-300 rounded-lg overflow-hidden bg-white'>
            <MarkdownEditor
              value={formData.content}
              onChange={handleContentChange}
              className='min-h-[600px]'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
