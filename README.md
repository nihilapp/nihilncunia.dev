# 개인 블로그 프로젝트

Next.js와 최신 기술 스택을 활용한 개인 블로그 웹사이트입니다. 웹 기반 마크다운 에디터를 통해 블로그 포스팅이 가능하며, SEO에 최적화된 구조로 설계되었습니다.

## 🎯 프로젝트 개요

개인용 블로그 웹사이트로, 웹 인터페이스를 통한 마크다운 기반 글 작성 및 관리가 가능합니다. 모든 콘텐츠는 데이터베이스에 저장되어 동적으로 렌더링됩니다.

## 📊 프로젝트 진척도

### 🏗️ 1단계: 기본 인프라 구축 (2주)

#### 프로젝트 초기 설정

- [x] Next.js 14+ 프로젝트 생성 및 기본 구조 설정
- [x] TypeScript 설정 및 타입 안전성 확보
- [x] TailwindCSS v4 설정 및 기본 스타일링
- [x] shadcn/ui 설치 및 컴포넌트 라이브러리 구성
- [x] ESLint, Prettier 코드 품질 도구 설정
- [x] 라우트 그룹 생성 ((common), (auth), (admin))

#### 데이터베이스 및 백엔드 설정

- [x] Prisma 스키마 설계 (Admin, Post, Category, Hashtag 등)
- [x] 데이터베이스 연결 및 마이그레이션
- [x] Prisma Client 생성 및 설정
- [x] API 라우트 기본 구조 생성
- [x] 환경 변수 설정 (.env.local)

#### 인증 시스템 구현

- [x] JWT 유틸리티 함수 구현 (/app/api/\_libs/tools/admin-jwt.ts)
- [x] bcrypt 비밀번호 해싱 구현 (/app/api/\_libs/tools/bcrypt.ts)
- [x] 관리자 로그인 API (POST /api/auth/sign_in)
- [x] 로그아웃 API (POST /api/auth/sign_out)
- [x] 토큰 갱신 & 검증 API (POST/GET /api/auth/refresh)
- [x] 인증 미들웨어 구현 (/app/api/\_libs/middleware/auth.ts)
- [x] HTTP-only 쿠키 설정
- [x] Admin 전용 타입 정의 구현

#### 보안 설정

- [x] CORS 설정
- [x] CSRF 보호 구현
- [x] XSS 방지 설정
- [x] API 요청 유효성 검사

### 📝 2단계: 콘텐츠 관리 시스템 (3주)

#### 블로그 포스트 CRUD API

- [x] 포스트 목록 조회 API (GET /api/posts)
- [x] 포스트 상세 조회 API (GET /api/posts/:id)
- [x] 포스트 slug 조회 API (GET /api/posts/slug/:slug)
- [x] 포스트 작성 API (POST /api/posts)
- [x] 포스트 수정 API (PUT /api/posts/:id)
- [x] 포스트 삭제 API (DELETE /api/posts/:id)
- [x] 포스트 검색 API (GET /api/posts/search)
- [x] 포스트 발행/취소 API (PATCH /api/posts/:id/publish)
- [x] 포스트 조회수 증가 API (PATCH /api/posts/:id/views)
- [x] 포스트 좋아요 증가 API (PATCH /api/posts/:id/likes)
- [x] 카테고리별 포스트 필터링
- [x] 🚨 **[1순위]** 포스트 임시 저장 API (POST /api/posts/draft)
- [x] 🚨 **[1순위]** 임시 저장 포스트 조회 API (GET /api/posts/drafts)
- [x] 🚨 **[1순위]** 임시 저장 포스트 복구 API (GET /api/posts/drafts/:id/restore)
- [x] 🚨 **[1순위]** 포스트 자동 저장 API (PATCH /api/posts/:id/autosave)
- [ ] ~~포스트 복제 API (POST /api/posts/:id/duplicate)~~ // 제거됨
- [x] ⚠️ **[2순위]** 포스트 상태 일괄 변경 API (PATCH /api/posts/batch-status)
- [x] ⚠️ **[2순위]** 포스트 일괄(선택) 삭제 API (DELETE /api/posts/batch)
- [ ] 📈 **[3순위]** 관련 포스트 추천 API (GET /api/posts/:id/related)
- [ ] ~~포스트 프리뷰 API (GET /api/posts/:id/preview)~~ // 제거됨
- [ ] ✨ **[4순위]** 포스트 목록 정렬 옵션 확장 (최신순, 인기순, 조회순)

