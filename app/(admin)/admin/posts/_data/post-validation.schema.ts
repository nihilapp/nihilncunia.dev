import { z } from 'zod';

/**
 * 포스트 폼 Validation Schema
 * 새 포스트 생성 및 포스트 수정에서 공통으로 사용
 */
export const postFormValidationSchema = z.object({
  title: z
    .string({ required_error: '제목을 입력해주세요.', })
    .trim()
    .min(1, '제목을 입력해주세요.')
    .max(200, '제목은 200글자를 초과할 수 없습니다.'),
  content: z
    .string({ required_error: '내용을 입력해주세요.', })
    .trim()
    .min(1, '내용을 입력해주세요.'),
  excerpt: z
    .string()
    .trim()
    .max(500, '요약은 500글자를 초과할 수 없습니다.')
    .optional()
    .or(z.literal('')),
  category_id: z
    .string({ required_error: '카테고리를 선택해주세요.', })
    .min(1, '카테고리를 선택해주세요.'),
  subcategory_id: z
    .string()
    .optional()
    .or(z.literal('')),
  hashtags: z
    .array(z.string())
    .max(10, '해시태그는 최대 10개까지 추가할 수 있습니다.')
    .optional()
    .default([]),
});

/**
 * 포스트 폼 타입 (zod에서 자동 추론)
 */
export type PostFormInput = z.infer<typeof postFormValidationSchema>;

/**
 * 포스트 폼 필드별 에러 메시지 상수
 */
export const POST_FORM_ERROR_MESSAGES = {
  TITLE: {
    REQUIRED: '제목을 입력해주세요.',
    MAX_LENGTH: '제목은 200글자를 초과할 수 없습니다.',
  },
  CONTENT: {
    REQUIRED: '내용을 입력해주세요.',
  },
  EXCERPT: {
    MAX_LENGTH: '요약은 500글자를 초과할 수 없습니다.',
  },
  CATEGORY: {
    REQUIRED: '카테고리를 선택해주세요.',
  },
  HASHTAGS: {
    MAX_COUNT: '해시태그는 최대 10개까지 추가할 수 있습니다.',
  },
} as const;

/**
 * 포스트 폼 필드별 최대값 상수
 */
export const POST_FORM_LIMITS = {
  TITLE_MAX_LENGTH: 200,
  EXCERPT_MAX_LENGTH: 500,
  HASHTAGS_MAX_COUNT: 10,
} as const;
