'use client';

import Link from 'next/link';

import { Button } from '@/(common)/_components/ui/button';
import { LinkButton } from '@/(common)/_components/ui/LinkButton';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-8 p-24'>
      <div className='flex flex-col gap-4 w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>버튼/링크/링크버튼 비교</h1>

        <Button>일반 버튼</Button>

        <LinkButton href='/about'>링크버튼 (LinkButton)</LinkButton>

        <Link href='/about' className='text-blue-600 underline'>
          일반 링크 (Link)
        </Link>

        <div className='mt-8 flex flex-col gap-2'>
          <h2 className='text-lg font-semibold mb-2'>디자인 변경 예시</h2>
          <div className='flex gap-2'>
            <Button variant='outline' size='lg'>아웃라인 버튼 (Large)</Button>
            <LinkButton href='/about' variant='outline' size='lg'>아웃라인 링크버튼 (Large)</LinkButton>
          </div>
          <div className='flex gap-2'>
            <Button variant='destructive' size='sm'>위험 버튼 (Small)</Button>
            <LinkButton href='/about' variant='destructive' size='sm'>위험 링크버튼 (Small)</LinkButton>
          </div>
          <div className='flex gap-2'>
            <Button variant='ghost'>고스트 버튼</Button>
            <LinkButton href='/about' variant='ghost'>고스트 링크버튼</LinkButton>
          </div>
        </div>
      </div>

      <LinkButton href='/admin'>링크버튼</LinkButton>
    </main>
  );
}
