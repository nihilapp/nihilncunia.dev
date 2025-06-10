import { AdminDashboard } from '@/(admin)/admin/_components/AdminDashboard';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '관리자 대시보드',
  url: '/admin',
  description: '블로그 관리 현황을 한눈에 확인하세요',
});

interface Props {
  children?: React.ReactNode;
}

export default function AdminDashboardPage({ children, }: Props) {
  return (
    <AdminDashboard />
  );
}
