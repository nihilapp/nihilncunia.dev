import { About } from '@/(common)/about/_components/About';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '블로그 소개',
  url: '/about',
  description: '이 블로그에 대한 소개를 확인할 수 있습니다.',
});

interface Props {
  children?: React.ReactNode;
}

export default function AboutPage({ children, }: Props) {
  return (
    <About />
  );
}
