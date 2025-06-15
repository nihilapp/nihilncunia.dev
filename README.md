# 개인 블로그 프로젝트 - 개발 문서

Next.js 14와 최신 기술 스택을 활용한 개인 블로그 웹사이트입니다. 웹 기반 마크다운 에디터를 통해 블로그 포스팅이 가능하며, 방문자 댓글 시스템과 이메일 알림 기능을 제공합니다.

## 🎯 프로젝트 개요

**개인용 웹 기반 마크다운 블로그 + 방문자 댓글 + 이메일 알림 시스템**

- 관리자(나)만 글을 작성/관리할 수 있는 관리자 시스템
- 방문자는 댓글만 작성 가능 (회원가입 불가)
- 댓글 작성/답글 시 자동 이메일 알림
- 웹 에디터를 통한 마크다운 작성 및 실시간 미리보기
- 모든 콘텐츠는 데이터베이스에 저장되어 동적으로 렌더링

## 🛠 기술 스택

### Frontend

- **Next.js 14** - 풀스택 React 프레임워크 (App Router)
- **React** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **TailwindCSS** - 스타일링
- **shadcn/ui** - UI 컴포넌트
- **styled-components** - 필요시 사용

### Backend & Database

- **Next.js API Routes** - 서버사이드 API
- **Prisma ORM** - 데이터베이스 ORM
- **PostgreSQL** - 메인 데이터베이스
- **bcryptjs** - 비밀번호 해시
- **jsonwebtoken** - JWT 인증

### 기타 도구

- **React Query (TanStack Query)** - 서버 상태 관리
- **React Hook Form** + **Zod** - 폼 관리 및 검증
- **Nodemailer** - 이메일 발송
- **react-markdown** - 마크다운 렌더링
- **@uiw/react-md-editor** - 마크다운 에디터
- **multer** - 파일 업로드
- **sharp** - 이미지 최적화

## 📁 프로젝트 구조

```
app/                              # Next.js App Router
├── (auth)/                       # 인증 라우트 그룹
│   ├── signin/
│   │   └── page.tsx             # 로그인 페이지
│   └── signout/
│       └── page.tsx             # 로그아웃 페이지
├── (admin)/                      # 관리자 라우트 그룹
│   └── admin/
│       ├── layout.tsx           # 관리자 레이아웃
│       ├── page.tsx             # 대시보드
│       ├── posts/
│       │   ├── page.tsx         # 포스트 목록
│       │   ├── new/
│       │   │   └── page.tsx     # 새 포스트 작성
│       │   ├── drafts/
│       │   │   └── page.tsx     # 임시저장 목록
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx # 포스트 수정
│       ├── categories/
│       │   └── page.tsx         # 카테고리 관리
│       ├── hashtags/
│       │   └── page.tsx         # 해시태그 관리
│       ├── comments/
│       │   └── page.tsx         # 댓글 관리
│       ├── images/
│       │   └── page.tsx         # 이미지 관리
│       ├── analytics/
│       │   └── page.tsx         # 통계
│       └── settings/
│           └── page.tsx         # 설정
├── (public)/                     # 공개 라우트 그룹
│   ├── page.tsx                 # 홈페이지
│   ├── posts/
│   │   ├── page.tsx             # 포스트 목록
│   │   └── [slug]/
│   │       └── page.tsx         # 포스트 상세
│   ├── categories/
│   │   ├── page.tsx             # 카테고리 목록
│   │   └── [slug]/
│   │       └── page.tsx         # 카테고리별 포스트
│   ├── search/
│   │   └── page.tsx             # 검색
│   └── about/
│       └── page.tsx             # 소개
├── api/                          # API 라우트
│   ├── auth/
│   │   ├── signin/
│   │   │   └── route.ts
│   │   ├── signout/
│   │   │   └── route.ts
│   │   ├── refresh/
│   │   │   └── route.ts
│   │   └── session/
│   │       └── route.ts
│   ├── posts/
│   │   ├── route.ts             # GET, POST
│   │   ├── [id]/
│   │   │   ├── route.ts         # GET, PUT, DELETE
│   │   │   ├── publish/
│   │   │   │   └── route.ts
│   │   │   ├── views/
│   │   │   │   └── route.ts
│   │   │   └── like/
│   │   │       └── route.ts
│   │   ├── search/
│   │   │   └── route.ts
│   │   └── drafts/
│   │       └── route.ts
│   ├── categories/
│   │   ├── route.ts
│   │   ├── tree/
│   │   │   └── route.ts
│   │   └── [id]/
│   │       ├── route.ts
│   │       └── move/
│   │           └── route.ts
│   ├── hashtags/
│   │   ├── route.ts
│   │   ├── [id]/
│   │   │   └── route.ts
│   │   ├── autocomplete/
│   │   │   └── route.ts
│   │   └── popular/
│   │       └── route.ts
│   ├── comments/
│   │   ├── route.ts
│   │   ├── [id]/
│   │   │   ├── route.ts
│   │   │   ├── reply/
│   │   │   │   └── route.ts
│   │   │   └── approve/
│   │   │       └── route.ts
│   │   ├── post/
│   │   │   └── [postId]/
│   │   │       └── route.ts
│   │   └── verify/
│   │       └── route.ts
│   ├── upload/
│   │   ├── image/
│   │   │   └── route.ts
│   │   └── images/
│   │       └── route.ts
│   ├── admin/
│   │   └── stats/
│   │       └── route.ts
│   ├── sitemap.xml/
│   │   └── route.ts
│   └── rss.xml/
│       └── route.ts
├── components/                   # 공통 컴포넌트
│   ├── ui/                      # shadcn/ui 컴포넌트
│   ├── admin/                   # 관리자 전용 컴포넌트
│   ├── blog/                    # 블로그 공개 컴포넌트
│   └── common/                  # 공통 컴포넌트
├── lib/                         # 유틸리티 함수
│   ├── prisma.ts               # Prisma 클라이언트
│   ├── auth.ts                 # 인증 관련
│   ├── utils.ts                # 공통 유틸리티
│   └── validations.ts          # Zod 스키마
├── hooks/                       # React Query 커스텀 훅
│   ├── auth/
│   ├── posts/
│   ├── categories/
│   ├── hashtags/
│   ├── comments/
│   └── admin/
├── types/                       # TypeScript 타입 정의
├── prisma/                      # Prisma 스키마 및 마이그레이션
└── public/                      # 정적 파일
    ├── images/
    └── uploads/
```

