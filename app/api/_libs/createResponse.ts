import { NextResponse } from 'next/server';

import type { ApiResponse, CreateResponse } from '@/_entities/common';

export function createResponse<T>({
  message = '',
  data = null,
  status,
}: CreateResponse<T>) {
  return NextResponse.json(
    {
      message,
      response: data,
      status,
    } satisfies ApiResponse<T>,
    {
      status,
    }
  );
}