#### 카테고리 관리 시스템

- [x] 카테고리 목록 조회 API (GET /api/categories)
- [x] 카테고리 생성 API (POST /api/categories)
- [x] 카테고리 수정 API (PUT /api/categories/:id)
- [x] 카테고리 삭제 API (DELETE /api/categories/:id)
- [x] 카테고리별 포스트 목록 API
- [ ] ⚠️ **[2순위]** 포스트 작성 중 카테고리 즉석 생성 기능

#### 서브카테고리 관리 시스템

- [x] 서브카테고리 목록 조회 API (GET /api/subcategories)
- [x] 서브카테고리 생성 API (POST /api/subcategories)
- [x] 서브카테고리 수정 API (PUT /api/subcategories/:id)
- [x] 서브카테고리 삭제 API (DELETE /api/subcategories/:id)
- [x] 카테고리별 서브카테고리 필터링
- [x] 서브카테고리별 포스트 필터링
- [ ] ⚠️ **[2순위]** 포스트 작성 중 서브카테고리 즉석 생성 기능

#### 해시태그 시스템

- [x] 해시태그 목록 조회 API (GET /api/hashtags)
- [x] 해시태그 생성 API (POST /api/hashtags)
- [x] 해시태그 수정 API (PUT /api/hashtags/:id)
- [x] 해시태그 삭제 API (DELETE /api/hashtags/:id)
- [x] 해시태그별 포스트 필터링
- [x] 해시태그 자동 완성 기능
- [x] 포스트-해시태그 연결 로직

#### 관리자 프로필 관리

- [x] 관리자 정보 조회 API (GET /api/admin/profile)
- [x] 관리자 정보 수정 API (PUT /api/admin/profile)
- [x] 관리자 비밀번호 변경 API (PUT /api/admin/password)
- [x] 관리자 프로필 관리 페이지 (/admin/profile)

#### 마크다운 에디터 구현

- [x] ⚠️ **[2순위]** 마크다운 에디터 컴포넌트 (shadcn/ui 기반)
- [x] ⚠️ **[2순위]** 실시간 프리뷰 기능
- [x] ⚠️ **[2순위]** 미리보기 버튼 OFF/ON 표시 개선
- [x] ⚠️ **[2순위]** 탭 키 들여쓰기 기능 (스페이스 2칸)
- [ ] 📈 **[3순위]** 이미지 업로드 기능
- [ ] 📈 **[3순위]** 드래그 앤 드롭 이미지 업로드
- [ ] ✨ **[4순위]** 마크다운 렌더링 최적화

#### 어드민 페이지 구현

- [ ] 📈 **[3순위]** 어드민 대시보드 (/admin)
- [x] ⚠️ **[2순위]** 포스트 관리 페이지 (/admin/posts)
- [x] ⚠️ **[2순위]** 새 포스트 작성 페이지 (/admin/posts/new)
- [x] ⚠️ **[2순위]** 포스트 수정 페이지 (/admin/posts/[id]/edit)
- [x] 🚨 **[1순위]** 임시 저장 포스트 관리 페이지 (/admin/posts/drafts)
- [x] 카테고리 관리 페이지 (/admin/categories)
- [x] 서브카테고리 관리 페이지 (/admin/subcategories)
- [x] 해시태그 관리 페이지 (/admin/hashtags)
- [ ] ✨ **[4순위]** 관리자 프로필 페이지 (/admin/profile)
- [ ] ✨ **[4순위]** 블로그 설정 페이지 (/admin/settings)
- [ ] 📈 **[3순위]** 포스트 통계 페이지 (/admin/analytics)
- [ ] ✨ **[4순위]** 백업 및 복원 페이지 (/admin/backup)
- [x] ⚠️ **[2순위]** 포스트 작성/수정 페이지 내 카테고리/서브카테고리 즉석 생성 모달
- [x] ⚠️ **[2순위]** 체크박스 선택 시스템 (일괄 작업)
- [x] ⚠️ **[2순위]** 일괄 작업 툴바
- [x] ⚠️ **[2순위]** 확인 모달 컴포넌트
- [x] ⚠️ **[2순위]** 선택된 항목 카운터

#### 상태 관리 및 API 통신

