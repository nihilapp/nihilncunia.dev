# API 개발 체크 리스트

본 문서는 블로그 매니지먼트 시스템 프로젝트에서 사용될 주요 API들과 그 기능을 정리한 것입니다. Next.js App Router의 파일 기반 라우팅 시스템을 사용하여 구현됩니다.

---

## 📌 플랫폼 관리 API (Platform Management)

### 1. 인증(Auth) API

| 상태 | 메서드 | 엔드포인트                      | 설명                                                                   |
| ---- | ------ | ------------------------------- | ---------------------------------------------------------------------- |
| [x]  | POST   | `app/api/auth/sign-up/route.ts` | 새로운 관리자를 생성합니다. (요청 데이터: `email`, `name`, `password`) |

> **참고**: NextAuth 사용으로 다음 기능들은 자동 제공됩니다:
>
> - 로그인: NextAuth의 signIn 함수 및 내장 API 사용
> - 로그아웃: NextAuth의 signOut 함수 및 내장 API 사용
> - 세션 조회: NextAuth의 auth 함수 사용
> - 토큰 갱신: JWT callback에서 자동 처리

### 2. 사용자(User) API

| 상태 | 메서드 | 엔드포인트                                   | 설명                                                                         |
| ---- | ------ | -------------------------------------------- | ---------------------------------------------------------------------------- |
| [x]  | GET    | `app/api/users/route.ts`                     | 관리자 목록을 조회합니다.                                                    |
| [x]  | GET    | `app/api/users/[id]/route.ts`                | 특정 관리자의 상세 정보를 가져옵니다.                                        |
| [x]  | GET    | `app/api/users/email/[email]/route.ts`       | 이메일로 관리자를 검색합니다.                                                |
| [ ]  | GET    | `app/api/users/username/[username]/route.ts` | 사용자명으로 관리자를 검색합니다.                                            |
| [x]  | POST   | `app/api/users/route.ts`                     | 관리자를 새로 생성합니다. (요청 데이터: `email`, `name`, `role`, `password`) |
| [x]  | PUT    | `app/api/users/[id]/route.ts`                | 관리자 기본 정보를 수정합니다.                                               |
| [ ]  | PUT    | `app/api/users/[id]/password/route.ts`       | 관리자 비밀번호를 변경합니다.                                                |
| [ ]  | PUT    | `app/api/users/[id]/image/route.ts`          | 프로필 이미지를 수정합니다.                                                  |
| [x]  | DELETE | `app/api/users/[id]/route.ts`                | 관리자를 삭제합니다.                                                         |
| [x]  | DELETE | `app/api/users/route.ts`                     | 여러 관리자를 한 번에 삭제합니다. (요청 데이터: `ids` 배열)                  |

### 3. 블로그(Blog) API

| 상태 | 메서드 | 엔드포인트                                 | 설명                                                                                               |
| ---- | ------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| [ ]  | GET    | `app/api/blogs/route.ts`                   | 내 블로그 목록을 조회합니다.                                                                       |
| [ ]  | GET    | `app/api/blogs/[slug]/route.ts`            | 특정 블로그 상세 정보를 조회합니다.                                                                |
| [ ]  | POST   | `app/api/blogs/route.ts`                   | 새 블로그를 생성합니다. (요청 데이터: `name`, `title`, `description`, `slug`, `theme`, `settings`) |
| [ ]  | PUT    | `app/api/blogs/[slug]/route.ts`            | 블로그 정보를 수정합니다.                                                                          |
| [ ]  | DELETE | `app/api/blogs/[slug]/route.ts`            | 블로그를 삭제합니다.                                                                               |
| [ ]  | PATCH  | `app/api/blogs/[slug]/status/route.ts`     | 블로그 활성화/비활성화를 변경합니다.                                                               |
| [ ]  | PATCH  | `app/api/blogs/[slug]/visibility/route.ts` | 블로그 공개/비공개를 변경합니다.                                                                   |

### 4. 플랫폼 전체 포스트 API (모든 블로그)

