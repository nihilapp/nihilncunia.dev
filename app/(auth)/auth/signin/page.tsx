import React from 'react';

import { SignInForm } from '@/(auth)/_components';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: `로그인`,
  url: `/auth/signin`,
});

export default function SignInPage() {
  return (
    <SignInForm />
  );
}
