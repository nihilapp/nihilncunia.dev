import { IconType } from '@/_data/icons.data';

export type MenuItem = {
  label: string;
  href: string;
  icon: IconType;
};

export const menuItems: MenuItem[] = [
  {
    label: '대시보드',
    href: '/admin',
    icon: 'dashboard',
  },
  {
    label: '게시글 관리',
    href: '/admin/posts',
    icon: 'posts',
  },
  {
    label: '새 게시글',
    href: '/admin/posts/new',
    icon: 'new-post',
  },
  {
    label: '카테고리 관리',
    href: '/admin/categories',
    icon: 'categories',
  },
  {
    label: '프로필',
    href: '/admin/profile',
    icon: 'profile',
  },
] as const;
