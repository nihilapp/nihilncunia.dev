import { Metadata } from 'next';

import { setMeta } from '@/_libs';

export const metadata: Metadata = setMeta({
  title: '해시태그 관리',
  description: '블로그 해시태그 관리 페이지',
});

export default function AdminHashtagsPage() {
  return null;
}