| 상태 | 메서드 | 엔드포인트                                   | 설명                                                 |
| ---- | ------ | -------------------------------------------- | ---------------------------------------------------- |
| [ ]  | GET    | `app/api/posts/route.ts`                     | 모든 블로그의 포스트 목록을 조회합니다.              |
| [ ]  | GET    | `app/api/posts/[id]/route.ts`                | 특정 포스트의 상세 정보를 조회합니다.                |
| [ ]  | GET    | `app/api/posts/slug/[slug]/route.ts`         | 슬러그로 포스트를 조회합니다.                        |
| [ ]  | POST   | `app/api/posts/route.ts`                     | 새 포스트를 작성합니다. (카테고리, 해시태그 등 포함) |
| [ ]  | PUT    | `app/api/posts/[id]/route.ts`                | 기존 포스트를 수정합니다.                            |
| [ ]  | DELETE | `app/api/posts/[id]/route.ts`                | 포스트를 삭제합니다.                                 |
| [ ]  | GET    | `app/api/posts/search/route.ts`              | 키워드로 포스트를 검색합니다.                        |
| [ ]  | PATCH  | `app/api/posts/[id]/publish/route.ts`        | 포스트의 공개 상태를 변경합니다.                     |
| [ ]  | PATCH  | `app/api/posts/[id]/views/route.ts`          | 조회수를 증가시키고 조회 이력을 저장합니다.          |
| [ ]  | PATCH  | `app/api/posts/[id]/likes/route.ts`          | 좋아요 수를 증가시킵니다.                            |
| [ ]  | POST   | `app/api/posts/[id]/like/route.ts`           | 사용자의 좋아요 추가를 처리합니다.                   |
| [ ]  | DELETE | `app/api/posts/[id]/like/route.ts`           | 사용자의 좋아요 취소를 처리합니다.                   |
| [ ]  | GET    | `app/api/posts/[id]/views/route.ts`          | 특정 포스트의 조회 이력을 조회합니다.                |
| [ ]  | GET    | `app/api/posts/[id]/likes/route.ts`          | 특정 포스트의 좋아요 이력을 조회합니다.              |
| [ ]  | POST   | `app/api/posts/[id]/view/route.ts`           | 포스트 조회수를 증가시키고 조회 기록을 저장합니다.   |
| [ ]  | POST   | `app/api/posts/draft/route.ts`               | 임시 저장용 포스트를 생성합니다.                     |
| [ ]  | GET    | `app/api/posts/drafts/route.ts`              | 임시 저장된 포스트 목록을 조회합니다.                |
| [ ]  | GET    | `app/api/posts/drafts/[id]/restore/route.ts` | 임시 저장본을 불러와 복구합니다.                     |
| [ ]  | PATCH  | `app/api/posts/[id]/autosave/route.ts`       | 작성 중인 포스트를 자동 저장합니다.                  |
| [ ]  | PATCH  | `app/api/posts/batch-status/route.ts`        | 여러 포스트의 상태를 일괄 변경합니다.                |
| [ ]  | DELETE | `app/api/posts/batch/route.ts`               | 선택한 포스트들을 한꺼번에 삭제합니다.               |
| [ ]  | GET    | `app/api/posts/[id]/related/route.ts`        | 해당 포스트와 관련된 글을 추천합니다.                |

### 5. 플랫폼 전체 카테고리 API (모든 블로그)

| 상태 | 메서드 | 엔드포인트                                  | 설명                                                                                      |
| ---- | ------ | ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [ ]  | GET    | `app/api/categories/route.ts`               | 모든 블로그의 카테고리를 계층 구조로 조회합니다.                                          |
| [ ]  | GET    | `app/api/categories/flat/route.ts`          | 모든 블로그의 카테고리를 평면 목록으로 조회합니다.                                        |
| [ ]  | GET    | `app/api/categories/[id]/route.ts`          | 특정 카테고리 상세 정보를 조회합니다.                                                     |
| [ ]  | GET    | `app/api/categories/slug/[slug]/route.ts`   | 슬러그로 카테고리를 조회합니다.                                                           |
| [ ]  | POST   | `app/api/categories/route.ts`               | 카테고리를 생성합니다. (요청 데이터: `name`, `slug`, `description`, `parent_id`, `order`) |
| [ ]  | PUT    | `app/api/categories/[id]/route.ts`          | 카테고리 정보를 수정합니다.                                                               |
| [ ]  | PATCH  | `app/api/categories/[id]/order/route.ts`    | 카테고리 순서를 변경합니다.                                                               |
| [ ]  | PATCH  | `app/api/categories/[id]/status/route.ts`   | 카테고리 활성화/비활성화를 변경합니다.                                                    |
| [ ]  | DELETE | `app/api/categories/[id]/route.ts`          | 카테고리를 삭제합니다.                                                                    |
| [ ]  | GET    | `app/api/categories/[id]/posts/route.ts`    | 특정 카테고리에 속한 포스트 목록을 조회합니다.                                            |
| [ ]  | GET    | `app/api/categories/[id]/children/route.ts` | 특정 카테고리의 하위 카테고리를 조회합니다.                                               |

