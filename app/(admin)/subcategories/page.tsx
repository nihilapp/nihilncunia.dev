import { Metadata } from 'next';

import { setMeta } from '@/_libs';

export const metadata: Metadata = setMeta({
  title: '서브카테고리 관리',
  description: '블로그 서브카테고리 관리 페이지',
});

export default function AdminSubcategoriesPage() {
  return null;
}
