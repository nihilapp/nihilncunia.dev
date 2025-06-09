'use client';

import { FiHash, FiFileText, FiTrendingUp, FiBarChart } from 'react-icons/fi';

import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import type { Hashtag } from '@/_prisma/client';

interface HashtagWithCount extends Hashtag {
  post_count: number;
}

interface HashtagStatisticsProps {
  hashtags: HashtagWithCount[];
}

export function HashtagStatistics({ hashtags, }: HashtagStatisticsProps) {
  const totalHashtags = hashtags.length;
  const totalPosts = hashtags.reduce((sum, hashtag) => sum + hashtag.post_count, 0);
  const averagePostsPerHashtag = totalHashtags > 0 ? Math.round(totalPosts / totalHashtags * 10) / 10 : 0;
  const mostUsedHashtag = hashtags.reduce(
    (max, hashtag) =>
      hashtag.post_count > max.post_count ? hashtag : max,
    hashtags[0] || { post_count: 0, name: '-', }
  );

  const stats = [
    {
      title: '총 해시태그',
      value: totalHashtags.toString(),
      icon: FiHash,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      title: '연결된 포스트',
      value: totalPosts.toString(),
      icon: FiFileText,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: '평균 사용 빈도',
      value: `${averagePostsPerHashtag}회`,
      icon: FiBarChart,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: '최고 인기 태그',
      value: mostUsedHashtag.name || '-',
      icon: FiTrendingUp,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {stats.map((stat, index) => (
        <Card key={index} className='border-0 shadow-sm'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>

          <CardContent>
            <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
