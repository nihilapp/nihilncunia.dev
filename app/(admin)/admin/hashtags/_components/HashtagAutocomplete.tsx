'use client';

import { HashtagInput } from './hashtag-autocomplete/HashtagInput';
import { HashtagSuggestions } from './hashtag-autocomplete/HashtagSuggestions';
import { SelectedHashtags } from './hashtag-autocomplete/SelectedHashtags';
import { useHashtagAutocomplete } from './hashtag-autocomplete/useHashtagAutocomplete';

import { Label } from '@/(common)/_components/ui/label';

interface HashtagAutocompleteProps {
  selectedHashtags: string[];
  onHashtagsChange: (hashtags: string[]) => void;
  maxHashtags?: number;
  label?: string;
  placeholder?: string;
}

export function HashtagAutocomplete({
  selectedHashtags,
  onHashtagsChange,
  maxHashtags = 10,
  label = '해시태그',
  placeholder = '해시태그를 검색하거나 입력하세요...',
}: HashtagAutocompleteProps) {
  const {
    searchTerm,
    setSearchTerm,
    showSuggestions,
    setShowSuggestions,
    focusedIndex,
    filteredSuggestions,
    inputRef,
    suggestionsRef,
    handleSelectHashtag,
    handleCreateHashtag,
    handleRemoveHashtag,
    handleInputChange,
    handleInputKeyDown,
  } = useHashtagAutocomplete({
    selectedHashtags,
    onHashtagsChange,
    maxHashtags,
  });

  const handleInputFocus = () => {
    if (searchTerm) {
      setShowSuggestions(true);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

  return (
    <div className='space-y-3'>
      <Label>{label}</Label>

      {/* 선택된 해시태그들 */}
      <SelectedHashtags
        selectedHashtags={selectedHashtags}
        onRemoveHashtag={handleRemoveHashtag}
      />

      {/* 입력 필드 */}
      <div className='relative'>
        <HashtagInput
          searchTerm={searchTerm}
          selectedHashtags={selectedHashtags}
          maxHashtags={maxHashtags}
          placeholder={placeholder}
          inputRef={inputRef}
          onInputChange={handleInputChange}
          onInputKeyDown={handleInputKeyDown}
          onInputFocus={handleInputFocus}
          onClearSearch={handleClearSearch}
        />

        {/* 자동완성 제안 */}
        {showSuggestions && (
          <HashtagSuggestions
            filteredSuggestions={filteredSuggestions}
            searchTerm={searchTerm}
            focusedIndex={focusedIndex}
            suggestionsRef={suggestionsRef}
            onSelectHashtag={handleSelectHashtag}
            onCreateHashtag={handleCreateHashtag}
          />
        )}
      </div>

      {/* 도움말 텍스트 */}
      <p className='text-xs text-gray-500 dark:text-gray-400'>
        {selectedHashtags.length}/{maxHashtags} • Enter로 새 해시태그 생성 • 화살표 키로 선택
      </p>
    </div>
  );
}
