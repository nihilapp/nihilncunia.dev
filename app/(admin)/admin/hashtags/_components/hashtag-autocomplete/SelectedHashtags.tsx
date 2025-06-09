'use client';

import { FiHash, FiX } from 'react-icons/fi';

import { Badge } from '@/(common)/_components/ui/badge';

interface SelectedHashtagsProps {
  selectedHashtags: string[];
  onRemoveHashtag: (hashtag: string) => void;
}

export function SelectedHashtags({
  selectedHashtags,
  onRemoveHashtag,
}: SelectedHashtagsProps) {
  if (selectedHashtags.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {selectedHashtags.map((hashtag) => (
        <Badge
          key={hashtag}
          variant='secondary'
          className='flex items-center gap-1 px-2 py-1'
        >
          <FiHash className='w-3 h-3' />
          {hashtag}
          <button
            type='button'
            onClick={() => onRemoveHashtag(hashtag)}
            className='ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5'
          >
            <FiX className='w-3 h-3' />
          </button>
        </Badge>
      ))}
    </div>
  );
}
