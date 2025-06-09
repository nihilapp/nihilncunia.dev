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

#### 카테고리 관리 시스템

- [ ] 카테고리 목록 조회 API (GET /api/categories)
- [ ] 카테고리 생성 API (POST /api/categories)
- [ ] 카테고리 수정 API (PUT /api/categories/:id)
- [ ] 카테고리 삭제 API (DELETE /api/categories/:id)
- [ ] 카테고리별 포스트 목록 API

#### 해시태그 시스템

- [ ] 해시태그 목록 조회 API (GET /api/hashtags)
- [ ] 해시태그별 포스트 필터링
- [ ] 해시태그 자동 완성 기능
- [ ] 포스트-해시태그 연결 로직

#### 관리자 프로필 관리

- [ ] 관리자 정보 조회 API (GET /api/admin/profile)
- [ ] 관리자 정보 수정 API (PUT /api/admin/profile)
- [ ] 관리자 비밀번호 변경 API (PUT /api/admin/password)

#### 마크다운 에디터 구현

- [ ] 마크다운 에디터 컴포넌트 (shadcn/ui 기반)
- [ ] 실시간 프리뷰 기능
- [ ] 이미지 업로드 기능
- [ ] 드래그 앤 드롭 이미지 업로드
- [ ] 마크다운 렌더링 최적화

#### 어드민 페이지 구현

- [ ] 어드민 대시보드 (/admin)
- [ ] 포스트 관리 페이지 (/admin/posts)
- [ ] 새 포스트 작성 페이지 (/admin/posts/new)
- [ ] 포스트 수정 페이지 (/admin/posts/[id]/edit)
- [ ] 카테고리 관리 페이지 (/admin/categories)
- [ ] 관리자 프로필 페이지 (/admin/profile)
- [ ] 블로그 설정 페이지 (/admin/settings)

#### 상태 관리 및 API 통신

- [ ] Zustand 스토어 설정 (/app/\_entities)
- [ ] TanStack React Query 설정
- [ ] API 클라이언트 설정 (Axios)
- [ ] 커스텀 훅 구현 (React Query)
- [ ] 폼 관리 (React Hook Form + Yup)

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
- **비밀번호**: bcrypt를 통한 해싱 처리
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
