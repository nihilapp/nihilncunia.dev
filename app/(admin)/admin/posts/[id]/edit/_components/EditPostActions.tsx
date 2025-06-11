'use client';

import { useRouter } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';

import type { PostFormInput } from '@/(admin)/admin/posts/_data/post-validation.schema';
import { Button } from '@/(common)/_components/ui/button';
import { useUpdatePost, PostStatus, useAutoSave } from '@/_entities/posts';
import type { PostFormData } from '@/_entities/posts';
import { toast } from '@/_libs';
import type { Post } from '@/_prisma/client';

interface EditPostActionsProps {
  post: Post;
  isSubmitting: boolean;
  handleSubmit: (handler: SubmitHandler<PostFormInput>) => () => void;
}

export function EditPostActions({
  post,
  isSubmitting,
  handleSubmit,
}: EditPostActionsProps) {
  const router = useRouter();
  const updatePostMutation = useUpdatePost();
  const autoSaveMutation = useAutoSave();

  // 폼 제출 로직 함수들
  const saveDraft: SubmitHandler<PostFormInput> = async (data) => {
    try {
      const formData: Partial<PostFormData> = {
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
        id: post.id,
        data: formData,
      });

      toast.success('임시 저장되었습니다!');
    } catch (error) {
      console.error('임시 저장 실패:', error);
      toast.error('임시 저장에 실패했습니다.');
    }
  };

  const publishPost: SubmitHandler<PostFormInput> = async (data) => {
    try {
      const formData: Partial<PostFormData> = {
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
        id: post.id,
        data: formData,
      });

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

  const isPending = updatePostMutation.isPending;

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
