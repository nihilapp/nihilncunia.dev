import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Checkbox } from '@/(common)/_components/ui/checkbox';
import { PostStatus } from '@/_entities/posts';

interface PostCardProps {
  post: any;
  checked: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  onView?: (id: string) => void;
}

function getStatusBadge(status: PostStatus, isPublished: boolean) {
  if (isPublished && status === PostStatus.PUBLISHED) {
    return (
      <span className='inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-sm'>
        <span className='w-1.5 h-1.5 bg-white rounded-full mr-1.5'></span>
        발행됨
      </span>
    );
  }
  switch (status) {
    case PostStatus.DRAFT:
      return (
        <span className='inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full shadow-sm'>
          <span className='w-1.5 h-1.5 bg-white rounded-full mr-1.5'></span>
          초안
        </span>
      );
    case PostStatus.PENDING:
      return (
        <span className='inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow-sm'>
          <span className='w-1.5 h-1.5 bg-white rounded-full mr-1.5'></span>
          대기
        </span>
      );
    case PostStatus.ARCHIVED:
      return (
        <span className='inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-full shadow-sm'>
          <span className='w-1.5 h-1.5 bg-white rounded-full mr-1.5'></span>
          보관됨
        </span>
      );
    default:
      return (
        <span className='inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full shadow-sm'>
          <span className='w-1.5 h-1.5 bg-white rounded-full mr-1.5'></span>
          {status}
        </span>
      );
  }
}

export function PostCard({ post, checked, onSelect, onEdit, onDelete, onView, }: PostCardProps) {
  return (
    <Card
      className='bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600'
    >
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
          <div className='flex-1 flex items-start space-x-4'>
            <Checkbox
              checked={checked}
              onCheckedChange={() => onSelect(post.id)}
              aria-labelledby={`title-${post.id}`}
              className='mt-1.5'
            />
            <div className='flex-1'>
              <CardTitle
                id={`title-${post.id}`}
                className='text-xl mb-3 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'
              >
                {post.title}
              </CardTitle>
              <div className='flex items-center flex-wrap gap-3 text-sm'>
                {getStatusBadge(post.status, post.is_published)}
                <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
                <span className='text-gray-500 dark:text-gray-400 font-medium'>
                  {new Date(post.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                {post.category && (
                  <>
                    <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
                    <span className='px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full'>
                      {post.category.name}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='flex space-x-2 ml-4'>
            {onView && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => onView(post.id)}
                className='px-3 py-2 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/20 text-gray-600 dark:text-gray-400 transition-all duration-200'
              >
                보기
              </Button>
            )}
            <Button
              variant='outline'
              size='sm'
              onClick={() => onEdit(post.id)}
              className='px-3 py-2 border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-all duration-200'
            >
              수정
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => onDelete(post.id, post.title)}
              className='px-3 py-2 border-2 border-red-300 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-200 disabled:opacity-50'
            >
              삭제
            </Button>
          </div>
        </div>
      </CardHeader>
      {post.excerpt && (
        <CardContent className='pt-0'>
          <div className='p-4 bg-gray-50 dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600'>
            <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2'>
              {post.excerpt}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
