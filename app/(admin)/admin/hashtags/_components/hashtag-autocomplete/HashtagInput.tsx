'use client';

import { FiX } from 'react-icons/fi';

import { Input } from '@/(common)/_components/ui/input';

interface HashtagInputProps {
  searchTerm: string;
  selectedHashtags: string[];
  maxHashtags: number;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputKeyDown: (e: React.KeyboardEvent) => void;
  onInputFocus: () => void;
  onClearSearch: () => void;
}

export function HashtagInput({
  searchTerm,
  selectedHashtags,
  maxHashtags,
  placeholder,
  inputRef,
  onInputChange,
  onInputKeyDown,
  onInputFocus,
  onClearSearch,
}: HashtagInputProps) {
  const isMaxReached = selectedHashtags.length >= maxHashtags;

  return (
    <div className='relative'>
      <Input
        ref={inputRef}
        type='text'
        value={searchTerm}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        onFocus={onInputFocus}
        placeholder={
          isMaxReached
            ? `최대 ${maxHashtags}개까지 선택 가능합니다`
            : placeholder
        }
        disabled={isMaxReached}
        className='pr-10'
      />

      {searchTerm && (
        <button
          type='button'
          onClick={onClearSearch}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
        >
          <FiX className='w-4 h-4' />
        </button>
      )}
    </div>
  );
}