### 6. 플랫폼 전체 해시태그 API (모든 블로그)

| 상태 | 메서드 | 엔드포인트                               | 설명                                           |
| ---- | ------ | ---------------------------------------- | ---------------------------------------------- |
| [ ]  | GET    | `app/api/hashtags/route.ts`              | 모든 블로그의 해시태그를 조회합니다.           |
| [ ]  | POST   | `app/api/hashtags/route.ts`              | 해시태그를 생성합니다.                         |
| [ ]  | PUT    | `app/api/hashtags/[id]/route.ts`         | 해시태그 이름을 수정합니다.                    |
| [ ]  | DELETE | `app/api/hashtags/[id]/route.ts`         | 해시태그를 삭제합니다.                         |
| [ ]  | GET    | `app/api/hashtags/[id]/posts/route.ts`   | 해당 해시태그가 달린 포스트 목록을 조회합니다. |
| [ ]  | GET    | `app/api/hashtags/autocomplete/route.ts` | 키워드로 해시태그 자동완성 목록을 가져옵니다.  |

### 7. 플랫폼 전체 댓글 API (모든 블로그)

| 상태 | 메서드 | 엔드포인트                                | 설명                                           |
| ---- | ------ | ----------------------------------------- | ---------------------------------------------- |
| [ ]  | GET    | `app/api/comments/route.ts`               | 모든 블로그의 댓글 목록을 조회합니다.          |
| [ ]  | GET    | `app/api/comments/[id]/route.ts`          | 특정 댓글의 상세 정보를 조회합니다.            |
| [ ]  | GET    | `app/api/comments/post/[postId]/route.ts` | 포스트별 댓글 목록을 가져옵니다.               |
| [ ]  | POST   | `app/api/comments/route.ts`               | 방문자가 댓글을 작성합니다.                    |
| [ ]  | POST   | `app/api/comments/[id]/reply/route.ts`    | 관리자가 댓글에 답변을 달 때 사용합니다.       |
| [ ]  | PUT    | `app/api/comments/[id]/route.ts`          | 댓글 내용을 수정합니다.                        |
| [ ]  | DELETE | `app/api/comments/[id]/route.ts`          | 댓글을 삭제합니다.                             |
| [ ]  | PATCH  | `app/api/comments/[id]/approve/route.ts`  | 댓글 승인 또는 거부 상태를 변경합니다.         |
| [ ]  | POST   | `app/api/comments/verify/route.ts`        | 비밀번호 검증을 통해 댓글 작성자를 확인합니다. |

### 8. 플랫폼 전체 이미지 업로드 API (모든 블로그)

| 상태 | 메서드 | 엔드포인트                                    | 설명                                          |
| ---- | ------ | --------------------------------------------- | --------------------------------------------- |
| [ ]  | POST   | `app/api/upload/image/route.ts`               | 이미지를 업로드합니다.                        |
| [ ]  | GET    | `app/api/upload/images/route.ts`              | 업로드된 이미지 목록을 조회합니다.            |
| [ ]  | GET    | `app/api/upload/images/[id]/route.ts`         | 특정 이미지 상세 정보를 조회합니다.           |
| [ ]  | PUT    | `app/api/upload/images/[id]/route.ts`         | 이미지 메타데이터를 수정합니다. (alt_text 등) |
| [ ]  | DELETE | `app/api/upload/images/[id]/route.ts`         | 업로드된 이미지를 삭제합니다.                 |
| [ ]  | POST   | `app/api/upload/images/batch-delete/route.ts` | 여러 이미지를 일괄 삭제합니다.                |

---

## 📝 블로그별 관리 API (Blog-Specific Management)

### 11. 블로그별 포스트 API

