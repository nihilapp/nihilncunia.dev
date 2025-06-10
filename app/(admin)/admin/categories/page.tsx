import { AdminCategories } from '@/(admin)/admin/categories/_components/AdminCategories';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '카테고리 관리',
  url: '/admin/categories',
  description: '블로그 카테고리를 생성, 수정, 삭제할 수 있습니다.',
});

interface Props {
  children?: React.ReactNode;
}

export function AdminCategoriesPage({ children, }: Props) {
  return (
    <AdminCategories />
  );
}
