import { Posts } from '@/(common)/posts/_components/Posts';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '블로그 포스트',
  url: '/posts',
  description: '모든 블로그 포스트를 확인할 수 있습니다.',
});

interface Props {
  children?: React.ReactNode;
}

export default function PostsPage({ children, }: Props) {
  return (
    <Posts />
  );
}