- [x] Zustand 스토어 설정 (/app/\_entities) - **부분 완료**
- [x] TanStack React Query 설정 - **부분 완료**
- [x] API 클라이언트 설정 (Axios) - **부분 완료**
- [x] 커스텀 훅 구현 (React Query) - **부분 완료**
- [x] 토스트 알림 시스템 (성공/오류 메시지)

### 🌐 3단계: 공개 블로그 페이지 (2주)

#### 프론트엔드 블로그 페이지

- [ ] 홈페이지 (/) - 최신 포스트 목록
- [ ] 전체 포스트 목록 페이지 (/posts)
- [ ] 개별 포스트 상세 페이지 (/posts/[id])
- [ ] 카테고리 목록 페이지 (/categories)
- [ ] 카테고리별 포스트 목록 (/categories/[category])
- [ ] 블로그 검색 페이지 (/search)
- [ ] 블로그 소개 페이지 (/about)

#### 인증 페이지

- [ ] 관리자 로그인 페이지 (/auth/sign-in)
- [ ] 로그인 폼 컴포넌트 (shadcn/ui)
- [ ] 인증 상태 관리

#### UI/UX 구현

- [ ] 반응형 디자인 (모바일/태블릿/데스크톱)
- [ ] 다크 모드 지원
- [ ] 로딩 상태 및 스켈레톤 UI
- [ ] 에러 처리 및 사용자 피드백
- [ ] 페이지네이션 구현
- [ ] 검색 기능 UI

#### 공통 컴포넌트

- [ ] Header 컴포넌트
- [ ] Footer 컴포넌트
- [ ] Navigation 컴포넌트
- [ ] 포스트 카드 컴포넌트
- [ ] 카테고리 배지 컴포넌트
- [ ] 해시태그 컴포넌트
- [ ] 공유 버튼 컴포넌트

### 🚀 4단계: SEO 최적화 및 배포 (1주)

#### SEO 최적화

- [ ] 동적 메타 태그 생성
- [ ] Open Graph 태그 설정
- [ ] Twitter Card 메타 태그
- [ ] 구조화된 데이터 (JSON-LD) 구현
- [ ] 사이트맵 자동 생성 API (GET /api/sitemap.xml)
- [ ] RSS 피드 구현 (GET /api/rss.xml)
- [ ] robots.txt 설정 (어드민 페이지 크롤링 차단)

#### 성능 최적화

- [ ] 이미지 최적화 (Next.js Image)
- [ ] 코드 스플리팅 최적화
- [ ] 번들 크기 최적화
- [ ] 캐싱 전략 구현
- [ ] 지연 로딩 구현

#### 배포 및 운영

- [ ] Vercel 배포 설정
- [ ] 환경 변수 프로덕션 설정
- [ ] 데이터베이스 프로덕션 설정
- [ ] 도메인 연결
- [ ] SSL 인증서 설정
- [ ] 성능 모니터링 설정

#### 추가 기능

- [ ] 404 페이지 커스터마이징
- [ ] 포스트 조회수 카운터
- [ ] 읽는 시간 계산
- [ ] 포스트 공유 기능
- [ ] 관련 포스트 추천

### 🔄 확장 기능 (향후 개발)

#### 고급 기능

- [ ] 댓글 시스템
- [ ] 이메일 뉴스레터 구독
- [ ] Google Analytics 연동
- [ ] 방문자 통계 대시보드
- [ ] 소셜 미디어 연동
- [ ] 다국어 지원 (i18n)

#### 개발자 경험 개선

- [ ] Storybook 설정
- [ ] 테스트 코드 작성 (Jest, Testing Library)
- [ ] E2E 테스트 (Playwright)
- [ ] CI/CD 파이프라인 구축
- [ ] 코드 문서화

---

**진행률**: 🔧 **설계 완료** | 🚧 **개발 진행 중** | ⏸️ **개발 대기**

## 🎯 구현 우선순위 및 현황 분석

### 📊 현재 구현 현황 (2024년 12월 기준)

#### ✅ **완료된 핵심 기능들**

- **기본 Posts CRUD API**: 생성, 조회, 수정, 삭제 모든 기능 완료
- **포스트 검색 및 필터링**: 제목/내용 검색, 카테고리별 필터링
- **포스트 발행 관리**: 발행/취소, 상태 관리 (DRAFT, PUBLISHED)
- **포스트 상호작용**: 조회수/좋아요 증가 API
- **카테고리/서브카테고리 시스템**: 완전한 CRUD API 및 필터링
- **해시태그 시스템**: 완전한 CRUD API, 자동완성, 포스트 연결
- **관리자 인증**: JWT 기반 로그인/로그아웃, 토큰 갱신
- **관리자 프로필 관리**: 정보 수정, 비밀번호 변경
- **프론트엔드 상태 관리**: Posts, Categories, Hashtags 엔티티 구조
- **어드민 페이지 기본 구조**: Categories, Subcategories, Hashtags 관리 페이지