| 상태 | 메서드 | 엔드포인트                                                | 설명                                             |
| ---- | ------ | --------------------------------------------------------- | ------------------------------------------------ |
| [ ]  | GET    | `app/api/blogs/[slug]/posts/route.ts`                     | 해당 블로그의 포스트 목록을 조회합니다.          |
| [ ]  | GET    | `app/api/blogs/[slug]/posts/[id]/route.ts`                | 해당 블로그의 특정 포스트를 조회합니다.          |
| [ ]  | GET    | `app/api/blogs/[slug]/posts/slug/[postSlug]/route.ts`     | 해당 블로그의 포스트를 슬러그로 조회합니다.      |
| [ ]  | POST   | `app/api/blogs/[slug]/posts/route.ts`                     | 해당 블로그에 새 포스트를 작성합니다.            |
| [ ]  | PUT    | `app/api/blogs/[slug]/posts/[id]/route.ts`                | 해당 블로그의 포스트를 수정합니다.               |
| [ ]  | DELETE | `app/api/blogs/[slug]/posts/[id]/route.ts`                | 해당 블로그의 포스트를 삭제합니다.               |
| [ ]  | GET    | `app/api/blogs/[slug]/posts/search/route.ts`              | 해당 블로그에서 포스트를 검색합니다.             |
| [ ]  | PATCH  | `app/api/blogs/[slug]/posts/[id]/publish/route.ts`        | 해당 블로그 포스트의 공개 상태를 변경합니다.     |
| [ ]  | PATCH  | `app/api/blogs/[slug]/posts/[id]/views/route.ts`          | 해당 블로그 포스트의 조회수를 증가시킵니다.      |
| [ ]  | PATCH  | `app/api/blogs/[slug]/posts/[id]/likes/route.ts`          | 해당 블로그 포스트의 좋아요 수를 증가시킵니다.   |
| [ ]  | POST   | `app/api/blogs/[slug]/posts/[id]/like/route.ts`           | 해당 블로그 포스트의 좋아요를 추가합니다.        |
| [ ]  | DELETE | `app/api/blogs/[slug]/posts/[id]/like/route.ts`           | 해당 블로그 포스트의 좋아요를 취소합니다.        |
| [ ]  | GET    | `app/api/blogs/[slug]/posts/[id]/views/route.ts`          | 해당 블로그 포스트의 조회 이력을 조회합니다.     |
| [ ]  | GET    | `app/api/blogs/[slug]/posts/[id]/likes/route.ts`          | 해당 블로그 포스트의 좋아요 이력을 조회합니다.   |
| [ ]  | POST   | `app/api/blogs/[slug]/posts/[id]/view/route.ts`           | 해당 블로그 포스트의 조회 기록을 생성합니다.     |
| [ ]  | GET    | `app/api/blogs/[slug]/posts/drafts/route.ts`              | 해당 블로그의 임시저장 포스트 목록을 조회합니다. |
| [ ]  | POST   | `app/api/blogs/[slug]/posts/draft/route.ts`               | 해당 블로그에 임시저장 포스트를 생성합니다.      |
| [ ]  | GET    | `app/api/blogs/[slug]/posts/drafts/[id]/restore/route.ts` | 해당 블로그의 임시 저장본을 복구합니다.          |
| [ ]  | PATCH  | `app/api/blogs/[slug]/posts/[id]/autosave/route.ts`       | 해당 블로그 포스트를 자동 저장합니다.            |
| [ ]  | PATCH  | `app/api/blogs/[slug]/posts/batch-status/route.ts`        | 해당 블로그 포스트 상태를 일괄 변경합니다.       |
| [ ]  | DELETE | `app/api/blogs/[slug]/posts/batch/route.ts`               | 해당 블로그 포스트를 일괄 삭제합니다.            |
| [ ]  | GET    | `app/api/blogs/[slug]/posts/[id]/related/route.ts`        | 해당 블로그의 관련 포스트를 추천합니다.          |

### 12. 블로그별 카테고리 API

