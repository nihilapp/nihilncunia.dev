'use client';

import { FiTag } from 'react-icons/fi';

import type { Category } from '@/_prisma/client';

interface CategoryWithCount extends Category {
  post_count: number;
  published_post_count: number;
}

interface CategoryStatisticsProps {
  categories: CategoryWithCount[];
}

export function CategoryStatistics({ categories, }: CategoryStatisticsProps) {
  const totalPosts = categories.reduce((sum, cat) => sum + cat.post_count, 0);
  const totalPublishedPosts = categories.reduce((sum, cat) => sum + cat.published_post_count, 0);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <div className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-blue-100 text-sm font-medium'>전체 카테고리</p>
            <p className='text-2xl font-bold'>{categories.length}개</p>
          </div>
          <FiTag className='w-8 h-8 text-blue-200' />
        </div>
      </div>

      <div className='bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-green-100 text-sm font-medium'>총 포스트</p>
            <p className='text-2xl font-bold'>{totalPosts}개</p>
          </div>
          <FiTag className='w-8 h-8 text-green-200' />
        </div>
      </div>

      <div className='bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-purple-100 text-sm font-medium'>공개 포스트</p>
            <p className='text-2xl font-bold'>{totalPublishedPosts}개</p>
          </div>
          <FiTag className='w-8 h-8 text-purple-200' />
        </div>
      </div>
    </div>
  );
}
