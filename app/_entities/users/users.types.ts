import type { User } from '@/_prisma/client';

// 관리자 프로필 조회 응답
export interface AdminProfileResponse {
  id: string;
  email: string;
  name: string;
  image_url: string | null;
  last_sign_in: Date | null;
  created_at: Date;
  updated_at: Date;
}

// 관리자 프로필 수정 요청
export interface AdminProfileUpdateRequest {
  name: string;
  email: string;
  image_url?: string;
}

// 관리자 비밀번호 변경 요청
export interface AdminPasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}

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
export interface UserEx extends User {
  user_auth?: {
    id: string;
    hashed_password: string;
    refresh_token: string | null;
    created_at: Date;
    updated_at: Date;
  };
}
