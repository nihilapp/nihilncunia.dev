import React from 'react';

import { SignInForm } from '@/(auth)/_components';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: `로그인`,
  url: `/auth/signin`,
  description: '계정에 로그인하여 관리자 기능을 사용하세요.',
});

export default function SignInPage() {
  return (
    <SignInForm />
  );
}