#### ❌ **미구현 핵심 기능들**

- **임시 저장 시스템**: 타입만 정의됨, API 미구현
- **일괄 작업 시스템**: 타입만 정의됨, API 미구현
- **마크다운 에디터**: 컴포넌트 미구현
- **이미지 업로드**: 시스템 전체 미구현
- **포스트 작성/수정 페이지**: 완전한 포스트 관리 UI 미구현
- **공개 블로그 페이지**: 모든 페이지 미구현

### 🚨 **1순위: 긴급 구현 과제 (1주 내)**

#### 임시 저장 시스템 완성

**목표**: 사용자 작성 데이터 손실 방지 - 블로그 CMS의 필수 기능

**구현할 API들:**

```
- [ ] POST /api/posts/draft - 포스트 임시 저장
- [ ] GET /api/posts/drafts - 임시 저장 포스트 목록 조회
- [ ] GET /api/posts/drafts/:id/restore - 임시 저장 포스트 복구
- [ ] PATCH /api/posts/:id/autosave - 포스트 자동 저장 (30초 간격)
```

**프론트엔드 연동:**

```
- [ ] 자동 저장 훅 구현 (useAutosave)
- [ ] 임시 저장 목록 컴포넌트
- [ ] 복구 기능 UI
- [ ] 저장 상태 표시 컴포넌트
```

#### 포스트 작성 플로우 개선

**목표**: 새 포스트 작성 시 중복 생성 방지 및 포스트 추적 개선

**구현할 기능들:**

```
- [ ] 새 포스트 작성 페이지에서 포스트 ID 추적 시스템
- [ ] 임시 저장 시 기존 포스트 업데이트 (새 포스트 생성 방지)
- [ ] 포스트 작성 상태 관리 (DRAFT → 임시저장 → 발행)
- [ ] 포스트 목록에서 개별 포스트 상세보기 기능 (미리보기 또는 새창)
```

### ⚠️ **2순위: 중요 구현 과제 (2주 내)**

#### A. 일괄 작업 시스템

**목표**: 관리 효율성 대폭 향상

**구현할 API들:**

```
- [ ] DELETE /api/posts/batch - 포스트 일괄 삭제
- [ ] PATCH /api/posts/batch-status - 포스트 상태 일괄 변경
```

**프론트엔드 연동:**

```
- [ ] 체크박스 선택 시스템
- [ ] 일괄 작업 툴바
- [ ] 확인 모달 컴포넌트
```

#### B. 마크다운 에디터 구현

**목표**: 핵심 콘텐츠 작성 도구 완성

**구현할 기능들:**

```
- [ ] 기본 마크다운 에디터 컴포넌트
- [ ] 실시간 프리뷰 (split view)
- [ ] 에디터 툴바 (굵기, 기울임, 링크, 헤더 등)
- [ ] 키보드 단축키 지원
- [ ] 임시 저장과의 연동
```

#### C. 포스트 작성/수정 페이지

**목표**: 완전한 포스트 관리 UI 완성

**구현할 페이지들:**

```
- [ ] /admin/posts/new - 새 포스트 작성 페이지
- [ ] /admin/posts/[id]/edit - 포스트 수정 페이지
- [ ] /admin/posts - 포스트 목록 관리 페이지 (일괄 작업 포함)
```

**UX 개선 기능:**

```
- [ ] 카테고리/서브카테고리 즉석 생성 모달
- [ ] 포스트 작성 중 카테고리 부족 시 즉시 생성 가능
- [ ] 폼 연동: 새 카테고리 생성 후 자동 선택
```

### 📈 **3순위: 유용한 확장 과제 (1개월 내)**

#### A. 이미지 업로드 시스템

**구현할 API들:**

```
- [ ] POST /api/upload/image - 이미지 업로드
- [ ] DELETE /api/upload/image/:id - 이미지 삭제
- [ ] GET /api/upload/images - 이미지 목록 조회
```

**프론트엔드 기능:**

