import { NewPost } from './_components';
import { setMeta } from '@/_libs';

interface Props {
  children?: React.ReactNode;
}

export const metadata = setMeta({
  title: '새 포스트 작성',
  url: '/admin/posts/new',
});


export default function NewPostPage({ children, }: Props) {
  return (
    <NewPost />
  );
}
