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

- [x] Prisma 스키마 설계 (User, Post, Category, Hashtag 등)
- [x] 데이터베이스 연결 및 마이그레이션
- [x] Prisma Client 생성 및 설정
- [x] API 라우트 기본 구조 생성
- [x] 환경 변수 설정 (.env.local)

#### 인증 시스템 구현

- [x] JWT 유틸리티 함수 구현 (/app/api/\_libs/tools/jwt.ts)
- [x] bcrypt 비밀번호 해싱 구현 (/app/api/\_libs/tools/bcrypt.ts)
- [ ] 사용자 회원가입 API (POST /api/auth/sign_up)
- [ ] 사용자 로그인 API (POST /api/auth/sign_in)
- [ ] 로그아웃 API (POST /api/auth/sign_out)
- [ ] 토큰 갱신 & 검증 API (POST/GET /api/auth/refresh)
- [x] 세션 조회 API (GET /api/auth/session)
- [x] 인증 미들웨어 구현 (/app/api/\_libs/middleware/auth.ts)
- [x] HTTP-only 쿠키 설정
- [x] User 전용 타입 정의 구현

##### Frontend Hooks 구현

- [x] useSignUp - 회원가입
- [x] useSignIn - 로그인
- [x] useSignOut - 로그아웃
- [x] useRefresh - 토큰 리프레시
- [x] useGetSession - 세션 조회

#### 보안 설정

- [ ] CORS 설정
- [ ] CSRF 보호 구현
- [ ] XSS 방지 설정
- [ ] API 요청 유효성 검사

#### 공통 상태 관리

- [x] useLoading - 로딩 상태 관리
- [x] useDone - 완료 상태 관리

### 📝 2단계: 콘텐츠 관리 시스템 (3주)

#### 블로그 포스트 CRUD

##### Backend API 구현

- [ ] GET /api/posts - 포스트 목록 조회
- [ ] GET /api/posts/:id - 포스트 상세 조회
- [ ] POST /api/posts - 포스트 작성
- [ ] PUT /api/posts/:id - 포스트 수정
- [ ] DELETE /api/posts/:id - 포스트 삭제
- [ ] GET /api/posts/search - 포스트 검색
- [ ] PATCH /api/posts/:id/publish - 포스트 발행/취소
- [ ] PATCH /api/posts/:id/views - 포스트 조회수 증가
- [ ] PATCH /api/posts/:id/likes - 포스트 좋아요 증가
- [ ] GET /api/posts/:id/views - 포스트별 조회 이력 조회
- [ ] GET /api/posts/:id/likes - 포스트별 좋아요 이력 조회
- [ ] POST/DELETE /api/posts/:id/like - 포스트별 좋아요 추가/취소
- [ ] POST /api/posts/draft - 포스트 임시 저장
- [ ] GET /api/posts/drafts - 임시 저장 포스트 조회
- [ ] GET /api/posts/drafts/:id/restore - 임시 저장 포스트 복구
- [ ] PATCH /api/posts/:id/autosave - 포스트 자동 저장
- [ ] PATCH /api/posts/batch-status - 포스트 상태 일괄 변경
- [ ] DELETE /api/posts/batch - 포스트 일괄(선택) 삭제
- [ ] GET /api/posts/:id/related - 관련 포스트 추천

##### Frontend Hooks 구현

- [x] useGetPosts - 포스트 목록 조회
- [x] useGetPost - 포스트 상세 조회
- [x] useCreatePost - 포스트 작성
- [x] useUpdatePost - 포스트 수정
- [x] useDeletePost - 포스트 삭제
- [x] useSearchPosts - 포스트 검색
- [x] usePublishPost - 포스트 발행/취소
- [x] usePostViews - 포스트 조회수 관련
- [x] usePostLikes - 포스트 좋아요 관련
- [x] useDraftPost - 임시 저장
- [x] useAutosavePost - 자동 저장
- [x] useBatchPosts - 일괄 작업
- [x] useRelatedPosts - 관련 포스트

##### UI 구현

- [ ] 포스트 목록 페이지 (/admin/posts)
- [ ] 포스트 작성 페이지 (/admin/posts/new)
- [ ] 포스트 수정 페이지 (/admin/posts/[id]/edit)
- [ ] 포스트 상세 보기 모달/페이지
- [ ] 포스트 검색 컴포넌트
- [ ] 포스트 상태 변경 UI
- [ ] 조회수/좋아요 표시 UI
- [ ] 임시 저장 목록 UI
- [ ] 자동 저장 상태 표시
- [ ] 일괄 작업 UI (체크박스, 툴바)
- [ ] 관련 포스트 표시 UI