| 상태 | 메서드 | 엔드포인트                                                     | 설명                                                 |
| ---- | ------ | -------------------------------------------------------------- | ---------------------------------------------------- |
| [ ]  | GET    | `app/api/blogs/[slug]/categories/route.ts`                     | 해당 블로그의 카테고리를 계층 구조로 조회합니다.     |
| [ ]  | GET    | `app/api/blogs/[slug]/categories/flat/route.ts`                | 해당 블로그의 카테고리를 평면 목록으로 조회합니다.   |
| [ ]  | GET    | `app/api/blogs/[slug]/categories/[id]/route.ts`                | 해당 블로그의 특정 카테고리를 조회합니다.            |
| [ ]  | GET    | `app/api/blogs/[slug]/categories/slug/[categorySlug]/route.ts` | 해당 블로그의 카테고리를 슬러그로 조회합니다.        |
| [ ]  | POST   | `app/api/blogs/[slug]/categories/route.ts`                     | 해당 블로그에 카테고리를 생성합니다.                 |
| [ ]  | PUT    | `app/api/blogs/[slug]/categories/[id]/route.ts`                | 해당 블로그의 카테고리를 수정합니다.                 |
| [ ]  | PATCH  | `app/api/blogs/[slug]/categories/[id]/order/route.ts`          | 해당 블로그 카테고리의 순서를 변경합니다.            |
| [ ]  | PATCH  | `app/api/blogs/[slug]/categories/[id]/status/route.ts`         | 해당 블로그 카테고리의 활성화/비활성화를 변경합니다. |
| [ ]  | DELETE | `app/api/blogs/[slug]/categories/[id]/route.ts`                | 해당 블로그의 카테고리를 삭제합니다.                 |
| [ ]  | GET    | `app/api/blogs/[slug]/categories/[id]/posts/route.ts`          | 해당 블로그 카테고리의 포스트 목록을 조회합니다.     |
| [ ]  | GET    | `app/api/blogs/[slug]/categories/[id]/children/route.ts`       | 해당 블로그 카테고리의 하위 카테고리를 조회합니다.   |

### 13. 블로그별 해시태그 API

| 상태 | 메서드 | 엔드포인트                                            | 설명                                             |
| ---- | ------ | ----------------------------------------------------- | ------------------------------------------------ |
| [ ]  | GET    | `app/api/blogs/[slug]/hashtags/route.ts`              | 해당 블로그의 해시태그를 조회합니다.             |
| [ ]  | POST   | `app/api/blogs/[slug]/hashtags/route.ts`              | 해당 블로그에 해시태그를 생성합니다.             |
| [ ]  | PUT    | `app/api/blogs/[slug]/hashtags/[id]/route.ts`         | 해당 블로그의 해시태그를 수정합니다.             |
| [ ]  | DELETE | `app/api/blogs/[slug]/hashtags/[id]/route.ts`         | 해당 블로그의 해시태그를 삭제합니다.             |
| [ ]  | GET    | `app/api/blogs/[slug]/hashtags/[id]/posts/route.ts`   | 해당 블로그 해시태그의 포스트 목록을 조회합니다. |
| [ ]  | GET    | `app/api/blogs/[slug]/hashtags/autocomplete/route.ts` | 해당 블로그의 해시태그 자동완성을 제공합니다.    |

### 14. 블로그별 댓글 API

| 상태 | 메서드 | 엔드포인트                                             | 설명                                         |
| ---- | ------ | ------------------------------------------------------ | -------------------------------------------- |
| [ ]  | GET    | `app/api/blogs/[slug]/comments/route.ts`               | 해당 블로그의 댓글 목록을 조회합니다.        |
| [ ]  | GET    | `app/api/blogs/[slug]/comments/[id]/route.ts`          | 해당 블로그의 특정 댓글을 조회합니다.        |
| [ ]  | GET    | `app/api/blogs/[slug]/comments/post/[postId]/route.ts` | 해당 블로그 포스트의 댓글 목록을 조회합니다. |
| [ ]  | POST   | `app/api/blogs/[slug]/comments/route.ts`               | 해당 블로그에 댓글을 작성합니다.             |
| [ ]  | POST   | `app/api/blogs/[slug]/comments/[id]/reply/route.ts`    | 해당 블로그 댓글에 답글을 작성합니다.        |
| [ ]  | PUT    | `app/api/blogs/[slug]/comments/[id]/route.ts`          | 해당 블로그의 댓글을 수정합니다.             |
| [ ]  | DELETE | `app/api/blogs/[slug]/comments/[id]/route.ts`          | 해당 블로그의 댓글을 삭제합니다.             |
| [ ]  | PATCH  | `app/api/blogs/[slug]/comments/[id]/approve/route.ts`  | 해당 블로그 댓글의 승인 상태를 변경합니다.   |
| [ ]  | POST   | `app/api/blogs/[slug]/comments/verify/route.ts`        | 해당 블로그 댓글 작성자를 인증합니다.        |

