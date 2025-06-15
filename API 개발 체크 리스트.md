# API 목록 및 세부 기능

본 문서는 개인 블로그 프로젝트에서 사용될 주요 API들과 그 기능을 정리한 것입니다. 각 API는 REST 방식으로 설계되며, URL 경로와 메서드에 따라 동작이 구분됩니다.

## 1. 인증(Auth) API

- [ ] POST `/api/auth/sign_up` - 새로운 관리자를 생성합니다. (요청 데이터: `email`, `name`, `password`)
- [ ] POST `/api/auth/sign_in` - 로그인하여 액세스 토큰과 리프레시 토큰을 발급합니다. (요청 데이터: `email`, `password`)
- [ ] POST `/api/auth/sign_out` - 로그인 상태를 해제하고 쿠키의 토큰을 삭제합니다.
- [ ] POST `/api/auth/refresh` - 리프레시 토큰을 검증한 뒤 새 토큰을 발급합니다.
- [ ] GET `/api/auth/session` - 현재 로그인한 사용자 세션을 조회합니다.

## 2. 사용자(User) API

- [ ] GET `/api/users` - 관리자 목록을 조회합니다.
- [ ] GET `/api/users/:id` - 특정 관리자의 상세 정보를 가져옵니다.
- [ ] GET `/api/users/email/:email` - 이메일로 관리자를 검색합니다.
- [ ] GET `/api/users/name/:name` - 이름으로 관리자를 검색합니다.
- [ ] POST `/api/users` - 관리자를 새로 생성합니다. (요청 데이터: `email`, `name`, `role`, `password`)
- [ ] PUT `/api/users/:id` - 관리자 기본 정보를 수정합니다.
- [ ] PUT `/api/users/:id/password` - 관리자 비밀번호를 변경합니다.
- [ ] PUT `/api/users/:id/image` - 프로필 이미지를 수정합니다.
- [ ] DELETE `/api/users/:id` - 관리자를 삭제합니다.
- [ ] DELETE `/api/users` - 여러 관리자를 한 번에 삭제합니다. (요청 데이터: `ids` 배열)

## 3. 포스트(Post) API

- [ ] GET `/api/posts` - 모든 포스트 목록을 반환합니다.
- [ ] GET `/api/posts/:id` - 특정 포스트의 상세 정보를 조회합니다.
- [ ] GET `/api/posts/slug/:slug` - 슬러그로 포스트를 조회합니다.
- [ ] POST `/api/posts` - 새 포스트를 작성합니다. (카테고리, 해시태그 등 포함)
- [ ] PUT `/api/posts/:id` - 기존 포스트를 수정합니다.
- [ ] DELETE `/api/posts/:id` - 포스트를 삭제합니다.
- [ ] GET `/api/posts/search` - 키워드로 포스트를 검색합니다.
- [ ] PATCH `/api/posts/:id/publish` - 포스트의 공개 상태를 변경합니다.
- [ ] PATCH `/api/posts/:id/views` - 조회수를 증가시키고 조회 이력을 저장합니다.
- [ ] PATCH `/api/posts/:id/likes` - 좋아요 수를 증가시킵니다.
- [ ] POST `/api/posts/:id/like` 또는 DELETE `/api/posts/:id/like` - 사용자의 좋아요 추가 혹은 취소를 처리합니다.
- [ ] GET `/api/posts/:id/views` - 특정 포스트의 조회 이력을 조회합니다.
- [ ] GET `/api/posts/:id/likes` - 특정 포스트의 좋아요 이력을 조회합니다.
- [ ] POST `/api/posts/draft` - 임시 저장용 포스트를 생성합니다.
- [ ] GET `/api/posts/drafts` - 임시 저장된 포스트 목록을 조회합니다.
- [ ] GET `/api/posts/drafts/:id/restore` - 임시 저장본을 불러와 복구합니다.
- [ ] PATCH `/api/posts/:id/autosave` - 작성 중인 포스트를 자동 저장합니다.
- [ ] PATCH `/api/posts/batch-status` - 여러 포스트의 상태를 일괄 변경합니다.
- [ ] DELETE `/api/posts/batch` - 선택한 포스트들을 한꺼번에 삭제합니다.
- [ ] GET `/api/posts/:id/related` - 해당 포스트와 관련된 글을 추천합니다.

## 4. 카테고리(Category) API - 계층 구조

- [ ] GET `/api/categories` - 모든 카테고리를 계층 구조로 조회합니다.
- [ ] GET `/api/categories/flat` - 모든 카테고리를 평면 목록으로 조회합니다.
- [ ] GET `/api/categories/:id` - 특정 카테고리 상세 정보를 조회합니다.
- [ ] GET `/api/categories/slug/:slug` - 슬러그로 카테고리를 조회합니다.
- [ ] POST `/api/categories` - 카테고리를 생성합니다. (요청 데이터: `name`, `slug`, `description`, `parent_id`, `order`)
- [ ] PUT `/api/categories/:id` - 카테고리 정보를 수정합니다.
- [ ] PATCH `/api/categories/:id/order` - 카테고리 순서를 변경합니다.
- [ ] PATCH `/api/categories/:id/status` - 카테고리 활성화/비활성화를 변경합니다.
- [ ] DELETE `/api/categories/:id` - 카테고리를 삭제합니다.
- [ ] GET `/api/categories/:id/posts` - 특정 카테고리에 속한 포스트 목록을 조회합니다.
- [ ] GET `/api/categories/:id/children` - 특정 카테고리의 하위 카테고리를 조회합니다.