#### 카테고리 관리 시스템

##### Backend API 구현

- [ ] GET /api/categories - 카테고리 목록 조회
- [ ] POST /api/categories - 카테고리 생성
- [ ] PUT /api/categories/:id - 카테고리 수정
- [ ] DELETE /api/categories/:id - 카테고리 삭제
- [ ] GET /api/categories/:id/posts - 카테고리별 포스트 목록

##### Frontend Hooks 구현

- [x] useGetCategories - 카테고리 목록 조회
- [x] useCreateCategory - 카테고리 생성
- [x] useUpdateCategory - 카테고리 수정
- [x] useDeleteCategory - 카테고리 삭제
- [x] useGetCategoryPosts - 카테고리별 포스트

##### UI 구현

- [ ] 카테고리 관리 페이지 (/admin/categories)
- [ ] 카테고리 생성/수정 모달
- [ ] 카테고리 목록 컴포넌트
- [ ] 카테고리 선택 드롭다운
- [ ] 즉석 카테고리 생성 UI

#### 서브카테고리 관리 시스템

##### Backend API 구현

- [ ] GET /api/subcategories - 서브카테고리 목록 조회
- [ ] POST /api/subcategories - 서브카테고리 생성
- [ ] PUT /api/subcategories/:id - 서브카테고리 수정
- [ ] DELETE /api/subcategories/:id - 서브카테고리 삭제
- [ ] GET /api/subcategories/:id/posts - 서브카테고리별 포스트 목록

##### Frontend Hooks 구현

- [x] useGetSubcategories - 서브카테고리 목록 조회
- [x] useCreateSubcategory - 서브카테고리 생성
- [x] useUpdateSubcategory - 서브카테고리 수정
- [x] useDeleteSubcategory - 서브카테고리 삭제
- [x] useGetSubcategoryPosts - 서브카테고리별 포스트

##### UI 구현

- [ ] 서브카테고리 관리 페이지 (/admin/subcategories)
- [ ] 서브카테고리 생성/수정 모달
- [ ] 서브카테고리 목록 컴포넌트
- [ ] 서브카테고리 선택 드롭다운
- [ ] 즉석 서브카테고리 생성 UI

#### 해시태그 시스템

##### Backend API 구현

- [ ] GET /api/hashtags - 해시태그 목록 조회
- [ ] POST /api/hashtags - 해시태그 생성
- [ ] PUT /api/hashtags/:id - 해시태그 수정
- [ ] DELETE /api/hashtags/:id - 해시태그 삭제
- [ ] GET /api/hashtags/:id/posts - 해시태그별 포스트 목록
- [ ] GET /api/hashtags/autocomplete - 해시태그 자동완성

##### Frontend Hooks 구현

- [x] useGetHashtags - 해시태그 목록 조회
- [x] useCreateHashtag - 해시태그 생성
- [x] useUpdateHashtag - 해시태그 수정
- [x] useDeleteHashtag - 해시태그 삭제
- [x] useGetHashtagPosts - 해시태그별 포스트
- [x] useHashtagAutocomplete - 해시태그 자동완성

##### UI 구현

- [ ] 해시태그 관리 페이지 (/admin/hashtags)
- [ ] 해시태그 생성/수정 모달
- [ ] 해시태그 목록 컴포넌트
- [ ] 해시태그 입력 필드 (자동완성)
- [ ] 해시태그 배지 컴포넌트

#### 관리자 관리 시스템

##### Backend API 구현

- [ ] GET /api/users - 관리자 목록 조회
- [ ] GET /api/users/:id - 관리자 상세 조회
- [ ] GET /api/users/email/:email - 이메일로 관리자 조회
- [ ] GET /api/users/name/:name - 관리자명으로 관리자 조회
- [ ] POST /api/users - 관리자 생성
- [ ] PUT /api/users/:id - 관리자 정보 수정
- [ ] PUT /api/users/:id/password - 관리자 비밀번호 수정
- [ ] PUT /api/users/:id/image - 관리자 이미지 수정
- [ ] DELETE /api/users/:id - 관리자 삭제
- [ ] DELETE /api/users - 관리자 일괄 삭제