### 15. 블로그별 이미지 업로드 API

| 상태 | 메서드 | 엔드포인트                                                 | 설명                                             |
| ---- | ------ | ---------------------------------------------------------- | ------------------------------------------------ |
| [ ]  | POST   | `app/api/blogs/[slug]/upload/image/route.ts`               | 해당 블로그에 이미지를 업로드합니다.             |
| [ ]  | GET    | `app/api/blogs/[slug]/upload/images/route.ts`              | 해당 블로그의 업로드된 이미지 목록을 조회합니다. |
| [ ]  | GET    | `app/api/blogs/[slug]/upload/images/[id]/route.ts`         | 해당 블로그의 특정 이미지를 조회합니다.          |
| [ ]  | PUT    | `app/api/blogs/[slug]/upload/images/[id]/route.ts`         | 해당 블로그의 이미지 메타데이터를 수정합니다.    |
| [ ]  | DELETE | `app/api/blogs/[slug]/upload/images/[id]/route.ts`         | 해당 블로그의 이미지를 삭제합니다.               |
| [ ]  | POST   | `app/api/blogs/[slug]/upload/images/batch-delete/route.ts` | 해당 블로그의 이미지를 일괄 삭제합니다.          |

---

## 🔒 기타/보안/SEO 관련 API

- [ ] **보안 미들웨어**: CORS, CSRF, XSS, Rate Limiting, 파일 업로드 보안, 에러 로깅, 댓글 스팸 방지, 이메일 발송 보안 등 보안 관련 API/미들웨어 구현 필요

---

## 📊 요약 통계

| 구분                  | API 개수  | 완료    | 미완료    |
| --------------------- | --------- | ------- | --------- |
| **플랫폼 관리 API**   | 72개      | 5개     | 67개      |
| **블로그별 관리 API** | 69개      | 0개     | 69개      |
| **보안/기타**         | 1개       | 0개     | 1개       |
| **전체**              | **142개** | **5개** | **137개** |

### 세부 분석

#### 플랫폼 관리 API - 72개 (모든 블로그 통합 관리)

- 인증 API: 1개 ✅
- 사용자 API: 10개 (5개 완료 ✅)
- 블로그 API: 7개
- 플랫폼 전체 포스트 API: 22개
- 플랫폼 전체 카테고리 API: 11개
- 플랫폼 전체 해시태그 API: 6개
- 플랫폼 전체 댓글 API: 9개
- 플랫폼 전체 이미지 업로드 API: 6개

#### 블로그별 관리 API - 69개 (개별 블로그 관리)

- 블로그별 포스트 API: 22개
- 블로그별 카테고리 API: 11개
- 블로그별 해시태그 API: 6개
- 블로그별 댓글 API: 9개
- 블로그별 이미지 업로드 API: 6개

#### 관리 방식의 차이점

**플랫폼 어드민** 🌐

- 모든 블로그의 콘텐츠를 통합 관리
- 블로그 생성/삭제/설정 권한
- 플랫폼 전체 데이터 조회 및 관리
- 사용자 관리 권한

**블로그별 어드민** 📝

- 해당 블로그의 콘텐츠만 관리
- 블로그 생성/삭제 권한 없음
- 해당 블로그 데이터만 조회 및 관리
- 블로그 소유자/편집자 권한

#### 우선순위 개발 권장사항

**Phase 1 (플랫폼 기반)** 🔥

- 블로그 CRUD API
- 사용자 관리 API 완성
- 플랫폼 포스트 기본 API

**Phase 2 (핵심 기능)** ⭐

- 블로그별 포스트 CRUD API
- 카테고리 관리 API (플랫폼/블로그별)
- 파일 업로드 API

**Phase 3 (고급 기능)** 🚀

- 댓글 시스템 API
- 해시태그 API
- 이메일 알림 시스템

**Phase 4 (최적화)** ✨

- SEO 최적화 API
- 보안 강화 API
- 성능 최적화
