import { AdminProfile } from '@/(admin)/admin/profile/_components/AdminProfile';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '관리자 프로필',
  url: '/admin/profile',
  description: '계정 정보를 관리하고 비밀번호를 변경할 수 있습니다.',
});

interface Props {
  children?: React.ReactNode;
}

export default function AdminProfilePage({ children, }: Props) {
  return (
    <AdminProfile />
  );
}
