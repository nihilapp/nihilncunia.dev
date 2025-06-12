# 개인 블로그 프로젝트

Next.js와 최신 기술 스택을 활용한 개인 블로그 웹사이트입니다. 웹 기반 마크다운 에디터를 통해 블로그 포스팅이 가능하며, SEO에 최적화된 구조로 설계되었습니다.

## 🎯 프로젝트 개요

개인용 블로그 웹사이트로, 웹 인터페이스를 통한 마크다운 기반 글 작성 및 관리가 가능합니다. 모든 콘텐츠는 데이터베이스에 저장되어 동적으로 렌더링됩니다.

## 📊 프로젝트 진척도

### 🏗️ 1단계: 기본 인프라 구축 (2주)

#### 프로젝트 초기 설정

- [ ] Next.js 14+ 프로젝트 생성 및 기본 구조 설정
- [ ] TypeScript 설정 및 타입 안전성 확보
- [ ] TailwindCSS v4 설정 및 기본 스타일링
- [ ] shadcn/ui 설치 및 컴포넌트 라이브러리 구성
- [ ] ESLint, Prettier 코드 품질 도구 설정
- [ ] 라우트 그룹 생성 ((common), (auth), (admin))

#### 데이터베이스 및 백엔드 설정

- [ ] Prisma 스키마 설계 (User, Post, Category, Hashtag 등)
- [ ] 데이터베이스 연결 및 마이그레이션
- [ ] Prisma Client 생성 및 설정
- [ ] API 라우트 기본 구조 생성
- [ ] 환경 변수 설정 (.env.local)

#### 인증 시스템 구현

- [ ] JWT 유틸리티 함수 구현 (/app/api/\_libs/tools/jwt.ts)
- [ ] bcrypt 비밀번호 해싱 구현 (/app/api/\_libs/tools/bcrypt.ts)
- [ ] 사용자 로그인 API (POST /api/auth/sign_in)
- [ ] 로그아웃 API (POST /api/auth/sign_out)
- [ ] 토큰 갱신 & 검증 API (POST/GET /api/auth/refresh)
- [ ] 인증 미들웨어 구현 (/app/api/\_libs/middleware/auth.ts)
- [ ] HTTP-only 쿠키 설정
- [ ] User 전용 타입 정의 구현

#### 보안 설정

- [ ] CORS 설정
- [ ] CSRF 보호 구현
- [ ] XSS 방지 설정
- [ ] API 요청 유효성 검사

### 📝 2단계: 콘텐츠 관리 시스템 (3주)

#### 블로그 포스트 CRUD API

- [ ] 포스트 목록 조회 API (GET /api/posts)
- [ ] 포스트 상세 조회 API (GET /api/posts/:id)
- [ ] 포스트 작성 API (POST /api/posts)
- [ ] 포스트 수정 API (PUT /api/posts/:id)
- [ ] 포스트 삭제 API (DELETE /api/posts/:id)
- [ ] 포스트 검색 API (GET /api/posts/search)
- [ ] 포스트 발행/취소 API (PATCH /api/posts/:id/publish)
- [ ] 포스트 조회수 증가 API (PATCH /api/posts/:id/views)
- [ ] 포스트 좋아요 증가 API (PATCH /api/posts/:id/likes)
- [ ] 포스트별 조회 이력 조회 API (GET /api/posts/:id/views)
- [ ] 포스트별 좋아요 이력 조회 API (GET /api/posts/:id/likes)
- [ ] 포스트별 좋아요 추가/취소 API (POST/DELETE /api/posts/:id/like)
- [ ] 포스트별 중복 좋아요/조회 방지 로직
- [ ] 카테고리별 포스트 필터링
- [ ] 포스트 임시 저장 API (POST /api/posts/draft)
- [ ] 임시 저장 포스트 조회 API (GET /api/posts/drafts)
- [ ] 임시 저장 포스트 복구 API (GET /api/posts/drafts/:id/restore)
- [ ] 포스트 자동 저장 API (PATCH /api/posts/:id/autosave)
- [ ] 포스트 상태 일괄 변경 API (PATCH /api/posts/batch-status)
- [ ] 포스트 일괄(선택) 삭제 API (DELETE /api/posts/batch)
- [ ] 관련 포스트 추천 API (GET /api/posts/:id/related)
- [ ] 포스트 목록 정렬 옵션 확장 (최신순, 인기순, 조회순)

#### 카테고리 관리 시스템

- [ ] 카테고리 목록 조회 API (GET /api/categories)
- [ ] 카테고리 생성 API (POST /api/categories)
- [ ] 카테고리 수정 API (PUT /api/categories/:id)
- [ ] 카테고리 삭제 API (DELETE /api/categories/:id)
- [ ] 카테고리별 포스트 목록 API
- [ ] 포스트 작성 중 카테고리 즉석 생성 기능

#### 서브카테고리 관리 시스템

