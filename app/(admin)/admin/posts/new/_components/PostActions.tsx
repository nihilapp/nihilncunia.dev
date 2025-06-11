'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import type { PostFormInput } from '@/(admin)/admin/posts/_data/post-validation.schema';
import { Button } from '@/(common)/_components/ui/button';
import { useCreatePost, useSaveDraft, PostStatus, useUpdatePost } from '@/_entities/posts';
import type { PostFormData } from '@/_entities/posts';
import { toast } from '@/_libs';

interface PostActionsProps {
  isSubmitting: boolean;
  handleSubmit: (handler: SubmitHandler<PostFormInput>) => () => void;
  currentPostId?: string | null; // 현재 편집 중인 포스트 ID
  onPostCreated?: (postId: string) => void; // 포스트 생성 후 콜백
}

export function PostActions({
  isSubmitting,
  handleSubmit,
  currentPostId,
  onPostCreated,
}: PostActionsProps) {
  const router = useRouter();
  const createPostMutation = useCreatePost();
  const saveDraftMutation = useSaveDraft();
  const updatePostMutation = useUpdatePost();

  // 폼 제출 로직 함수들
  const saveDraft: SubmitHandler<PostFormInput> = async (data) => {
    try {
      const formData = {
        post_id: currentPostId, // 포스트 ID 전달
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || '',
        category_id: data.category_id,
        subcategory_id: data.subcategory_id || '',
        hashtags: data.hashtags || [],
      };

      const response = await saveDraftMutation.mutateAsync(formData);
      const postData = (response as any)?.response;

      // 새로 생성된 포스트라면 ID를 상위 컴포넌트에 전달
      if (!currentPostId && postData?.id) {
        onPostCreated?.(postData.id);
      }

      toast.success('임시 저장되었습니다!');
    } catch (error) {
      console.error('임시 저장 실패:', error);
      toast.error('임시 저장에 실패했습니다.');
    }
  };

  const publishPost: SubmitHandler<PostFormInput> = async (data) => {
    try {
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

      if (currentPostId) {
        // 기존 포스트를 발행으로 업데이트
        await updatePostMutation.mutateAsync({
          id: currentPostId,
          data: formData,
        });
      } else {
        // 새 포스트 생성 및 발행
        await createPostMutation.mutateAsync(formData);
      }

      toast.success('포스트가 발행되었습니다!');
      router.push('/admin/posts');
    } catch (error) {
      console.error('발행 실패:', error);
      toast.error('발행에 실패했습니다.');
    }
  };

  // 폼 제출 핸들러들
  const onClickSaveDraft = handleSubmit(saveDraft);
  const onClickPublish = handleSubmit(publishPost);

  const isPending = createPostMutation.isPending ||
                   saveDraftMutation.isPending ||
                   updatePostMutation.isPending;

  return (
    <div className='flex space-x-3'>
      <Button
        variant='outline'
        onClick={onClickSaveDraft}
        disabled={isSubmitting || isPending}
        className='px-6 py-2 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200'
      >
        {isSubmitting || isPending ? '저장 중...' : '임시 저장'}
      </Button>

      <Button
        onClick={onClickPublish}
        disabled={isSubmitting || isPending}
        className='px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
      >
        {isSubmitting || isPending ? '발행 중...' : '발행하기'}
      </Button>
    </div>
  );
}
