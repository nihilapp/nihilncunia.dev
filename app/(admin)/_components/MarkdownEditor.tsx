'use client';

import React, { useState, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import 'highlight.js/styles/github.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// 마크다운에서 순수 텍스트만 추출하는 함수
const extractTextFromMarkdown = (markdown: string): string => {
  if (!markdown) return '';

  return markdown
    // 코드 블록 제거 (```...```)
    .replace(/```[\s\S]*?```/g, '')
    // 인라인 코드 제거 (`...`)
    .replace(/`[^`]*`/g, '')
    // 링크 제거 ([text](url) -> text)
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // 이미지 제거 (![alt](url))
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    // 헤딩 마크 제거 (# ## ###)
    .replace(/^#{1,6}\s+/gm, '')
    // 볼드/이탤릭 제거 (**text**, *text*)
    .replace(/\*{1,2}([^*]*)\*{1,2}/g, '$1')
    .replace(/_{1,2}([^_]*)_{1,2}/g, '$1')
    // 취소선 제거 (~~text~~)
    .replace(/~~([^~]*)~~/g, '$1')
    // 인용구 제거 (> text)
    .replace(/^>\s+/gm, '')
    // 리스트 마커 제거 (- * + 1.)
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // 수평선 제거 (--- ***)
    .replace(/^[\s]*[-*_]{3,}[\s]*$/gm, '')
    // 테이블 구분자 제거 (|)
    .replace(/\|/g, ' ')
    // 여러 공백을 하나로
    .replace(/\s+/g, ' ')
    // 앞뒤 공백 제거
    .trim();
};

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = '마크다운으로 글을 작성해보세요...',
  className = '',
}: MarkdownEditorProps) {
  const [ showPreview, setShowPreview, ] = useState(false);

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [ onChange, ]
  );

  // 글자수 계산 (메모이제이션으로 성능 최적화)
  const characterCounts = useMemo(() => {
    const rawLength = value.length;
    const textLength = extractTextFromMarkdown(value).length;
    return { rawLength, textLength, };
  }, [ value, ]);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Editor Header */}
      <div className='flex items-center justify-between border-b border-gray-200 dark:border-slate-600 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 px-6 py-4'>
        <div className='flex items-center space-x-2'>
          {/* 마크다운 탭 (항상 활성) */}
          <div className='px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md flex items-center gap-2'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
            </svg>
            마크다운
          </div>

          {/* 미리보기 탭 (토글) */}
          <button
            type='button'
            onClick={() => setShowPreview(!showPreview)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
              showPreview
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-600 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-300 dark:border-slate-500'
            }`}
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
            </svg>
            미리보기
            {showPreview && (
              <span className='text-xs bg-white/20 px-1.5 py-0.5 rounded'>ON</span>
            )}
          </button>
        </div>

        <div className='flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400'>
          <div className='flex items-center gap-2'>
            <span className='font-medium text-blue-600 dark:text-blue-400'>
              {characterCounts.textLength.toLocaleString()} 글자
            </span>
            <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
            <span className='text-gray-400'>
              원본 {characterCounts.rawLength.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className='flex-1 flex'>
        {/* Desktop: Split or Single View */}
        <div className='hidden md:flex flex-1'>
          {/* Editor (항상 표시) */}
          <div className={`${showPreview ? 'w-1/2 border-r border-gray-200 dark:border-slate-600' : 'w-full'} transition-all duration-300`}>
            <textarea
              value={value}
              onChange={handleTextareaChange}
              placeholder={placeholder}
              className='w-full h-full p-4 border-0 resize-none focus:outline-none font-mono text-sm leading-relaxed bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
              style={{ minHeight: '500px', }}
            />
          </div>

          {/* Preview (조건부 표시) */}
          {showPreview && (
            <div className='w-1/2 overflow-y-auto bg-gray-50 dark:bg-slate-700/50'>
              <div className='p-4 prose prose-sm max-w-none dark:prose-invert'>
                {value ? (
                  <ReactMarkdown
                    remarkPlugins={[ remarkGfm, ]}
                    rehypePlugins={[ rehypeHighlight, rehypeRaw, ]}
                    components={{
                      h1: ({ children, }) => (
                        <h1 className='text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-600 pb-2'>
                          {children}
                        </h1>
                      ),
                      h2: ({ children, }) => (
                        <h2 className='text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 mt-6'>
                          {children}
                        </h2>
                      ),
                      h3: ({ children, }) => (
                        <h3 className='text-lg font-bold mb-2 text-gray-900 dark:text-gray-100 mt-4'>
                          {children}
                        </h3>
                      ),
                      p: ({ children, }) => (
                        <p className='mb-4 text-gray-700 dark:text-gray-300 leading-relaxed'>
                          {children}
                        </p>
                      ),
                      ul: ({ children, }) => (
                        <ul className='mb-4 pl-6 list-disc text-gray-700 dark:text-gray-300'>
                          {children}
                        </ul>
                      ),
                      ol: ({ children, }) => (
                        <ol className='mb-4 pl-6 list-decimal text-gray-700 dark:text-gray-300'>
                          {children}
                        </ol>
                      ),
                      li: ({ children, }) => (
                        <li className='mb-1'>{children}</li>
                      ),
                      blockquote: ({ children, }) => (
                        <blockquote className='border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r-lg'>
                          {children}
                        </blockquote>
                      ),
                      code: ({ children, className, }) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className='bg-gray-200 dark:bg-slate-600 px-1.5 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400'>
                            {children}
                          </code>
                        ) : (
                          <code className={className}>{children}</code>
                        );
                      },
                      pre: ({ children, }) => (
                        <pre className='bg-gray-900 dark:bg-slate-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 border border-gray-700'>
                          {children}
                        </pre>
                      ),
                      a: ({ children, href, }) => (
                        <a
                          href={href}
                          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {children}
                        </a>
                      ),
                      img: ({ src, alt, }) => (
                        <img
                          src={src}
                          alt={alt}
                          className='max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-600 my-4'
                        />
                      ),
                    }}
                  >
                    {value}
                  </ReactMarkdown>
                ) : (
                  <div className='text-gray-400 dark:text-gray-500 italic text-center py-12'>
                    <svg className='w-12 h-12 mx-auto mb-4 opacity-50' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                    </svg>
                    미리보기가 여기에 표시됩니다...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile: Editor only (미리보기는 토글 시에만) */}
        <div className='md:hidden flex-1'>
          {!showPreview ? (
            <textarea
              value={value}
              onChange={handleTextareaChange}
              placeholder={placeholder}
              className='w-full h-full p-4 border-0 resize-none focus:outline-none font-mono text-sm leading-relaxed bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
              style={{ minHeight: '500px', }}
            />
          ) : (
            <div className='h-full overflow-y-auto bg-gray-50 dark:bg-slate-700/50'>
              <div className='p-4 prose prose-sm max-w-none dark:prose-invert'>
                {value ? (
                  <ReactMarkdown
                    remarkPlugins={[ remarkGfm, ]}
                    rehypePlugins={[ rehypeHighlight, rehypeRaw, ]}
                  >
                    {value}
                  </ReactMarkdown>
                ) : (
                  <div className='text-gray-400 dark:text-gray-500 italic text-center py-12'>
                    미리보기가 여기에 표시됩니다...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
