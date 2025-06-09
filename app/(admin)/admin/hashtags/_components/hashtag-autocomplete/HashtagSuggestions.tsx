'use client';

import { FiHash } from 'react-icons/fi';

import { Badge } from '@/(common)/_components/ui/badge';
import type { Hashtag } from '@/_prisma/client';

interface HashtagWithCount extends Hashtag {
  post_count: number;
}

interface HashtagSuggestionsProps {
  filteredSuggestions: HashtagWithCount[];
  searchTerm: string;
  focusedIndex: number;
  suggestionsRef: React.RefObject<HTMLDivElement | null>;
  onSelectHashtag: (hashtagName: string) => void;
  onCreateHashtag: (hashtagName: string) => void;
}

export function HashtagSuggestions({
  filteredSuggestions,
  searchTerm,
  focusedIndex,
  suggestionsRef,
  onSelectHashtag,
  onCreateHashtag,
}: HashtagSuggestionsProps) {
  return (
    <div
      ref={suggestionsRef}
      className='absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto'
    >
      {filteredSuggestions.length > 0 ? (
        <>
          {filteredSuggestions.map((hashtag: HashtagWithCount, index: number) => (
            <button
              key={hashtag.id}
              type='button'
              onClick={() => onSelectHashtag(hashtag.name)}
              className={`w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between ${
                index === focusedIndex ? 'bg-gray-50 dark:bg-gray-700' : ''
              }`}
            >
              <div className='flex items-center gap-2'>
                <FiHash className='w-4 h-4 text-emerald-600 dark:text-emerald-400' />
                <span>{hashtag.name}</span>
              </div>
              <Badge variant='outline' className='text-xs'>
                {hashtag.post_count}개 포스트
              </Badge>
            </button>
          ))}
        </>
      ) : searchTerm.trim() ? (
        <button
          type='button'
          onClick={() => onCreateHashtag(searchTerm.trim())}
          className={`w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 ${
            focusedIndex === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''
          }`}
        >
          <FiHash className='w-4 h-4 text-emerald-600 dark:text-emerald-400' />
          <span>"{searchTerm.trim()}" 새로 생성</span>
        </button>
      ) : (
        <div className='px-3 py-2 text-gray-500 dark:text-gray-400 text-sm'>
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
}