## 🌐 페이지 구성

### 공개 페이지 (방문자용)

- `/` - 홈페이지 (최신 포스트 목록, 인기 포스트)
- `/posts` - 전체 포스트 목록 (페이징, 정렬)
- `/posts/[slug]` - 포스트 상세 보기 (댓글 작성 가능)
- `/categories` - 카테고리 목록 (계층 구조)
- `/categories/[slug]` - 카테고리별 포스트 목록
- `/search?q=keyword` - 검색 결과 페이지
- `/about` - 블로그 소개 페이지

### 관리자 페이지 (관리자 전용)

- `/admin` - 대시보드 (통계, 최근 댓글, 시스템 상태)
- `/admin/posts` - 포스트 관리 (목록, 검색, 필터링)
- `/admin/posts/new` - 새 포스트 작성
- `/admin/posts/[id]/edit` - 포스트 수정
- `/admin/posts/drafts` - 임시저장 목록
- `/admin/categories` - 카테고리 관리 (계층 구조, 드래그앤드롭)
- `/admin/hashtags` - 해시태그 관리 (목록, 생성, 수정, 삭제)
- `/admin/comments` - 댓글 관리 (승인/거부/답글)
- `/admin/images` - 이미지 갤러리 및 관리
- `/admin/analytics` - 통계 및 분석 (조회수, 인기 포스트 등)
- `/admin/settings` - 블로그 설정 (기본 정보, 이메일 설정)

### 인증 페이지

- `/signin` - 관리자 로그인
- `/signout` - 로그아웃

## 🗄 데이터베이스 구조

### 주요 테이블

#### User (관리자)

```sql
- id: UUID (PK)
- email: String (Unique) - 관리자 이메일
- name: String - 관리자 이름
- password: String - 해시된 비밀번호
- role: Enum('ADMIN', 'SUPER_ADMIN')
- profileImage: String? - 프로필 이미지 URL
- createdAt, updatedAt: DateTime
```

#### Category (카테고리 - 계층 구조)

