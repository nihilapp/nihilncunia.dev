import { AdminPosts } from './_components';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '포스트 관리',
  url: '/admin/posts',
  description: '블로그 포스트를 관리할 수 있습니다.',
});


interface Props {
  children?: React.ReactNode;
}

export default function AdminPostsPage({ children, }: Props) {
  return (
    <AdminPosts />
  );
}