## 5. 해시태그(Hashtag) API

- [ ] GET `/api/hashtags` - 모든 해시태그를 조회합니다.
- [ ] POST `/api/hashtags` - 해시태그를 생성합니다.
- [ ] PUT `/api/hashtags/:id` - 해시태그 이름을 수정합니다.
- [ ] DELETE `/api/hashtags/:id` - 해시태그를 삭제합니다.
- [ ] GET `/api/hashtags/:id/posts` - 해당 해시태그가 달린 포스트 목록을 조회합니다.
- [ ] GET `/api/hashtags/autocomplete` - 키워드로 해시태그 자동완성 목록을 가져옵니다.

## 6. 포스트 조회/좋아요(PostView/PostLike) API

- [ ] GET `/api/posts/:id/views` - 특정 포스트의 조회 기록을 조회합니다.
- [ ] POST `/api/posts/:id/view` - 포스트 조회수를 증가시키고 조회 기록을 저장합니다.
- [ ] GET `/api/posts/:id/likes` - 특정 포스트의 좋아요 기록을 조회합니다.
- [ ] POST `/api/posts/:id/like` - 포스트에 좋아요를 추가합니다.
- [ ] DELETE `/api/posts/:id/like` - 포스트 좋아요를 취소합니다.
- [ ] GET `/api/analytics/views` - 전체 조회수 통계를 조회합니다.
- [ ] GET `/api/analytics/likes` - 전체 좋아요 통계를 조회합니다.

## 7. 이메일 로그(EmailLog) API

- [ ] GET `/api/email-logs` - 이메일 발송 로그 목록을 조회합니다.
- [ ] GET `/api/email-logs/:id` - 특정 이메일 로그 상세 정보를 조회합니다.
- [ ] POST `/api/email-logs` - 이메일 발송 로그를 생성합니다.
- [ ] POST `/api/email-logs/:id/resend` - 실패한 이메일을 재발송합니다.
- [ ] GET `/api/email-logs/stats` - 이메일 발송 통계를 조회합니다.

## 8. 댓글(Comment) API

- [ ] GET `/api/comments` - 댓글 목록을 조회합니다.
- [ ] GET `/api/comments/:id` - 특정 댓글의 상세 정보를 조회합니다.
- [ ] GET `/api/comments/post/:postId` - 포스트별 댓글 목록을 가져옵니다.
- [ ] POST `/api/comments` - 방문자가 댓글을 작성합니다.
- [ ] POST `/api/comments/:id/reply` - 관리자가 댓글에 답변을 달 때 사용합니다.
- [ ] PUT `/api/comments/:id` - 댓글 내용을 수정합니다.
- [ ] DELETE `/api/comments/:id` - 댓글을 삭제합니다.
- [ ] PATCH `/api/comments/:id/approve` - 댓글 승인 또는 거부 상태를 변경합니다.
- [ ] POST `/api/comments/verify` - 비밀번호 검증을 통해 댓글 작성자를 확인합니다.

## 9. 파일 업로드(Upload) API

- [ ] POST `/api/upload/image` - 이미지를 업로드합니다.
- [ ] GET `/api/upload/images` - 업로드된 이미지 목록을 조회합니다.
- [ ] GET `/api/upload/images/:id` - 특정 이미지 상세 정보를 조회합니다.
- [ ] PUT `/api/upload/images/:id` - 이미지 메타데이터를 수정합니다. (alt_text 등)
- [ ] DELETE `/api/upload/images/:id` - 업로드된 이미지를 삭제합니다.
- [ ] POST `/api/upload/images/batch-delete` - 여러 이미지를 일괄 삭제합니다.

## 10. SEO 및 기타 API

- [ ] GET `/api/sitemap.xml` - 사이트맵을 동적으로 생성합니다.
- [ ] GET `/api/rss.xml` - RSS 피드를 제공합니다.

## 11. 어드민(Admin) 통계/백업 API

- [ ] GET `/api/admin/stats` - 전체 통계 데이터 조회
- [ ] GET `/api/admin/posts/stats` - 포스트 통계 데이터 조회
- [ ] GET `/api/admin/views/stats` - 조회수 통계 데이터 조회
- [ ] GET `/api/admin/likes/stats` - 좋아요 통계 데이터 조회
- [ ] GET `/api/admin/categories/stats` - 카테고리별 통계 데이터 조회
- [ ] GET `/api/admin/comments/stats` - 댓글 통계 데이터 조회
- [ ] GET `/api/admin/backup` - 데이터 백업
- [ ] POST `/api/admin/restore` - 데이터 복원

## 12. 공개 블로그(Blog) API

- [ ] GET `/api/blog` - 블로그 메인 데이터 조회
- [ ] GET `/api/blog/posts` - 공개 포스트 목록 조회
- [ ] GET `/api/blog/posts/:id` - 공개 포스트 상세 조회
- [ ] GET `/api/blog/categories` - 공개 카테고리 목록 조회
- [ ] GET `/api/blog/search` - 블로그 검색
- [ ] GET `/api/blog/about` - 블로그 소개 데이터 조회

## 13. 기타/보안/SEO 관련 API

- [ ] CORS, CSRF, XSS, Rate Limiting, 파일 업로드 보안, 에러 로깅, 댓글 스팸 방지, 이메일 발송 보안 등 보안 관련 API/미들웨어 구현 필요
