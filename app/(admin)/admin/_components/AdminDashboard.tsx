'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { StatCard, RecentPostsCard } from '@/(admin)/_components';
import { Button } from '@/(common)/_components/ui/button';
import { EyeIcon, CheckIcon, ClockIcon, PlusIcon } from '@/_icons';
import { cn } from '@/_libs';

const AdminDashboardVariants = cva(
  [
    'p-8',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface AdminDashboardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof AdminDashboardVariants> {}

export function AdminDashboard({ className, ...props }: AdminDashboardProps) {
  // TODO: 실제 데이터로 교체
  const recentPosts = [
    {
      id: '1',
      title: 'Next.js 13의 새로운 기능들',
      status: 'PUBLISHED' as const,
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15',
      category: '개발',
      subCategory: 'Next.js',
    },
    {
      id: '2',
      title: 'TypeScript로 더 안전한 코드 작성하기',
      status: 'DRAFT' as const,
      createdAt: '2024-03-14',
      updatedAt: '2024-03-15',
      category: '개발',
      subCategory: 'TypeScript',
    },
    {
      id: '3',
      title: 'React Query로 서버 상태 관리하기',
      status: 'PUBLISHED' as const,
      createdAt: '2024-03-13',
      updatedAt: '2024-03-13',
      category: '개발',
      subCategory: 'React',
    },
    {
      id: '4',
      title: 'Tailwind CSS로 빠르게 스타일링하기',
      status: 'PUBLISHED' as const,
      createdAt: '2024-03-12',
      updatedAt: '2024-03-12',
      category: '개발',
      subCategory: 'CSS',
    },
    {
      id: '5',
      title: 'Prisma로 데이터베이스 관리하기',
      status: 'PUBLISHED' as const,
      createdAt: '2024-03-11',
      updatedAt: '2024-03-11',
      category: '개발',
      subCategory: 'Database',
    },
    {
      id: '6',
      title: 'Docker로 개발 환경 구성하기',
      status: 'DRAFT' as const,
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10',
      category: '개발',
      subCategory: 'DevOps',
    },
  ];

  return (
    <div
      className={cn(
        AdminDashboardVariants({}),
        className
      )}
      {...props}
    >
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2'>대시보드</h1>
          <p className='text-gray-600 dark:text-gray-400'>블로그 관리 현황을 한눈에 확인하세요</p>
        </div>
        <Button asChild className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3'>
          <Link
            href='/admin/posts/new'
          >
            <PlusIcon className='w-5 h-5 mr-2' />
            <span>새 포스트 작성</span>
          </Link>
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10'>
        <StatCard
          icon={<CheckIcon />}
          label='전체 포스트'
          value='12'
          iconBgColor='bg-gradient-to-br from-green-500 to-emerald-600'
        />

        <StatCard
          icon={<ClockIcon />}
          label='임시저장'
          value='3'
          iconBgColor='bg-gradient-to-br from-yellow-500 to-orange-500'
        />

        <StatCard
          icon={<EyeIcon />}
          label='총 조회수'
          value='1,234'
          iconBgColor='bg-gradient-to-br from-blue-500 to-indigo-600'
        />
      </div>

      <RecentPostsCard posts={recentPosts} />
    </div>
  );
}