```
- [ ] 드래그 앤 드롭 이미지 업로드
- [ ] 이미지 미리보기
- [ ] 이미지 갤러리 모달
- [ ] 에디터 내 이미지 삽입
```

#### B. 관련 포스트 추천 시스템

```
- [ ] GET /api/posts/:id/related - 관련 포스트 추천 API
- [ ] 카테고리/해시태그 기반 추천 알고리즘
- [ ] 추천 포스트 UI 컴포넌트
```

#### C. 통계 및 분석 기능

```
- [ ] 포스트별 조회수/좋아요 통계 페이지
- [ ] 카테고리별 인기도 분석
- [ ] 월별/일별 방문자 통계
- [ ] 어드민 대시보드 차트 구현
```

### ✨ **4순위: 개선 및 최적화 과제 (필요시)**

#### A. 정렬 및 필터 옵션 확장

```
- [ ] 포스트 목록 다중 정렬 (최신순, 인기순, 조회수순)
- [ ] 날짜 범위 필터링
- [ ] 고급 검색 기능 (제목, 내용, 작성자 등)
```

#### B. 예약 발행 시스템

```
- [ ] 예약 발행 API
- [ ] 예약 발행 목록 관리
- [ ] 크론 작업 설정
```

#### C. 공개 블로그 페이지

```
- [ ] 홈페이지 (/) - 최신 포스트 목록
- [ ] 포스트 상세 페이지 (/posts/[id])
- [ ] 카테고리별 포스트 목록
- [ ] 검색 페이지
```

### 🛠 **기술적 고려사항**

#### 성능 최적화

```
- [ ] 이미지 최적화 및 CDN 연동
- [ ] API 응답 캐싱 전략
- [ ] 데이터베이스 쿼리 최적화
- [ ] 번들 크기 최적화
```

#### 보안 강화

```
- [ ] 파일 업로드 보안 (파일 타입, 크기 제한)
- [ ] API 요청 제한 (Rate Limiting)
- [ ] XSS 방지 (마크다운 렌더링 시)
- [ ] CSRF 토큰 강화
```

#### 사용자 경험 개선

```
- [ ] 로딩 상태 및 스켈레톤 UI
- [ ] 에러 처리 및 토스트 알림
- [ ] 키보드 단축키 가이드
- [ ] 다크 모드 에디터 테마
```

### 📋 **다음 스프린트 계획**

#### **Week 1-2: 임시 저장 시스템**

1. 임시 저장 API 4개 구현
2. 자동 저장 훅 및 UI 구현
3. 임시 저장 목록 페이지 구현

#### **Week 3-4: 마크다운 에디터**

1. 기본 에디터 컴포넌트 구현
2. 실시간 프리뷰 기능 구현
3. 임시 저장과 연동

#### **Week 5-6: 포스트 관리 페이지**

1. 포스트 작성/수정 페이지 구현
2. 일괄 작업 시스템 구현
3. 포스트 목록 관리 UI 완성

---

**현재 상태**: 🏗️ **인프라 완성** → 🚧 **핵심 기능 구현 중** → 🎯 **임시 저장 시스템 우선**

## ✨ 주요 기능

### 📝 콘텐츠 관리 시스템

- **마크다운 기반 글 작성**: 웹 에디터를 통한 직관적인 글 작성
- **실시간 프리뷰**: 작성 중인 마크다운의 실시간 렌더링 확인
- **카테고리 관리**: 웹 인터페이스를 통한 카테고리 생성/수정/삭제
- **해시태그 시스템**: 글당 최대 10개의 해시태그 설정

### 🔐 보안 및 인증

- **관리자 전용 시스템**: 일반 사용자 기능 없이 관리자만 콘텐츠 관리
- **어드민 페이지 보안**: 외부 노출 완전 차단 및 검색 엔진 크롤링 방지
- **JWT 기반 인증**: 액세스 토큰 및 리프레시 토큰 활용
- **보안 미들웨어**: CORS, CSRF, XSS 방지 기능 내장

### 🚀 SEO 최적화

- **검색 엔진 최적화**: 메타 태그, 구조화된 데이터, 사이트맵 완비
- **성능 최적화**: 빠른 로딩 속도 및 사용자 경험 향상
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **State Management**: Zustand v5
- **Form Control**: React Hook Form + Yup
- **Data Fetching**: TanStack React Query v5 + Axios

### Styling & UI

- **CSS Framework**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Styled Components**: emotion/styled
- **Design System**: class-variance-authority