- [ ] 서브카테고리 목록 조회 API (GET /api/subcategories)
- [ ] 서브카테고리 생성 API (POST /api/subcategories)
- [ ] 서브카테고리 수정 API (PUT /api/subcategories/:id)
- [ ] 서브카테고리 삭제 API (DELETE /api/subcategories/:id)
- [ ] 카테고리별 서브카테고리 필터링
- [ ] 서브카테고리별 포스트 필터링
- [ ] 포스트 작성 중 서브카테고리 즉석 생성 기능

#### 해시태그 시스템

- [ ] 해시태그 목록 조회 API (GET /api/hashtags)
- [ ] 해시태그 생성 API (POST /api/hashtags)
- [ ] 해시태그 수정 API (PUT /api/hashtags/:id)
- [ ] 해시태그 삭제 API (DELETE /api/hashtags/:id)
- [ ] 해시태그별 포스트 필터링
- [ ] 해시태그 자동 완성 기능
- [ ] 포스트-해시태그 연결 로직

#### 사용자 프로필 관리

- [ ] 사용자 정보 조회 API (GET /api/admin/profile)
- [ ] 사용자 정보 수정 API (PUT /api/admin/profile)
- [ ] 사용자 비밀번호 변경 API (PUT /api/admin/password)
- [ ] 사용자 프로필 관리 페이지 (/admin/profile)

#### 마크다운 에디터 구현

- [ ] 마크다운 에디터 컴포넌트 (shadcn/ui 기반)
- [ ] 실시간 프리뷰 기능
- [ ] 미리보기 버튼 OFF/ON 표시 개선
- [ ] 탭 키 들여쓰기 기능 (스페이스 2칸)
- [ ] 이미지 업로드 기능
- [ ] 드래그 앤 드롭 이미지 업로드
- [ ] 마크다운 렌더링 최적화

#### 어드민 페이지 구현

- [ ] 어드민 대시보드 (/admin)
- [ ] 포스트 관리 페이지 (/admin/posts)
- [ ] 새 포스트 작성 페이지 (/admin/posts/new)
- [ ] 포스트 수정 페이지 (/admin/posts/[id]/edit)
- [ ] 임시 저장 포스트 관리 페이지 (/admin/posts/drafts)
- [ ] 카테고리 관리 페이지 (/admin/categories)
- [ ] 서브카테고리 관리 페이지 (/admin/subcategories)
- [ ] 해시태그 관리 페이지 (/admin/hashtags)
- [ ] 사용자 프로필 페이지 (/admin/profile)
- [ ] 블로그 설정 페이지 (/admin/settings)
- [ ] 포스트 통계 페이지 (/admin/analytics)
- [ ] 백업 및 복원 페이지 (/admin/backup)
- [ ] 포스트 작성/수정 페이지 내 카테고리/서브카테고리 즉석 생성 모달
- [ ] 체크박스 선택 시스템 (일괄 작업)
- [ ] 일괄 작업 툴바
- [ ] 확인 모달 컴포넌트
- [ ] 선택된 항목 카운터

#### 상태 관리 및 API 통신

- [ ] Zustand 스토어 설정 (/app/\_entities)
- [ ] TanStack React Query 설정
- [ ] API 클라이언트 설정 (Axios)
- [ ] 커스텀 훅 구현 (React Query)
- [ ] 토스트 알림 시스템 (성공/오류 메시지)

#### 포스트 상태 및 공개 범위

- 포스트 상태(status):
  - DRAFT: 임시저장
  - ARCHIVED: 보관
  - PENDING: 작성중
  - COMPLETED: 작성완료
- 공개 범위(publish):
  - PUBLIC: 전체 공개
  - PRIVATE: 비공개
  - PROTECTED: 보호됨(비밀번호 등)

#### 포스트 통계 및 인터랙션 UI

- [ ] 포스트별 조회수 카운트 UI
- [ ] 포스트별 좋아요 카운트 UI
- [ ] 좋아요 버튼(중복 방지, 로그인 필요)
- [ ] 조회수/좋아요 통계 페이지 (/admin/analytics)
- [ ] 포스트별 조회/좋아요 이력 상세 페이지
- [ ] 인기 포스트(조회수/좋아요 기준) 목록 UI

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

- [ ] 사용자 로그인 페이지 (/auth/sign-in)
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

## 🗒️ 추가 메모 및 진행 상세

# 개인 블로그 프로젝트 - 남은 과제 정리

## 완료된 작업 (Week 1-2)

- [ ] 새 포스트 작성 페이지 (`/admin/posts/new`)
- [ ] 포스트 수정 페이지 (`/admin/posts/[id]/edit`)
- [ ] 포스트 목록 관리 페이지 개선 (`/admin/posts`)
- [ ] React Query 훅 구현 (categories, subcategories)
- [ ] 마크다운 에디터 기본 통합
- [ ] 실제 API 연동 완료
- [ ] 포스트 작성/수정 페이지 내 카테고리/서브카테고리 즉석 생성 모달
- [ ] 마크다운 에디터 개선 (미리보기 OFF/ON 표시, 탭 키 들여쓰기)

## 1순위: 긴급 구현 과제 (1주 내)

