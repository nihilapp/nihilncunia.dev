import React from 'react';

import { CommonContent } from '@/(common)/_layouts';
import { CommonFooter } from '@/(common)/_layouts/CommonFooter';
import { CommonHeader } from '@/(common)/_layouts/CommonHeader';
import { CommonNav } from '@/(common)/_layouts/CommonNav';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children, }: Props) {
  return (
    <>
      <CommonHeader />
      <CommonNav />
      <CommonContent>
        {children}
      </CommonContent>
      <CommonFooter />
    </>
  );
}
