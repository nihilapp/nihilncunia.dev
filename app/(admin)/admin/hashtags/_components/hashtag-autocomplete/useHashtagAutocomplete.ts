'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';

import { HashtagsApi } from '@/_entities/hashtags';
import type { Hashtag } from '@/_prisma/client';

interface HashtagWithCount extends Hashtag {
  post_count: number;
}

interface UseHashtagAutocompleteProps {
  selectedHashtags: string[];
  onHashtagsChange: (hashtags: string[]) => void;
  maxHashtags: number;
}

export function useHashtagAutocomplete({
  selectedHashtags,
  onHashtagsChange,
  maxHashtags,
}: UseHashtagAutocompleteProps) {
  const [ searchTerm, setSearchTerm, ] = useState('');
  const [ showSuggestions, setShowSuggestions, ] = useState(false);
  const [ focusedIndex, setFocusedIndex, ] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // 해시태그 검색
  const { data: searchResults, } = useQuery({
    queryKey: [ 'hashtags-search', searchTerm, ],
    queryFn: () => HashtagsApi.searchForAutocomplete(searchTerm, 10),
    enabled: searchTerm.length > 0,
    staleTime: 30000,
  });

  const suggestions = (searchResults?.response || []) as HashtagWithCount[];
  const filteredSuggestions = suggestions.filter((hashtag: HashtagWithCount) => !selectedHashtags.includes(hashtag.name));

  const handleSelectHashtag = (hashtagName: string) => {
    if (selectedHashtags.length >= maxHashtags) {
      return;
    }

    if (!selectedHashtags.includes(hashtagName)) {
      onHashtagsChange([ ...selectedHashtags, hashtagName, ]);
    }

    setSearchTerm('');
    setShowSuggestions(false);
    setFocusedIndex(-1);
    inputRef.current?.focus();
  };

  const handleCreateHashtag = (hashtagName: string) => {
    if (selectedHashtags.length >= maxHashtags) {
      return;
    }

    const cleanName = hashtagName.replace(/^#/, '').trim();
    if (cleanName && !selectedHashtags.includes(cleanName)) {
      onHashtagsChange([ ...selectedHashtags, cleanName, ]);
    }

    setSearchTerm('');
    setShowSuggestions(false);
    setFocusedIndex(-1);
  };

  const handleRemoveHashtag = (hashtagToRemove: string) => {
    onHashtagsChange(selectedHashtags.filter(tag => tag !== hashtagToRemove));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    setFocusedIndex(-1);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showSuggestions && searchTerm.trim()) {
      e.preventDefault();
      handleCreateHashtag(searchTerm.trim());
    }
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showSuggestions) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev =>
            prev < filteredSuggestions.length - 1 ? prev + 1 : prev);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && filteredSuggestions[focusedIndex]) {
            handleSelectHashtag(filteredSuggestions[focusedIndex].name);
          } else if (searchTerm.trim()) {
            handleCreateHashtag(searchTerm.trim());
          }
          break;
        case 'Escape':
          setShowSuggestions(false);
          setFocusedIndex(-1);
          break;
      }
    };

    if (showSuggestions) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [ showSuggestions, focusedIndex, filteredSuggestions, searchTerm, ]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
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
  };
}