### Backend & Database

- **API**: Next.js API Routes
- **ORM**: Prisma v6
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcrypt

### Development & Deployment

- **Package Manager**: pnpm
- **Deployment**: Vercel
- **Database**: PostgreSQL (production), SQLite (development)

## 📁 프로젝트 구조

```
app/
├── (common)/              # 공통 페이지 (홈, 블로그 등)
├── (auth)/               # 인증 관련 페이지 (비공개)
├── (admin)/              # 어드민 페이지 (비공개)
├── api/                  # API 라우트
│   └── _libs/           # API 유틸리티
├── _components/          # 공통 컴포넌트
├── _libs/               # 프론트엔드 유틸리티
├── _entities/           # 도메인별 비즈니스 로직
└── _prisma/             # 데이터베이스 스키마
```

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd personal-blog
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경 변수 설정

```bash
cp .env.example .env.local
# .env.local 파일에서 필요한 환경 변수 설정
```

### 4. 데이터베이스 설정

```bash
# Prisma 마이그레이션 실행
pnpm db:push

# 시드 데이터 생성 (선택사항)
pnpm db:seed
```

### 5. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000`을 열어 결과를 확인하세요.

## 📋 주요 스크립트

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 타입 체크
pnpm type-check

# 린팅
pnpm lint

# 데이터베이스 관련
pnpm db:push      # 스키마 변경사항 적용
pnpm db:studio    # Prisma Studio 실행
pnpm db:seed      # 시드 데이터 생성
```

## 🔧 개발 가이드

### 컴포넌트 구조

- 공통 컴포넌트: `/app/_components`
- 페이지별 컴포넌트: 각 라우트 폴더 내 `_components`
- UI 컴포넌트: shadcn/ui 활용

### 상태 관리

- 전역 상태: Zustand Store (`/app/_entities/*/store.ts`)
- 서버 상태: TanStack React Query (`/app/_entities/*/hooks/`)

### API 구조

- 인증 API: `/app/api/auth/`
- 어드민 API: `/app/api/admin/`
- 포스트 API: `/app/api/posts/`
- 카테고리 API: `/app/api/categories/`
- 해시태그 API: `/app/api/hashtags/`

## 🛡 보안 고려사항

- **어드민 페이지**: robots.txt로 크롤링 차단, 사이트맵에서 제외
- **인증 토큰**: HTTP-only 쿠키로 안전하게 관리
- [ ] **비밀번호**: bcrypt를 통한 해싱 처리
- **API 보안**: CORS, CSRF 보호 적용

## 📈 SEO 최적화

- **메타 태그**: 동적 메타 데이터 생성
- **구조화된 데이터**: JSON-LD 스키마 적용
- **사이트맵**: 자동 생성 및 업데이트
- **성능**: 이미지 최적화, 코드 스플리팅

## 🤝 기여하기

이 프로젝트는 개인 블로그 프로젝트입니다. 버그 리포트나 개선 제안은 이슈를 통해 제출해 주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🎯 빠른 참조: 다음 구현 과제

### 🚨 **즉시 구현 필요 (이번 주)**

```bash
# 1. 임시 저장 시스템 API 구현
/api/posts/draft (POST)         # 임시 저장
/api/posts/drafts (GET)         # 임시 저장 목록
/api/posts/drafts/:id/restore   # 복구
/api/posts/:id/autosave         # 자동 저장

# 2. 프론트엔드 연동
useAutosave 훅 구현
임시 저장 목록 컴포넌트
저장 상태 표시 UI
```

### ⚠️ **다음 우선순위 (2-3주 내)**

```bash
# 1. 일괄 작업 시스템
/api/posts/batch (DELETE)       # 일괄 삭제
/api/posts/batch-status (PATCH) # 상태 일괄 변경

# 2. 마크다운 에디터
기본 에디터 컴포넌트
실시간 프리뷰
에디터 툴바

# 3. 포스트 관리 페이지
/admin/posts/new
/admin/posts/[id]/edit
/admin/posts (목록 + 일괄 작업)
```

### 📈 **중기 목표 (1개월 내)**

```bash
# 이미지 업로드 시스템
# 관련 포스트 추천
# 통계 및 분석 기능
# 공개 블로그 페이지
```

**현재 진행률**: 기본 인프라 ✅ → 임시 저장 🚧 → 에디터 ⏸️ → 공개 페이지 ⏸️
