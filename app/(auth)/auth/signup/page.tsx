import React from 'react';

import { SignUpForm } from '@/(auth)/_components';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: `회원가입`,
  url: `/auth/signup`,
});

export default function SignUpPage() {
  return (
    <SignUpForm />
  );
}