### 임시 저장 시스템 완성

- [ ] POST /api/posts/draft - 포스트 임시 저장
- [ ] GET /api/posts/drafts - 임시 저장 포스트 목록 조회
- [ ] GET /api/posts/drafts/:id/restore - 임시 저장 포스트 복구
- [ ] PATCH /api/posts/:id/autosave - 포스트 자동 저장 (30초 간격)
- [ ] 자동 저장 훅 구현 (useAutosave)
- [ ] 임시 저장 목록 컴포넌트
- [ ] 복구 기능 UI
- [ ] 저장 상태 표시 컴포넌트

### 포스트 작성 플로우 개선

- [ ] 새 포스트 작성 페이지에서 포스트 ID 추적 시스템
- [ ] 임시 저장 시 기존 포스트 업데이트 (새 포스트 생성 방지)
- [ ] 포스트 작성 상태 관리 (DRAFT → 임시저장 → 발행)
- [ ] 포스트 목록에서 개별 포스트 상세보기 기능 (미리보기 또는 새창)

## 2순위: 중요 구현 과제 (2주 내)

### A. 마크다운 에디터 고도화

- [ ] 에디터 툴바 구현 (굵기, 기울임, 링크, 헤더 등)
- [ ] 키보드 단축키 지원 (Ctrl+B, Ctrl+I 등)
- [ ] 마크다운 문법 도움말
- [ ] 에디터 전체화면 모드
- [ ] 폰트 크기 조절 기능

### B. 일괄 작업 시스템

- [ ] DELETE /api/posts/batch - 포스트 일괄 삭제
- [ ] PATCH /api/posts/batch-status - 포스트 상태 일괄 변경
- [ ] 체크박스 선택 시스템
- [ ] 일괄 작업 툴바
- [ ] 확인 모달 컴포넌트
- [ ] 선택된 항목 카운터

### C. 사용자 경험 개선

- [ ] 토스트 알림 시스템 (성공/오류 메시지)
- [ ] 폼 데이터 변경 감지 (페이지 이탈 경고)
- [ ] 로딩 스켈레톤 UI
- [ ] 포스트 미리보기 모달
- [ ] 카테고리 즉석 생성 기능 - 포스트 작성 중 카테고리/서브카테고리 즉석 생성 모달

## 3순위: 유용한 확장 과제 (1개월 내)

### A. 이미지 업로드 시스템

- [ ] POST /api/upload/image - 이미지 업로드
- [ ] DELETE /api/upload/image/:id - 이미지 삭제
- [ ] GET /api/upload/images - 이미지 목록 조회
- [ ] 드래그 앤 드롭 이미지 업로드
- [ ] 이미지 미리보기
- [ ] 이미지 갤러리 모달
- [ ] 에디터 내 이미지 삽입
- [ ] 이미지 크기 조절

### B. 관련 포스트 추천 시스템

- [ ] GET /api/posts/:id/related - 관련 포스트 추천 API
- [ ] 카테고리/해시태그 기반 추천 알고리즘
- [ ] 추천 포스트 UI 컴포넌트

### C. 통계 및 분석 기능

- [ ] 포스트별 조회수/좋아요 통계 페이지
- [ ] 카테고리별 인기도 분석
- [ ] 월별/일별 방문자 통계
- [ ] 어드민 대시보드 차트 구현

## 4순위: 개선 및 최적화 과제 (필요시)

### A. 정렬 및 필터 옵션 확장

- [ ] 포스트 목록 다중 정렬 (최신순, 인기순, 조회수순)
- [ ] 날짜 범위 필터링
- [ ] 고급 검색 기능 (제목, 내용, 작성자 등)

### B. 예약 발행 시스템

- [ ] 예약 발행 API
- [ ] 예약 발행 목록 관리
- [ ] 크론 작업 설정

### C. 공개 블로그 페이지

- [ ] 홈페이지 (/) - 최신 포스트 목록
- [ ] 포스트 상세 페이지 (/posts/[id])
- [ ] 카테고리별 포스트 목록
- [ ] 검색 페이지
- [ ] SEO 최적화

## 🛠 기술적 고려사항

- [ ] 이미지 최적화 및 CDN 연동
- [ ] API 응답 캐싱 전략
- [ ] 데이터베이스 쿼리 최적화
- [ ] 번들 크기 최적화
- [ ] 파일 업로드 보안 (파일 타입, 크기 제한)
- [ ] API 요청 제한 (Rate Limiting)
- [ ] XSS 방지 (마크다운 렌더링 시)
- [ ] CSRF 토큰 강화

## 🎯 다음 스프린트 계획

- [ ] 임시 저장 시스템 API 4개 구현
- [ ] 자동 저장 훅 및 UI 구현
- [ ] 마크다운 에디터 툴바 구현
- [ ] 일괄 작업 시스템 구현
- [ ] 토스트 알림 시스템
- [ ] 이미지 업로드 기본 기능
- [ ] 공개 블로그 페이지 기본 구조
- [ ] 통계 기능 기초
- [ ] 성능 최적화
