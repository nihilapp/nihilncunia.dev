import { EditPost } from './_components';

import { setMeta } from '@/_libs';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params, }: Props) {
  const { id, } = await params;

  return setMeta({
    title: `포스트 수정 - ${id}`,
    url: `/admin/posts/${id}/edit`,
    description: '블로그 포스트를 수정합니다.',
  });
}

interface PageProps {
  params: Promise<{ id: string }>;
  children?: React.ReactNode;
}

export default function EditPostPage({ params, children, }: PageProps) {
  return (
    <EditPost params={params} />
  );
}
