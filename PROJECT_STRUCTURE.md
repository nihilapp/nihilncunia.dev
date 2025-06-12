# 프로젝트 DB 및 라우트 구조 정리

---

## 1. 데이터베이스(DB) 구조

### 주요 테이블 및 관계

- **User**

  - 사용자 정보 (이름, 이메일 등)

- **UserAuth**

  - 사용자 인증 정보 (해시된 비밀번호, 리프레시 토큰 등)

- **Post**

  - 블로그 포스트(제목, 내용, 상태, 작성자, 카테고리, 서브카테고리, 해시태그 등)

- **Category**

  - 카테고리(이름, 설명 등)

- **Subcategory**

  - 서브카테고리(이름, 설명, 상위 카테고리)

- **Hashtag**

  - 해시태그(이름)

- **PostHashtag**
  - 포스트-해시태그 연결 테이블

#### 테이블 관계

- Post ↔ Category: 다대일(Many-to-One)
- Post ↔ Subcategory: 다대일(Many-to-One, 선택적)
- Subcategory ↔ Category: 다대일(Many-to-One)
- Post ↔ Hashtag: 다대다(Many-to-Many, PostHashtag 중간 테이블)
- User ↔ UserAuth: 일대일(One-to-One)
- Post ↔ User: 다대일(Many-to-One, 작성자)

---

## 2. 라우트 구조 및 기능

### 1) 공통 페이지 (app/(common)/)

- `/` : 홈페이지(최신 포스트 목록, 블로그 소개)
- `/posts` : 전체 블로그 포스트 목록
- `/posts/[id]` : 개별 블로그 포스트 상세 페이지
- `/categories` : 카테고리 목록 페이지
- `/categories/[category]` : 카테고리별 포스트 목록
- `/search` : 블로그 검색 페이지
- `/about` : 블로그 소개 페이지

---

### 2) 유저(관리자) 페이지 (app/(admin)/) - 사용자 전용

- `/admin` : 대시보드(통계, 요약 등)
- `/admin/posts` : 포스트 관리(목록, 일괄 작업, 삭제 등)
- `/admin/posts/new` : 새 포스트 작성 페이지
- `/admin/posts/[id]/edit` : 포스트 수정 페이지
- `/admin/categories` : 카테고리 관리 페이지
- `/admin/subcategories` : 서브카테고리 관리 페이지
- `/admin/hashtags` : 해시태그 관리 페이지
- `/admin/profile` : 사용자 프로필 관리 페이지
- `/admin/settings` : 블로그 설정 페이지

---

### 3) 인증 관련 페이지 (app/(auth)/) - 사용자 전용

- `/auth/sign-in` : 로그인 페이지

---

### 4) API 라우트 (app/api/)

#### 인증 관련

- `/api/auth/sign-in` (POST) : 로그인
- `/api/auth/sign-out` (POST) : 로그아웃
- `/api/auth/refresh` (POST) : 리프레시 토큰 갱신
- `/api/auth/verify` (GET) : 토큰 검증

#### 사용자 관련

- `/api/admin/profile` (GET) : 사용자 정보 조회
- `/api/admin/profile` (PUT) : 사용자 정보 수정
- `/api/admin/password` (PUT) : 사용자 비밀번호 변경

#### 블로그 포스트 관련

- `/api/posts` (GET) : 모든 포스트 조회
- `/api/posts/:id` (GET) : 포스트 상세 조회
- `/api/posts/slug/:slug` (GET) : 포스트 slug로 조회
- `/api/posts` (POST) : 포스트 작성(사용자)
- `/api/posts/:id` (PUT) : 포스트 수정(사용자)
- `/api/posts/:id` (DELETE) : 포스트 삭제(사용자)
- `/api/posts/search` (GET) : 포스트 검색(제목/내용 등)
- `/api/posts/:id/publish` (PATCH) : 포스트 발행/취소(사용자)
- `/api/posts/:id/views` (PATCH) : 포스트 조회수 증가
- `/api/posts/:id/likes` (PATCH) : 포스트 좋아요 증가
- `/api/posts?category=카테고리` (GET) : 카테고리별 포스트 조회
- `/api/posts?subcategory=서브카테고리` (GET) : 서브카테고리별 포스트 조회
- `/api/posts/draft` (POST) : 포스트 임시 저장(사용자)
- `/api/posts/drafts` (GET) : 임시 저장 포스트 목록(사용자)
- `/api/posts/drafts/:id/restore` (GET) : 임시 저장 포스트 복구(사용자)
- `/api/posts/:id/autosave` (PATCH) : 포스트 자동 저장(사용자)
- `/api/posts/batch` (DELETE) : 포스트 일괄 삭제(사용자)
- `/api/posts/batch-status` (PATCH) : 포스트 상태 일괄 변경(사용자)
- `/api/posts/:id/related` (GET) : 관련 포스트 추천(카테고리/해시태그 기반)

#### 카테고리 관련

- `/api/categories` (GET) : 모든 카테고리 조회
- `/api/categories` (POST) : 카테고리 생성(사용자)
- `/api/categories/:id` (PUT) : 카테고리 수정(사용자)
- `/api/categories/:id` (DELETE) : 카테고리 삭제(사용자)

#### 서브카테고리 관련

- `/api/subcategories` (GET) : 모든 서브카테고리 조회
- `/api/subcategories?category_id=카테고리ID` (GET) : 카테고리별 서브카테고리 조회
- `/api/subcategories` (POST) : 서브카테고리 생성(사용자)
- `/api/subcategories/:id` (PUT) : 서브카테고리 수정(사용자)
- `/api/subcategories/:id` (DELETE) : 서브카테고리 삭제(사용자)

#### 해시태그 관련

- `/api/hashtags` (GET) : 모든 해시태그 조회
- `/api/hashtags` (POST) : 해시태그 생성(사용자)
- `/api/hashtags/:id` (PUT) : 해시태그 수정(사용자)
- `/api/hashtags/:id` (DELETE) : 해시태그 삭제(사용자)
- `/api/posts?hashtag=태그명` (GET) : 해시태그별 포스트 조회

#### 파일 업로드(예정)

- `/api/upload/image` (POST) : 이미지 업로드
- `/api/upload/image/:id` (DELETE) : 이미지 삭제
- `/api/upload/images` (GET) : 이미지 목록 조회

#### SEO 관련

- `/api/sitemap.xml` (GET) : 사이트맵 생성
- `/api/rss.xml` (GET) : RSS 피드

---

## 3. 각 라우트별 주요 기능 요약

- 공개 라우트: 블로그 포스트 열람, 카테고리/해시태그별 필터, 검색, 소개 등
- 사용자(관리자) 라우트: 포스트/카테고리/서브카테고리/해시태그 CRUD, 임시 저장, 일괄 작업, 사용자 정보 관리, 블로그 설정 등
- API 라우트: 프론트엔드와의 데이터 통신, 인증, 보안, CRUD, 임시 저장, 자동 저장, 일괄 작업, 이미지 업로드, SEO 등

---

> 궁금한 점이 있으면 추가로 질문해 주세요!
> (특정 라우트의 상세 동작, DB 필드, API 응답 구조 등도 안내 가능합니다.)
