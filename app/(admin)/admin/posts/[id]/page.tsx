import { PostDetail } from './_components';

import { PostsApi } from '@/_entities/posts';
import { setMeta } from '@/_libs';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params, }: Props) {
  const { id, } = await params;
  const { response, } = await PostsApi.getById(id);

  return setMeta({
    title: `포스트 상세보기 - ${response.title}`,
    url: `/admin/posts/${id}`,
    description: '포스트 상세 내용을 확인합니다.',
  });
}

export default function PostDetailPage({ params, }: Props) {
  return (
    <PostDetail params={params} />
  );
}
