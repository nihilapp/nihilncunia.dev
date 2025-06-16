# 블로그 매니지먼트 시스템 - 라우트 구조 체크리스트

본 문서는 멀티 블로그 매니지먼트 시스템의 프론트엔드 라우트 구조 개발 체크리스트입니다.

---

## 🏠 블로그 관리 시스템 (`/`)

**메인 플랫폼 - 블로그 목록 및 전체 관리**

### 공개 페이지

- [ ] `/` - 플랫폼 홈 (전체 블로그 목록, 최신 포스트)

### 인증 페이지

- [ ] `/signin` - 시스템 로그인
- [ ] `/signup` - 시스템 회원가입
- [ ] `/signout` - 로그아웃

---

## ⚙️ 시스템 어드민 (`/admin`)

**전체 블로그 통합 관리 (슈퍼 어드민)**

### 대시보드

- [ ] `/admin` - 전체 시스템 대시보드
- [ ] `/admin/analytics` - 전체 통계 및 분석

### 블로그 관리

- [ ] `/admin/blogs` - 내 블로그 목록 관리
- [ ] `/admin/blogs/new` - 새 블로그 생성
- [ ] `/admin/blogs/[id]/edit` - 블로그 설정 수정

### 통합 컨텐츠 관리

- [ ] `/admin/posts` - 전체 블로그 포스트 통합 관리
- [ ] `/admin/posts/[id]/edit` - 포스트 수정 (어느 블로그든)
- [ ] `/admin/categories` - 전체 블로그 카테고리 통합 관리
- [ ] `/admin/hashtags` - 전체 블로그 해시태그 통합 관리
- [ ] `/admin/comments` - 전체 블로그 댓글 통합 관리

### 시스템 관리

- [ ] `/admin/users` - 사용자 관리
- [ ] `/admin/images` - 전체 이미지 갤러리
- [ ] `/admin/email-logs` - 이메일 발송 로그
- [ ] `/admin/settings` - 시스템 설정
- [ ] `/admin/backup` - 백업 및 복원

---

## 📝 개별 블로그 (`/blog/[blogSlug]`)

**각 블로그의 공개 페이지**

### 블로그 공개 페이지

- [ ] `/blog/[blogSlug]` - 개별 블로그 홈
- [ ] `/blog/[blogSlug]/posts` - 해당 블로그 포스트 목록
- [ ] `/blog/[blogSlug]/posts/[postSlug]` - 해당 블로그 포스트 상세
- [ ] `/blog/[blogSlug]/categories` - 해당 블로그 카테고리 목록
- [ ] `/blog/[blogSlug]/categories/[categorySlug]` - 해당 블로그 카테고리별 포스트
- [ ] `/blog/[blogSlug]/hashtags` - 해당 블로그 해시태그 목록
- [ ] `/blog/[blogSlug]/hashtags/[hashtagName]` - 해당 블로그 해시태그별 포스트
- [ ] `/blog/[blogSlug]/search` - 해당 블로그 검색
- [ ] `/blog/[blogSlug]/about` - 해당 블로그 소개

---

## 🔧 개별 블로그 어드민 (`/blog/[blogSlug]/admin`)

**각 블로그의 관리 페이지**

### 블로그 대시보드

- [ ] `/blog/[blogSlug]/admin` - 해당 블로그 대시보드
- [ ] `/blog/[blogSlug]/admin/analytics` - 해당 블로그 통계

### 포스트 관리

- [ ] `/blog/[blogSlug]/admin/posts` - 해당 블로그 포스트 관리
- [ ] `/blog/[blogSlug]/admin/posts/new` - 해당 블로그 새 포스트 작성
- [ ] `/blog/[blogSlug]/admin/posts/[id]/edit` - 해당 블로그 포스트 수정
- [ ] `/blog/[blogSlug]/admin/posts/drafts` - 해당 블로그 임시저장 목록

### 컨텐츠 관리

- [ ] `/blog/[blogSlug]/admin/categories` - 해당 블로그 카테고리 관리
- [ ] `/blog/[blogSlug]/admin/hashtags` - 해당 블로그 해시태그 관리
- [ ] `/blog/[blogSlug]/admin/comments` - 해당 블로그 댓글 관리

### 블로그 설정

- [ ] `/blog/[blogSlug]/admin/settings` - 해당 블로그 설정

- [ ] `/blog/[blogSlug]/admin/images` - 해당 블로그 이미지 갤러리

---

## 🔄 라우트 구조 요약

```
/ (플랫폼)
├── /admin (시스템 어드민)
│   ├── 블로그 관리
│   ├── 통합 컨텐츠 관리
│   └── 시스템 관리
└── /blog/[blogSlug] (개별 블로그)
    ├── 공개 페이지 (해당 블로그만)
    └── /admin (개별 블로그 어드민)
        ├── 포스트 관리
        ├── 컨텐츠 관리
        └── 블로그 설정
```

---

## 📌 주요 특징

1. **명확한 구분**: 시스템 전체 vs 개별 블로그
2. **일관된 구조**: 각 레벨에서 유사한 패턴 유지
3. **확장성**: 새로운 블로그 추가시 동일한 구조 적용
4. **권한 분리**: 시스템 어드민 vs 블로그 어드민
5. **SEO 친화적**: 개별 블로그마다 독립적인 URL 구조
