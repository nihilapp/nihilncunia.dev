import { PostDetail } from './_components/PostDetail';
import { setMeta } from '@/_libs';

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostDetailPageProps) {
  const { id } = await params;
  return setMeta({
    title: `포스트 ${id}`,
    url: `/posts/${id}`,
  });
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  return <PostDetail id={id} />;
}
