import { DraftsList } from './_components';

import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '임시 저장',
  url: '/admin/posts/drafts',
  description: '임시 저장된 포스트 목록을 관리합니다.',
});

interface PageProps {
  children?: React.ReactNode;
}

export default function DraftsPage({ children, }: PageProps) {
  return (
    <DraftsList />
  );
}
