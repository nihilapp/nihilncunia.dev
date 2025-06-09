import { DashboardIcon, PostsIcon, NewPostIcon, CategoriesIcon, ProfileIcon } from '@/_icons';

export const iconMap = {
  dashboard: DashboardIcon,
  posts: PostsIcon,
  'new-post': NewPostIcon,
  categories: CategoriesIcon,
  profile: ProfileIcon,
} as const;

export type IconType = keyof typeof iconMap;
