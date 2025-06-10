import React from 'react';

import { Home } from './_components';

import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: `홈`,
  url: `/`,
  description: '개발자의 블로그 메인 페이지입니다.',
});

export default function HomePage() {
  return (
    <Home />
  );
}
