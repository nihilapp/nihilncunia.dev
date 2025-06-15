import { signOut } from '../../../auth';

import { Button } from '@/(common)/_components/ui/button';

interface SignOutFormProps {
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function SignOutForm({
  children = '로그아웃',
  className,
  variant = 'outline',
}: SignOutFormProps) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/', });
      }}
    >
      <Button
        type='submit'
        variant={variant}
        className={className}
      >
        {children}
      </Button>
    </form>
  );
}