##### Frontend Hooks 구현

- [x] useGetUsers - 관리자 목록 조회
- [x] useGetUserById - 관리자 상세 조회
- [x] useGetUserByEmail - 이메일로 관리자 조회
- [x] useGetUserByUsername - 관리자명으로 관리자 조회
- [x] useCreateUser - 관리자 생성
- [x] useUpdateUser - 관리자 정보 수정
- [x] useUpdateUserPassword - 관리자 비밀번호 수정
- [x] useUpdateUserImage - 관리자 이미지 수정
- [x] useDeleteUser - 관리자 삭제
- [x] useDeleteUsers - 관리자 일괄 삭제
- [x] useUserSession - 관리자 세션 관리
- [x] useUserActions - 관리자 액션 관리

##### UI 구현

- [ ] 관리자 목록 페이지 (/admin/users)
- [ ] 관리자 상세 페이지 (/admin/users/[id])
- [ ] 관리자 생성 모달
- [ ] 관리자 수정 모달
- [ ] 관리자 삭제 확인 모달
- [ ] 관리자 일괄 삭제 UI
- [ ] 관리자 검색 필터
- [ ] 관리자 권한 관리 UI
- [ ] 관리자 상태 표시 UI
- [ ] 관리자 프로필 이미지 업로드 UI

#### 댓글 시스템 구현

##### Backend API 구현

- [ ] GET /api/comments - 댓글 목록 조회
- [ ] GET /api/comments/:id - 댓글 상세 조회
- [ ] GET /api/comments/post/:postId - 포스트별 댓글 목록
- [ ] POST /api/comments - 댓글 작성 (방문자)
- [ ] POST /api/comments/:id/reply - 댓글 답글 작성 (관리자)
- [ ] PUT /api/comments/:id - 댓글 수정 (관리자)
- [ ] DELETE /api/comments/:id - 댓글 삭제 (관리자)
- [ ] PATCH /api/comments/:id/approve - 댓글 승인/거부
- [ ] POST /api/comments/verify - 댓글 작성자 인증 (비밀번호 확인)

##### Frontend Hooks 구현

- [ ] useGetComments - 댓글 목록 조회
- [ ] useGetComment - 댓글 상세 조회
- [ ] useGetPostComments - 포스트별 댓글 목록
- [ ] useCreateComment - 댓글 작성
- [ ] useReplyComment - 댓글 답글 작성
- [ ] useUpdateComment - 댓글 수정
- [ ] useDeleteComment - 댓글 삭제
- [ ] useApproveComment - 댓글 승인/거부
- [ ] useVerifyComment - 댓글 작성자 인증

##### UI 구현

- [ ] 댓글 목록 컴포넌트 (공개 페이지)
- [ ] 댓글 작성 폼 (이메일, 닉네임, 비밀번호, 내용)
- [ ] 댓글 답글 컴포넌트 (2단계 구조)
- [ ] 댓글 관리 페이지 (/admin/comments)
- [ ] 댓글 승인/거부 UI
- [ ] 댓글 검색 및 필터링
- [ ] 댓글 일괄 작업 UI
- [ ] 이메일 알림 설정 UI

##### 이메일 알림 시스템

- [ ] Nodemailer 설정 및 구성
- [ ] 댓글 작성 시 관리자 알림 이메일
- [ ] 답글 작성 시 원댓글 작성자 알림 이메일
- [ ] 이메일 템플릿 구성 (HTML/텍스트)
- [ ] 이메일 발송 큐 시스템 (선택사항)
- [ ] 이메일 발송 로그 및 실패 처리

#### 마크다운 에디터 구현

##### Backend API 구현

- [ ] POST /api/upload/image - 이미지 업로드
- [ ] DELETE /api/upload/image/:id - 이미지 삭제
- [ ] GET /api/upload/images - 이미지 목록 조회

##### Frontend Hooks 구현

- [ ] useUploadImage - 이미지 업로드
- [ ] useDeleteImage - 이미지 삭제
- [ ] useGetImages - 이미지 목록 조회
- [ ] useMarkdownEditor - 에디터 상태 관리
- [ ] useAutosave - 자동 저장

##### UI 구현

