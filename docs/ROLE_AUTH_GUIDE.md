# 권한 기반 인증 변경 사항

이 문서는 ADMIN 페이지 접근을 위한 권한 기반 로직 구현 내역을 정리합니다.

## 주요 변경점

- **JWT 페이로드 확장** : 토큰 생성 시 사용자 `role` 값을 포함하도록 수정했습니다.
- **타입 정의 업데이트** : `TokenData`와 `UserSession` 인터페이스에 `role` 필드가 추가되었습니다.
- **API 응답 개선** : `/api/auth/sign_in`과 `/api/auth/refresh` 라우트가 로그인 및 토큰 갱신 시 역할 정보를 반환합니다.
- **미들웨어 강화** : `middleware.ts`에서 갱신 API 응답을 확인하여 ADMIN 권한이 없는 경우 접근을 차단합니다.
- **API 미들웨어 추가** : `requireRole` 함수를 도입하여 서버 라우트에서 손쉽게 역할 검사를 수행할 수 있습니다.

## 사용 방법

```ts
import { requireRole } from '@/api/_libs';

export async function GET(req: NextRequest) {
  return requireRole(req, 'ADMIN', async () => {
    // ADMIN 전용 로직
    return NextResponse.json({ ok: true });
  });
}
```

ADMIN 전용 페이지는 기존과 동일하게 `/admin/*` 경로를 사용하며, 미들웨어에서 토큰을 갱신하고 역할을 검증합니다.
