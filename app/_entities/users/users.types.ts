import type { Prisma } from '@/_prisma/client';

// 사용자 생성
export interface CreateUser {
  email: string;
  name: string;
  password: string;
}

// 사용자 정보 수정
export interface UpdateUser {
  name: string;
  email: string;
  image_url?: string;
}

// 사용자 비밀번호 변경
export interface UpdateUserPassword {
  currentPassword: string;
  newPassword: string;
}

// 사용자 이미지 수정
export interface UpdateUserImage {
  image_url: string;
}

// 사용자 목록 삭제
export interface DeleteUsers {
  ids: string[];
}

// Include 관계가 있는 사용자 (Ex 접미사)
export type UserEx = Prisma.UserGetPayload<{
  include: {
    user_auth: {
      select: {
        id: true,
        refresh_token: true,
        created_at: true,
        updated_at: true,
      },
    },
  };
}>;
