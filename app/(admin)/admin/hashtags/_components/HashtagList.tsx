'use client';

import { HashtagCard } from './HashtagCard';

import type { Hashtag } from '@/_prisma/client';

interface HashtagWithCount extends Hashtag {
  post_count: number;
}

interface HashtagListProps {
  hashtags: HashtagWithCount[];
  onEditHashtag: (hashtag: HashtagWithCount) => void;
}

export function HashtagList({ hashtags, onEditHashtag, }: HashtagListProps) {
  if (hashtags.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center'>
          <span className='text-2xl'>🏷️</span>
        </div>
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-2'>
          아직 해시태그가 없습니다
        </h3>
        <p className='text-gray-600 dark:text-gray-400'>
          첫 번째 해시태그를 생성해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {hashtags.map((hashtag) => (
        <HashtagCard
          key={hashtag.id}
          hashtag={hashtag}
          onEdit={onEditHashtag}
        />
      ))}
    </div>
  );
}