```sql
- id: UUID (PK)
- name: String - 카테고리 이름
- slug: String (Unique) - URL용 슬러그
- description: String? - 설명
- parentCategoryId: UUID? (FK) - 상위 카테고리 (null이면 최상위)
- order: Int - 정렬 순서
- level: Int - 계층 레벨 (0: 최상위, 1: 1단계 하위...)
- isActive: Boolean - 활성화 상태
- createdAt, updatedAt: DateTime
```

#### Post (포스트)

```sql
- id: UUID (PK)
- title: String - 제목
- slug: String (Unique) - URL용 슬러그
- content: String - 마크다운 내용
- excerpt: String? - 요약
- coverImage: String? - 커버 이미지
- status: Enum('DRAFT', 'PUBLISHED', 'ARCHIVED')
- publishedAt: DateTime? - 발행 시간
- categoryId: UUID? (FK) - 카테고리
- authorId: UUID (FK) - 작성자
- views: Int - 조회수
- likesCount: Int - 좋아요 수 (캐시)
- isCommentEnabled: Boolean - 댓글 허용 여부
- seoTitle, seoDescription: String? - SEO 메타 정보
- createdAt, updatedAt: DateTime
```

#### PostLike (포스트 좋아요)

```sql
- id: UUID (PK)
- postId: UUID (FK)
- ipAddress: String - 방문자 IP
- userAgent: String? - 브라우저 정보
- createdAt: DateTime
- Unique: [postId, ipAddress] - 중복 방지
```

#### Comment (댓글)

```sql
- id: UUID (PK)
- postId: UUID (FK) - 포스트
- parentId: UUID? (FK) - 답글용 부모 댓글
- authorName: String - 방문자 닉네임
- authorEmail: String - 방문자 이메일
- authorPassword: String - 해시된 비밀번호 (수정/삭제용)
- content: String - 댓글 내용
- status: Enum('PENDING', 'APPROVED', 'REJECTED')
- ipAddress: String - IP 주소
- userAgent: String? - 브라우저 정보
- isReply: Boolean - 답글 여부
- adminReply: String? - 관리자 답글
- adminRepliedAt: DateTime? - 답글 작성 시간
- createdAt, updatedAt: DateTime
```

#### Hashtag (해시태그)

```sql
- id: UUID (PK)
- name: String (Unique) - 해시태그명
- createdAt: DateTime
```

#### PostHashtag (포스트-해시태그 관계)

```sql
- postId: UUID (FK)
- hashtagId: UUID (FK)
```

#### UploadedImage (업로드 이미지)

```sql
- id: UUID (PK)
- filename: String - 저장된 파일명
- originalName: String - 원본 파일명
- path: String - 파일 경로
- size: Int - 파일 크기
- mimeType: String - MIME 타입
- alt: String? - 대체 텍스트
- postId: UUID? (FK) - 연결된 포스트
- createdAt: DateTime
```

#### PostView (조회 기록)

```sql
- id: UUID (PK)
- postId: UUID (FK)
- ipAddress: String
- userAgent: String
- viewedAt: DateTime
```

#### EmailLog (이메일 발송 로그)

```sql
- id: UUID (PK)
- to: String - 수신자
- subject: String - 제목
- type: Enum('COMMENT_NOTIFICATION', 'REPLY_NOTIFICATION')
- status: Enum('SENT', 'FAILED')
- errorMessage: String? - 오류 메시지
- sentAt: DateTime
```

## 🔌 API 엔드포인트

### 인증 API

```
POST /api/auth/signin     - 로그인
POST /api/auth/signout    - 로그아웃
POST /api/auth/refresh    - 토큰 갱신
GET  /api/auth/session    - 세션 조회
```

### 포스트 API

```
GET    /api/posts              - 포스트 목록 (필터링, 페이징)
GET    /api/posts/:id          - 포스트 상세
GET    /api/posts/slug/:slug   - 슬러그로 포스트 조회
POST   /api/posts              - 포스트 생성
PUT    /api/posts/:id          - 포스트 수정
DELETE /api/posts/:id          - 포스트 삭제
PATCH  /api/posts/:id/publish  - 발행 상태 변경
PATCH  /api/posts/:id/views    - 조회수 증가
POST   /api/posts/:id/like     - 좋아요 추가
DELETE /api/posts/:id/like     - 좋아요 취소
GET    /api/posts/search       - 포스트 검색
GET    /api/posts/drafts       - 임시저장 목록
POST   /api/posts/draft        - 임시저장
PATCH  /api/posts/:id/autosave - 자동저장
```

