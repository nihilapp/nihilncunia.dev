import { NewPost } from '@/(admin)/admin/posts/new/_components/NewPost';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '새 포스트 작성',
  url: '/admin/posts/new',
});

interface Props {
  children?: React.ReactNode;
}

export default function NewPostPage({ children, }: Props) {
  return (
    <NewPost />
  );
}
