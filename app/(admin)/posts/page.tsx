import { Metadata } from 'next';

import { setMeta } from '@/_libs';

export const metadata: Metadata = setMeta({
  title: '포스트 관리',
  description: '블로그 포스트 관리 페이지',
});

export default function AdminPostsPage() {
  return null;
}
