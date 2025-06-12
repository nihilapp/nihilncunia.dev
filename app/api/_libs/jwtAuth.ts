import { NextRequest, NextResponse } from 'next/server';

import type { UserSession } from '@/_entities/user-auth';
import { authenticate } from '@/api/_libs/middleware';

export interface JwtAuthResult {
  user?: UserSession;
  response?: NextResponse;
}

export async function jwtAuth(
  request: NextRequest,
  strict: boolean = true
): Promise<JwtAuthResult> {
  const result = await authenticate(request);

  if (!result.success) {
    if (!strict) {
      return {};
    }

    const response = NextResponse.json(
      {
        message: result.error!,
        response: null,
      },
      {
        status: result.status!,
      }
    );

    return { response };
  }

  return { user: result.user };
}
