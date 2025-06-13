import { Metadata } from 'next';

import { setMeta } from '@/_libs';

export const metadata: Metadata = setMeta({
  title: '블로그 설정',
  description: '블로그 설정 페이지',
});

export default function AdminSettingsPage() {
  return null;
}
