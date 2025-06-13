import { Metadata } from 'next';

import { setMeta } from '@/_libs';

export const metadata: Metadata = setMeta({
  title: '프로필 관리',
  description: '블로그 프로필 관리 페이지',
});

export default function AdminProfilePage() {
  return null;
}
