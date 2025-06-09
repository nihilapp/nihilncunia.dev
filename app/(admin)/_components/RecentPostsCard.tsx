'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
  category: string;
  subCategory?: string;
}

interface RecentPostsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  posts: Post[];
}

const cssVariants = cva(
  [
    `bg-white rounded-lg shadow p-6`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const cardVariants = cva(
  [
    `bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function RecentPostsCard({ className, posts, ...props }: RecentPostsCardProps) {
  return (
    <div
      className={cssVariants({ className, })}
      {...props}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-lg font-semibold text-gray-900'>최근 포스트</h2>
        <Link
          href='/admin/posts'
          className='text-sm text-blue-600 hover:text-blue-800'
        >
          전체 보기
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.slice(0, 6).map((post) => (
          <Link
            key={post.id}
            href={`/admin/posts/${post.id}`}
            className={cardVariants()}
          >
            <div className='aspect-video bg-gray-100' />
            <div className='p-4'>
              <h3 className='font-medium text-gray-900 mb-2 line-clamp-2'>
                {post.title}
              </h3>
              <div className='flex items-center gap-2 mb-2'>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {post.status === 'published' ? '발행됨' : '임시저장'}
                </span>
                <span className='text-xs text-gray-500'>
                  {post.category}
                  {post.subCategory && ` > ${post.subCategory}`}
                </span>
              </div>
              <div className='text-xs text-gray-500 space-y-1'>
                <p>작성일: {post.createdAt}</p>
                <p>수정일: {post.updatedAt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
