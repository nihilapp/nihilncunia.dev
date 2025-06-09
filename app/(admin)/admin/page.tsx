'use client';

import Link from 'next/link';

import { StatCard, RecentPostsCard } from '@/(admin)/_components';
import { Button } from '@/(common)/_components/ui/button';
import { EyeIcon, CheckIcon, ClockIcon } from '@/_icons';

export default function AdminPage() {
  // TODO: 실제 데이터로 교체
  const recentPosts = [
    {
      id: '1',
      title: 'Next.js 13의 새로운 기능들',
      status: 'published' as const,
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15',
      category: '개발',
      subCategory: 'Next.js',
    },
    {
      id: '2',
      title: 'TypeScript로 더 안전한 코드 작성하기',
      status: 'draft' as const,
      createdAt: '2024-03-14',
      updatedAt: '2024-03-15',
      category: '개발',
      subCategory: 'TypeScript',
    },
    {
      id: '3',
      title: 'React Query로 서버 상태 관리하기',
      status: 'published' as const,
      createdAt: '2024-03-13',
      updatedAt: '2024-03-13',
      category: '개발',
      subCategory: 'React',
    },
    {
      id: '4',
      title: 'Tailwind CSS로 빠르게 스타일링하기',
      status: 'published' as const,
      createdAt: '2024-03-12',
      updatedAt: '2024-03-12',
      category: '개발',
      subCategory: 'CSS',
    },
    {
      id: '5',
      title: 'Prisma로 데이터베이스 관리하기',
      status: 'published' as const,
      createdAt: '2024-03-11',
      updatedAt: '2024-03-11',
      category: '개발',
      subCategory: 'Database',
    },
    {
      id: '6',
      title: 'Docker로 개발 환경 구성하기',
      status: 'draft' as const,
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10',
      category: '개발',
      subCategory: 'DevOps',
    },
  ];

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>대시보드</h1>
        <Button asChild>
          <Link
            href='/admin/posts/new'
          >
            <span className='mr-2'>새 포스트 작성</span>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4v16m8-8H4'
              />
            </svg>
          </Link>
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        <StatCard
          icon={<CheckIcon />}
          label='전체 포스트'
          value='12'
          iconBgColor='bg-green-500'
        />

        <StatCard
          icon={<ClockIcon />}
          label='임시저장'
          value='3'
          iconBgColor='bg-yellow-500'
        />

        <StatCard
          icon={<EyeIcon />}
          label='총 조회수'
          value='1,234'
          iconBgColor='bg-blue-500'
        />
      </div>

      <RecentPostsCard posts={recentPosts} />
    </div>
  );
}
