# API 목록 및 세부 기능

본 문서는 개인 블로그 프로젝트에서 사용될 주요 API들과 그 기능을 정리한 것입니다. Next.js App Router의 파일 기반 라우팅 시스템을 사용하여 구현됩니다.

## 1. 인증(Auth) API

- [x] POST `app/api/auth/sign-up/route.ts` - 새로운 관리자를 생성합니다. (요청 데이터: `email`, `name`, `password`)

> **참고**: NextAuth 사용으로 다음 기능들은 자동 제공됩니다:
>
> - 로그인: NextAuth의 signIn 함수 및 내장 API 사용
> - 로그아웃: NextAuth의 signOut 함수 및 내장 API 사용
> - 세션 조회: NextAuth의 auth 함수 사용
> - 토큰 갱신: JWT callback에서 자동 처리

## 2. 사용자(User) API

- [x] GET `app/api/users/route.ts` - 관리자 목록을 조회합니다.
- [x] GET `app/api/users/[id]/route.ts` - 특정 관리자의 상세 정보를 가져옵니다.
- [ ] GET `app/api/users/email/[email]/route.ts` - 이메일로 관리자를 검색합니다.
- [ ] GET `app/api/users/name/[name]/route.ts` - 이름으로 관리자를 검색합니다.
- [ ] POST `app/api/users/route.ts` - 관리자를 새로 생성합니다. (요청 데이터: `email`, `name`, `role`, `password`)
- [ ] PUT `app/api/users/[id]/route.ts` - 관리자 기본 정보를 수정합니다.
- [ ] PUT `app/api/users/[id]/password/route.ts` - 관리자 비밀번호를 변경합니다.
- [ ] PUT `app/api/users/[id]/image/route.ts` - 프로필 이미지를 수정합니다.
- [ ] DELETE `app/api/users/[id]/route.ts` - 관리자를 삭제합니다.
- [ ] DELETE `app/api/users/route.ts` - 여러 관리자를 한 번에 삭제합니다. (요청 데이터: `ids` 배열)

## 3. 포스트(Post) API

- [ ] GET `app/api/posts/route.ts` - 모든 포스트 목록을 반환합니다.
- [ ] GET `app/api/posts/[id]/route.ts` - 특정 포스트의 상세 정보를 조회합니다.
- [ ] GET `app/api/posts/slug/[slug]/route.ts` - 슬러그로 포스트를 조회합니다.
- [ ] POST `app/api/posts/route.ts` - 새 포스트를 작성합니다. (카테고리, 해시태그 등 포함)
- [ ] PUT `app/api/posts/[id]/route.ts` - 기존 포스트를 수정합니다.
- [ ] DELETE `app/api/posts/[id]/route.ts` - 포스트를 삭제합니다.
- [ ] GET `app/api/posts/search/route.ts` - 키워드로 포스트를 검색합니다.
- [ ] PATCH `app/api/posts/[id]/publish/route.ts` - 포스트의 공개 상태를 변경합니다.
- [ ] PATCH `app/api/posts/[id]/views/route.ts` - 조회수를 증가시키고 조회 이력을 저장합니다.
- [ ] PATCH `app/api/posts/[id]/likes/route.ts` - 좋아요 수를 증가시킵니다.
- [ ] POST/DELETE `app/api/posts/[id]/like/route.ts` - 사용자의 좋아요 추가 혹은 취소를 처리합니다.
- [ ] GET `app/api/posts/[id]/views/route.ts` - 특정 포스트의 조회 이력을 조회합니다.
- [ ] GET `app/api/posts/[id]/likes/route.ts` - 특정 포스트의 좋아요 이력을 조회합니다.
- [ ] POST `app/api/posts/draft/route.ts` - 임시 저장용 포스트를 생성합니다.
- [ ] GET `app/api/posts/drafts/route.ts` - 임시 저장된 포스트 목록을 조회합니다.
- [ ] GET `app/api/posts/drafts/[id]/restore/route.ts` - 임시 저장본을 불러와 복구합니다.
- [ ] PATCH `app/api/posts/[id]/autosave/route.ts` - 작성 중인 포스트를 자동 저장합니다.
- [ ] PATCH `app/api/posts/batch-status/route.ts` - 여러 포스트의 상태를 일괄 변경합니다.
- [ ] DELETE `app/api/posts/batch/route.ts` - 선택한 포스트들을 한꺼번에 삭제합니다.
- [ ] GET `app/api/posts/[id]/related/route.ts` - 해당 포스트와 관련된 글을 추천합니다.

