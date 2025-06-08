import React from 'react';

import { Home } from './_components';

import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: `홈`,
  url: `/`,
});

export default function HomePage() {
  return (
    <Home />
  );
}
