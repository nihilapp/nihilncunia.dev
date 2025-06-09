import { DashboardIcon, PostsIcon, NewPostIcon, CategoriesIcon, HashtagsIcon, ProfileIcon } from '@/_icons';

export const iconMap = {
  dashboard: DashboardIcon,
  posts: PostsIcon,
  'new-post': NewPostIcon,
  categories: CategoriesIcon,
  hashtags: HashtagsIcon,
  profile: ProfileIcon,
} as const;

export type IconType = keyof typeof iconMap;