## 4. 카테고리(Category) API - 계층 구조

- [ ] GET `app/api/categories/route.ts` - 모든 카테고리를 계층 구조로 조회합니다.
- [ ] GET `app/api/categories/flat/route.ts` - 모든 카테고리를 평면 목록으로 조회합니다.
- [ ] GET `app/api/categories/[id]/route.ts` - 특정 카테고리 상세 정보를 조회합니다.
- [ ] GET `app/api/categories/slug/[slug]/route.ts` - 슬러그로 카테고리를 조회합니다.
- [ ] POST `app/api/categories/route.ts` - 카테고리를 생성합니다. (요청 데이터: `name`, `slug`, `description`, `parent_id`, `order`)
- [ ] PUT `app/api/categories/[id]/route.ts` - 카테고리 정보를 수정합니다.
- [ ] PATCH `app/api/categories/[id]/order/route.ts` - 카테고리 순서를 변경합니다.
- [ ] PATCH `app/api/categories/[id]/status/route.ts` - 카테고리 활성화/비활성화를 변경합니다.
- [ ] DELETE `app/api/categories/[id]/route.ts` - 카테고리를 삭제합니다.
- [ ] GET `app/api/categories/[id]/posts/route.ts` - 특정 카테고리에 속한 포스트 목록을 조회합니다.
- [ ] GET `app/api/categories/[id]/children/route.ts` - 특정 카테고리의 하위 카테고리를 조회합니다.

## 5. 해시태그(Hashtag) API

- [ ] GET `app/api/hashtags/route.ts` - 모든 해시태그를 조회합니다.
- [ ] POST `app/api/hashtags/route.ts` - 해시태그를 생성합니다.
- [ ] PUT `app/api/hashtags/[id]/route.ts` - 해시태그 이름을 수정합니다.
- [ ] DELETE `app/api/hashtags/[id]/route.ts` - 해시태그를 삭제합니다.
- [ ] GET `app/api/hashtags/[id]/posts/route.ts` - 해당 해시태그가 달린 포스트 목록을 조회합니다.
- [ ] GET `app/api/hashtags/autocomplete/route.ts` - 키워드로 해시태그 자동완성 목록을 가져옵니다.

## 6. 포스트 조회/좋아요(PostView/PostLike) API

- [ ] GET `app/api/posts/[id]/views/route.ts` - 특정 포스트의 조회 기록을 조회합니다.
- [ ] POST `app/api/posts/[id]/view/route.ts` - 포스트 조회수를 증가시키고 조회 기록을 저장합니다.
- [ ] GET `app/api/posts/[id]/likes/route.ts` - 특정 포스트의 좋아요 기록을 조회합니다.
- [ ] POST `app/api/posts/[id]/like/route.ts` - 포스트에 좋아요를 추가합니다.
- [ ] DELETE `app/api/posts/[id]/like/route.ts` - 포스트 좋아요를 취소합니다.
- [ ] GET `app/api/analytics/views/route.ts` - 전체 조회수 통계를 조회합니다.
- [ ] GET `app/api/analytics/likes/route.ts` - 전체 좋아요 통계를 조회합니다.

## 7. 이메일 로그(EmailLog) API

- [ ] GET `app/api/email-logs/route.ts` - 이메일 발송 로그 목록을 조회합니다.
- [ ] GET `app/api/email-logs/[id]/route.ts` - 특정 이메일 로그 상세 정보를 조회합니다.
- [ ] POST `app/api/email-logs/route.ts` - 이메일 발송 로그를 생성합니다.
- [ ] POST `app/api/email-logs/[id]/resend/route.ts` - 실패한 이메일을 재발송합니다.
- [ ] GET `app/api/email-logs/stats/route.ts` - 이메일 발송 통계를 조회합니다.

