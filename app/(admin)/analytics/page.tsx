import { Metadata } from 'next';

import { setMeta } from '@/_libs';

export const metadata: Metadata = setMeta({
  title: '블로그 통계',
  description: '블로그 통계 페이지',
});

export default function AdminAnalyticsPage() {
  return null;
}