- [ ] 마크다운 에디터 컴포넌트 (shadcn/ui 기반)
- [ ] 실시간 프리뷰 기능
- [ ] 미리보기 버튼 OFF/ON 표시 개선
- [ ] 탭 키 들여쓰기 기능 (스페이스 2칸)
- [ ] 이미지 업로드 UI
- [ ] 드래그 앤 드롭 이미지 업로드
- [ ] 이미지 갤러리 모달
- [ ] 에디터 툴바
- [ ] 마크다운 렌더링 최적화

#### 어드민 대시보드

##### Backend API 구현

- [ ] GET /api/admin/stats - 전체 통계 데이터
- [ ] GET /api/admin/posts/stats - 포스트 통계
- [ ] GET /api/admin/views/stats - 조회수 통계
- [ ] GET /api/admin/likes/stats - 좋아요 통계
- [ ] GET /api/admin/categories/stats - 카테고리별 통계
- [ ] GET /api/admin/comments/stats - 댓글 통계
- [ ] GET /api/admin/backup - 데이터 백업
- [ ] POST /api/admin/restore - 데이터 복원

##### Frontend Hooks 구현

- [ ] useAdminStats - 전체 통계
- [ ] usePostStats - 포스트 통계
- [ ] useViewStats - 조회수 통계
- [ ] useLikeStats - 좋아요 통계
- [ ] useCategoryStats - 카테고리 통계
- [ ] useCommentStats - 댓글 통계
- [ ] useBackup - 백업/복원

##### UI 구현

- [ ] 어드민 대시보드 (/admin)
- [ ] 통계 차트 컴포넌트
- [ ] 포스트 통계 페이지 (/admin/analytics)
- [ ] 댓글 통계 및 관리
- [ ] 백업 및 복원 페이지 (/admin/backup)
- [ ] 블로그 설정 페이지 (/admin/settings)

### 🌐 3단계: 공개 블로그 및 보안 (2주)

#### 공개 블로그 페이지

##### Backend API 구현

- [ ] GET /api/blog - 블로그 메인 데이터
- [ ] GET /api/blog/posts - 공개 포스트 목록
- [ ] GET /api/blog/posts/:id - 공개 포스트 상세
- [ ] GET /api/blog/categories - 공개 카테고리 목록
- [ ] GET /api/blog/search - 블로그 검색
- [ ] GET /api/blog/about - 블로그 소개 데이터

##### Frontend Hooks 구현

- [ ] useBlogMain - 블로그 메인
- [ ] useBlogPosts - 공개 포스트 목록
- [ ] useBlogPost - 공개 포스트 상세
- [ ] useBlogCategories - 공개 카테고리
- [ ] useBlogSearch - 블로그 검색
- [ ] useBlogAbout - 블로그 소개

##### UI 구현

- [ ] 홈페이지 (/) - 최신 포스트 목록
- [ ] 전체 포스트 목록 페이지 (/posts)
- [ ] 개별 포스트 상세 페이지 (/posts/[id])
- [ ] 카테고리 목록 페이지 (/categories)
- [ ] 카테고리별 포스트 목록 (/categories/[category])
- [ ] 블로그 검색 페이지 (/search)
- [ ] 블로그 소개 페이지 (/about)
- [ ] Header 컴포넌트
- [ ] Footer 컴포넌트
- [ ] Navigation 컴포넌트
- [ ] 포스트 카드 컴포넌트

#### 보안 설정

##### Backend 구현

- [ ] CORS 설정
- [ ] CSRF 보호 구현
- [ ] XSS 방지 설정
- [ ] Rate Limiting 구현
- [ ] API 요청 유효성 검사
- [ ] 파일 업로드 보안
- [ ] 에러 로깅 시스템
- [ ] 댓글 스팸 방지 시스템
- [ ] 이메일 발송 보안 및 제한

##### Frontend 구현

- [ ] CSRF 토큰 처리
- [ ] XSS 방지 (입력 검증)
- [ ] 인증 상태 관리
- [ ] 에러 처리 및 사용자 피드백
- [ ] 보안 헤더 설정

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

- [ ] 이메일 뉴스레터 구독
- [ ] Google Analytics 연동
- [ ] 방문자 통계 대시보드
- [ ] 소셜 미디어 연동
- [ ] 다국어 지원 (i18n)
- [ ] 댓글 알림 시스템 고도화
- [ ] 댓글 좋아요/싫어요 기능
- [ ] 댓글 신고 시스템

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

### A. 인증 시스템 API 구현