## 8. 댓글(Comment) API

- [ ] GET `app/api/comments/route.ts` - 댓글 목록을 조회합니다.
- [ ] GET `app/api/comments/[id]/route.ts` - 특정 댓글의 상세 정보를 조회합니다.
- [ ] GET `app/api/comments/post/[postId]/route.ts` - 포스트별 댓글 목록을 가져옵니다.
- [ ] POST `app/api/comments/route.ts` - 방문자가 댓글을 작성합니다.
- [ ] POST `app/api/comments/[id]/reply/route.ts` - 관리자가 댓글에 답변을 달 때 사용합니다.
- [ ] PUT `app/api/comments/[id]/route.ts` - 댓글 내용을 수정합니다.
- [ ] DELETE `app/api/comments/[id]/route.ts` - 댓글을 삭제합니다.
- [ ] PATCH `app/api/comments/[id]/approve/route.ts` - 댓글 승인 또는 거부 상태를 변경합니다.
- [ ] POST `app/api/comments/verify/route.ts` - 비밀번호 검증을 통해 댓글 작성자를 확인합니다.

## 9. 파일 업로드(Upload) API

- [ ] POST `app/api/upload/image/route.ts` - 이미지를 업로드합니다.
- [ ] GET `app/api/upload/images/route.ts` - 업로드된 이미지 목록을 조회합니다.
- [ ] GET `app/api/upload/images/[id]/route.ts` - 특정 이미지 상세 정보를 조회합니다.
- [ ] PUT `app/api/upload/images/[id]/route.ts` - 이미지 메타데이터를 수정합니다. (alt_text 등)
- [ ] DELETE `app/api/upload/images/[id]/route.ts` - 업로드된 이미지를 삭제합니다.
- [ ] POST `app/api/upload/images/batch-delete/route.ts` - 여러 이미지를 일괄 삭제합니다.

## 10. SEO 및 기타 API

- [ ] GET `app/api/sitemap.xml/route.ts` - 사이트맵을 동적으로 생성합니다.
- [ ] GET `app/api/rss.xml/route.ts` - RSS 피드를 제공합니다.

## 11. 어드민(Admin) 통계/백업 API

- [ ] GET `app/api/admin/stats/route.ts` - 전체 통계 데이터 조회
- [ ] GET `app/api/admin/posts/stats/route.ts` - 포스트 통계 데이터 조회
- [ ] GET `app/api/admin/views/stats/route.ts` - 조회수 통계 데이터 조회
- [ ] GET `app/api/admin/likes/stats/route.ts` - 좋아요 통계 데이터 조회
- [ ] GET `app/api/admin/categories/stats/route.ts` - 카테고리별 통계 데이터 조회
- [ ] GET `app/api/admin/comments/stats/route.ts` - 댓글 통계 데이터 조회
- [ ] GET `app/api/admin/backup/route.ts` - 데이터 백업
- [ ] POST `app/api/admin/restore/route.ts` - 데이터 복원

## 12. 공개 블로그(Blog) API

- [ ] GET `app/api/blog/route.ts` - 블로그 메인 데이터 조회
- [ ] GET `app/api/blog/posts/route.ts` - 공개 포스트 목록 조회
- [ ] GET `app/api/blog/posts/[id]/route.ts` - 공개 포스트 상세 조회
- [ ] GET `app/api/blog/categories/route.ts` - 공개 카테고리 목록 조회
- [ ] GET `app/api/blog/search/route.ts` - 블로그 검색
- [ ] GET `app/api/blog/about/route.ts` - 블로그 소개 데이터 조회

## 13. 기타/보안/SEO 관련 API

- [ ] CORS, CSRF, XSS, Rate Limiting, 파일 업로드 보안, 에러 로깅, 댓글 스팸 방지, 이메일 발송 보안 등 보안 관련 API/미들웨어 구현 필요
