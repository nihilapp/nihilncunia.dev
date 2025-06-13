import { Metadata } from 'next';

import { setMeta } from '@/_libs';

export const metadata: Metadata = setMeta({
  title: '백업 및 복원',
  description: '블로그 백업 및 복원 페이지',
});

export default function AdminBackupPage() {
  return null;
}