- [ ] POST /api/auth/sign_up - 회원가입
- [ ] POST /api/auth/sign_in - 로그인
- [ ] POST /api/auth/sign_out - 로그아웃
- [ ] POST /api/auth/refresh - 토큰 리프레시

### B. 핵심 API 구현

- [ ] 모든 엔티티의 백엔드 API 구현 (posts, categories, subcategories, hashtags, users)
- [ ] 임시 저장 시스템 API 구현
- [ ] 일괄 작업 시스템 API 구현

## 2순위: 중요 구현 과제 (2주 내)

### A. 댓글 시스템 구현

- [ ] 댓글 데이터베이스 스키마 설계 (Comment, CommentReply 테이블)
- [ ] 댓글 백엔드 API 구현 (CRUD, 승인, 인증)
- [ ] 댓글 프론트엔드 훅 구현
- [ ] 댓글 UI 컴포넌트 구현
- [ ] 이메일 알림 시스템 구현 (Nodemailer)
- [ ] 댓글 관리자 페이지 구현

### B. 마크다운 에디터 고도화

- [ ] 에디터 툴바 구현 (굵기, 기울임, 링크, 헤더 등)
- [ ] 키보드 단축키 지원 (Ctrl+B, Ctrl+I 등)
- [ ] 마크다운 문법 도움말
- [ ] 에디터 전체화면 모드
- [ ] 폰트 크기 조절 기능

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
- [ ] 댓글 통계 및 분석
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
- [ ] 댓글 스팸 방지 시스템
- [ ] 이메일 발송 보안 및 제한

## 🎯 다음 스프린트 계획

- [ ] 인증 시스템 API 4개 구현
- [ ] 핵심 엔티티 API 구현 완료
- [ ] 댓글 시스템 설계 및 구현 시작
- [ ] 마크다운 에디터 툴바 구현
- [ ] 일괄 작업 시스템 구현
- [ ] 토스트 알림 시스템
- [ ] 이미지 업로드 기본 기능
- [ ] 공개 블로그 페이지 기본 구조
- [ ] 통계 기능 기초
- [ ] 성능 최적화

## 📁 페이지 라우트 구조

### (admin) 어드민 라우트

| 경로                     | 설명                  |
| ------------------------ | --------------------- |
| `/admin`                 | 어드민 대시보드(메인) |
| `/admin/posts`           | 포스트 목록/관리      |
| `/admin/posts/new`       | 새 포스트 작성        |
| `/admin/posts/[id]/edit` | 포스트 수정           |
| `/admin/posts/drafts`    | 임시 저장 포스트 목록 |
| `/admin/categories`      | 카테고리 관리         |
| `/admin/subcategories`   | 서브카테고리 관리     |
| `/admin/hashtags`        | 해시태그 관리         |
| `/admin/comments`        | 댓글 관리             |
| `/admin/profile`         | 사용자 프로필 관리    |
| `/admin/settings`        | 블로그 설정           |
| `/admin/analytics`       | 통계/분석             |
| `/admin/backup`          | 백업 및 복원          |

### (auth) 인증 라우트

| 경로           | 설명            |
| -------------- | --------------- |
| `/auth/signin` | 로그인 페이지   |
| `/auth/signup` | 회원가입 페이지 |

### (common) 공개 블로그 라우트

| 경로                     | 설명                        |
| ------------------------ | --------------------------- |
| `/`                      | 블로그 홈(최신 포스트 목록) |
| `/posts`                 | 전체 포스트 목록            |
| `/posts/[id]`            | 포스트 상세                 |
| `/categories`            | 카테고리 목록               |
| `/categories/[category]` | 카테고리별 포스트 목록      |
| `/search`                | 블로그 검색                 |
| `/about`                 | 블로그 소개                 |

---

### 📄 라우트 구조 설명

- **(admin)**
  블로그 관리 기능(포스트, 카테고리, 해시태그, 댓글, 통계, 설정 등)을 위한 어드민 전용 라우트 그룹입니다.
  모든 경로는 `/admin` 하위에 위치하며, 인증된 사용자만 접근 가능합니다.

- **(auth)**
  인증(로그인/회원가입 등) 관련 라우트 그룹입니다. (예: `/auth/signin`, `/auth/signup`)

- **(common)**
  일반 사용자를 위한 공개 블로그 페이지입니다.
  포스트, 카테고리, 검색, 소개 등 방문자가 접근 가능한 모든 페이지가 포함됩니다.

---
