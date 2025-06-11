import { AdminHashtags } from '@/(admin)/admin/hashtags/_components/AdminHashtags';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '해시태그 관리',
  url: '/admin/hashtags',
  description: '블로그 해시태그를 생성, 수정, 삭제할 수 있습니다.',
});

interface Props {
  children?: React.ReactNode;
}

export default function AdminHashtagsPage({ children, }: Props) {
  return (
    <AdminHashtags />
  );
}
