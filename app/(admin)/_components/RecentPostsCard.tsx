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
    `bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-xl shadow-lg border border-gray-200/50 dark:border-slate-700/50 p-8`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const cardVariants = cva(
  [
    `bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-md border border-gray-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group`,
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
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1'>📝 최근 포스트</h2>
          <p className='text-sm text-gray-600 dark:text-gray-400'>최근에 작성하거나 수정한 포스트들</p>
        </div>
        <Link
          href='/admin/posts'
          className='text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200'
        >
          전체 보기 →
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.slice(0, 6).map((post) => (
          <Link
            key={post.id}
            href={`/admin/posts/${post.id}`}
            className={cardVariants()}
          >
            <div className='aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 relative overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300' />
              <div className='absolute bottom-2 right-2'>
                <span className='text-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300'>📄</span>
              </div>
            </div>
            <div className='p-5'>
              <h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200'>
                {post.title}
              </h3>
              <div className='flex items-center gap-2 mb-3'>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    post.status === 'published'
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
                      : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                  }`}
                >
                  {post.status === 'published' ? '✅ 발행됨' : '⏳ 임시저장'}
                </span>
              </div>
              <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
                <span className='bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md font-medium'>
                  {post.category}
                  {post.subCategory && ` > ${post.subCategory}`}
                </span>
                <span>{post.updatedAt}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
