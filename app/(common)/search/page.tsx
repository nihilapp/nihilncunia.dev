import { Search } from '@/(common)/search/_components/Search';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '블로그 검색',
  url: '/search',
  description: '블로그 포스트를 검색할 수 있습니다.',
});

interface Props {
  children?: React.ReactNode;
}

export default function SearchPage({ children, }: Props) {
  return (
    <Search />
  );
}
