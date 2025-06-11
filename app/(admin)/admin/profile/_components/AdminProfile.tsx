'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiLock, FiSave, FiEdit } from 'react-icons/fi';

import { Button } from '@/(common)/_components/ui/button';
import { Card } from '@/(common)/_components/ui/card';
import { Input } from '@/(common)/_components/ui/input';
import { Label } from '@/(common)/_components/ui/label';
import { useGetAdminProfile, useUpdateAdminProfile, useChangeAdminPassword } from '@/_entities/users';
import type { AdminProfileUpdateRequest, AdminPasswordChangeRequest } from '@/_entities/users';
import { cn } from '@/_libs';

const AdminProfileVariants = cva(
  [
    'space-y-6',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface AdminProfileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof AdminProfileVariants> {}

export function AdminProfile({ className, ...props }: AdminProfileProps) {
  const [ isEditingProfile, setIsEditingProfile, ] = useState(false);
  const [ isChangingPassword, setIsChangingPassword, ] = useState(false);

  const { adminProfile: profile, loading: isLoading, error, } = useGetAdminProfile();
  const updateProfileMutation = useUpdateAdminProfile();
  const changePasswordMutation = useChangeAdminPassword();

  const profileForm = useForm<AdminProfileUpdateRequest>({
    defaultValues: {
      name: (profile as any)?.response?.name || '',
      email: (profile as any)?.response?.email || '',
      image_url: (profile as any)?.response?.image_url || '',
    },
  });

  const passwordForm = useForm<AdminPasswordChangeRequest>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  // 프로필 데이터가 로드되면 폼 초기화
  React.useEffect(() => {
    if (profile?.response) {
      profileForm.reset({
        name: profile.response.name,
        email: profile.response.email,
        image_url: profile.response.image_url || '',
      });
    }
  }, [ profile, profileForm, ]);

  const onSubmitUpdateProfile = (data: AdminProfileUpdateRequest) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        setIsEditingProfile(false);
        alert('프로필이 성공적으로 업데이트되었습니다.');
      },
      onError: (error: any) => {
        alert(error?.response?.data?.message || '프로필 업데이트에 실패했습니다.');
      },
    });
  };

  const onSubmitChangePassword = (data: AdminPasswordChangeRequest) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        setIsChangingPassword(false);
        passwordForm.reset();
        alert('비밀번호가 성공적으로 변경되었습니다.');
      },
      onError: (error: any) => {
        alert(error?.response?.data?.message || '비밀번호 변경에 실패했습니다.');
      },
    });
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <div className='text-center'>
          <div className='w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-400'>프로필 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <div className='text-center'>
          <p className='text-red-600 dark:text-red-400 mb-4'>프로필 정보를 불러오는데 실패했습니다.</p>
          <Button onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(AdminProfileVariants({}), className)}
      {...props}
    >
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>관리자 프로필</h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1'>계정 정보를 관리하고 비밀번호를 변경할 수 있습니다.</p>
        </div>
      </div>

      {/* 프로필 정보 카드 */}
      <Card className='p-6'>
        <div className='flex items-center space-x-2 mb-6'>
          <FiUser className='w-5 h-5 text-emerald-600' />
          <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>프로필 정보</h2>
        </div>

        <form onSubmit={profileForm.handleSubmit(onSubmitUpdateProfile)} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='name'>이름</Label>
              <Input
                id='name'
                {...profileForm.register('name', { required: '이름은 필수입니다.', })}
                disabled={!isEditingProfile}
                className={!isEditingProfile ? 'bg-gray-50 dark:bg-gray-800' : ''}
              />
              {profileForm.formState.errors.name && (
                <p className='text-sm text-red-600 mt-1'>{profileForm.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor='email'>이메일</Label>
              <Input
                id='email'
                type='email'
                {...profileForm.register('email', {
                  required: '이메일은 필수입니다.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '올바른 이메일 형식이 아닙니다.',
                  },
                })}
                disabled={!isEditingProfile}
                className={!isEditingProfile ? 'bg-gray-50 dark:bg-gray-800' : ''}
              />
              {profileForm.formState.errors.email && (
                <p className='text-sm text-red-600 mt-1'>{profileForm.formState.errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor='image_url'>프로필 이미지 URL (선택사항)</Label>
            <Input
              id='image_url'
              {...profileForm.register('image_url')}
              disabled={!isEditingProfile}
              className={!isEditingProfile ? 'bg-gray-50 dark:bg-gray-800' : ''}
              placeholder='https://example.com/profile.jpg'
            />
          </div>

          <div className='flex justify-end space-x-3'>
            {!isEditingProfile ? (
              <Button
                type='button'
                onClick={() => setIsEditingProfile(true)}
                className='bg-emerald-600 hover:bg-emerald-700'
              >
                <FiEdit className='w-4 h-4 mr-2' />
                편집
              </Button>
            ) : (
              <>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => {
                    setIsEditingProfile(false);
                    profileForm.reset();
                  }}
                >
                  취소
                </Button>
                <Button
                  type='submit'
                  disabled={updateProfileMutation.isPending}
                  className='bg-emerald-600 hover:bg-emerald-700'
                >
                  <FiSave className='w-4 h-4 mr-2' />
                  {updateProfileMutation.isPending ? '저장 중...' : '저장'}
                </Button>
              </>
            )}
          </div>
        </form>
      </Card>

      {/* 비밀번호 변경 카드 */}
      <Card className='p-6'>
        <div className='flex items-center space-x-2 mb-6'>
          <FiLock className='w-5 h-5 text-emerald-600' />
          <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>비밀번호 변경</h2>
        </div>

        {!isChangingPassword ? (
          <div className='text-center py-8'>
            <p className='text-gray-600 dark:text-gray-400 mb-4'>보안을 위해 정기적으로 비밀번호를 변경해주세요.</p>
            <Button
              onClick={() => setIsChangingPassword(true)}
              className='bg-emerald-600 hover:bg-emerald-700'
            >
              <FiLock className='w-4 h-4 mr-2' />
              비밀번호 변경
            </Button>
          </div>
        ) : (
          <form onSubmit={passwordForm.handleSubmit(onSubmitChangePassword)} className='space-y-4'>
            <div>
              <Label htmlFor='currentPassword'>현재 비밀번호</Label>
              <Input
                id='currentPassword'
                type='password'
                {...passwordForm.register('currentPassword', { required: '현재 비밀번호는 필수입니다.', })}
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className='text-sm text-red-600 mt-1'>{passwordForm.formState.errors.currentPassword.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor='newPassword'>새 비밀번호</Label>
              <Input
                id='newPassword'
                type='password'
                {...passwordForm.register('newPassword', {
                  required: '새 비밀번호는 필수입니다.',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다.',
                  },
                })}
              />
              {passwordForm.formState.errors.newPassword && (
                <p className='text-sm text-red-600 mt-1'>{passwordForm.formState.errors.newPassword.message}</p>
              )}
            </div>

            <div className='flex justify-end space-x-3'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setIsChangingPassword(false);
                  passwordForm.reset();
                }}
              >
                취소
              </Button>
              <Button
                type='submit'
                disabled={changePasswordMutation.isPending}
                className='bg-emerald-600 hover:bg-emerald-700'
              >
                <FiSave className='w-4 h-4 mr-2' />
                {changePasswordMutation.isPending ? '변경 중...' : '비밀번호 변경'}
              </Button>
            </div>
          </form>
        )}
      </Card>

      {/* 계정 정보 */}
      {profile?.response && (
        <Card className='p-6'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>계정 정보</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='font-medium text-gray-600 dark:text-gray-400'>계정 생성일:</span>
              <span className='ml-2 text-gray-900 dark:text-gray-100'>
                {new Date(profile.response.created_at).toLocaleDateString('ko-KR')}
              </span>
            </div>
            <div>
              <span className='font-medium text-gray-600 dark:text-gray-400'>마지막 업데이트:</span>
              <span className='ml-2 text-gray-900 dark:text-gray-100'>
                {new Date(profile.response.updated_at).toLocaleDateString('ko-KR')}
              </span>
            </div>
            {profile.response.last_sign_in && (
              <div>
                <span className='font-medium text-gray-600 dark:text-gray-400'>마지막 로그인:</span>
                <span className='ml-2 text-gray-900 dark:text-gray-100'>
                  {new Date(profile.response.last_sign_in).toLocaleDateString('ko-KR')}
                </span>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