### 카테고리 API

```
GET    /api/categories         - 카테고리 목록
GET    /api/categories/tree    - 트리 구조 카테고리
POST   /api/categories         - 카테고리 생성
PUT    /api/categories/:id     - 카테고리 수정
DELETE /api/categories/:id     - 카테고리 삭제
PATCH  /api/categories/:id/move - 카테고리 이동
```

### 해시태그 API

```
GET    /api/hashtags              - 해시태그 목록
POST   /api/hashtags              - 해시태그 생성
PUT    /api/hashtags/:id          - 해시태그 수정
DELETE /api/hashtags/:id          - 해시태그 삭제
GET    /api/hashtags/:id/posts    - 해시태그별 포스트
GET    /api/hashtags/autocomplete - 해시태그 자동완성
GET    /api/hashtags/popular      - 인기 해시태그
```

### 댓글 API

```
GET    /api/comments/post/:postId  - 포스트별 댓글
POST   /api/comments               - 댓글 작성 (방문자)
POST   /api/comments/:id/reply     - 답글 작성 (관리자)
PUT    /api/comments/:id           - 댓글 수정
DELETE /api/comments/:id           - 댓글 삭제
PATCH  /api/comments/:id/approve   - 댓글 승인/거부
POST   /api/comments/verify        - 댓글 작성자 인증
```

### 파일 업로드 API

```
POST   /api/upload/image       - 이미지 업로드
DELETE /api/upload/image/:id   - 이미지 삭제
GET    /api/upload/images      - 이미지 목록
```

### 관리자 API

```
GET /api/admin/stats              - 전체 통계
GET /api/admin/posts/stats        - 포스트 통계
GET /api/admin/comments/stats     - 댓글 통계
GET /api/admin/categories/stats   - 카테고리 통계
GET /api/admin/hashtags/stats     - 해시태그 통계
```

### 기타 API

```
GET /api/sitemap.xml           - 사이트맵
GET /api/rss.xml              - RSS 피드
```

## ✉️ 이메일 알림 시스템

### 알림 플로우

1. **방문자 댓글 작성** → 관리자에게 이메일 알림
2. **관리자 답글 작성** → 원댓글 작성자에게 이메일 알림

### 이메일 템플릿

- **댓글 알림**: 포스트 제목, 댓글 내용, 관리 링크
- **답글 알림**: 포스트 제목, 원댓글 내용, 답글 내용

## 🔐 보안 고려사항

- JWT 기반 인증 (HTTP-only 쿠키)
- bcrypt 비밀번호 해시
- IP 기반 좋아요/조회수 중복 방지
- 댓글 스팸 필터링
- 파일 업로드 제한 (이미지만, 크기 제한)
- Rate Limiting
- XSS, CSRF 방지

## 📊 주요 기능

### 포스트 관리

- 마크다운 에디터 (실시간 미리보기)
- 이미지 드래그앤드롭 업로드
- 임시저장 및 자동저장
- SEO 최적화 (메타태그, 사이트맵)
- 조회수 및 좋아요 시스템

### 댓글 시스템

- 방문자 댓글 (닉네임, 이메일, 비밀번호)
- 관리자 답글
- 댓글 승인/거부
- 이메일 알림

### 카테고리 관리

- 계층 구조 (무제한 depth)
- 드래그앤드롭 정렬
- 카테고리별 포스트 필터링
- 카테고리별 포스트 수 통계

### 해시태그 관리

- 해시태그 생성/수정/삭제
- 해시태그별 포스트 수 통계
- 인기 해시태그 분석
- 해시태그 자동완성
- 미사용 해시태그 정리

### 통계 및 분석

- 포스트별 조회수
- 인기 포스트
- 댓글 통계
- 방문자 분석

---

📌 **참고**: 체크리스트는 별도 문서에서 관리합니다.

- API 구현 체크리스트
- UI 구현 체크리스트
- React 훅 체크리스트
