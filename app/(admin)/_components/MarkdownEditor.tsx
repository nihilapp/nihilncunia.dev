'use client';

import React, { useState, useCallback } from 'react';
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

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = '마크다운으로 글을 작성해보세요...',
  className = '',
}: MarkdownEditorProps) {
  const [ activeTab, setActiveTab, ] = useState<'write' | 'preview'>('write');

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [ onChange, ]
  );

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Editor Header */}
      <div className='flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2'>
        <div className='flex space-x-4'>
          <button
            type='button'
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
              activeTab === 'write'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            작성
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
              activeTab === 'preview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            미리보기
          </button>
        </div>

        <div className='text-xs text-gray-500'>
          {value.length} characters
        </div>
      </div>

      {/* Editor Content */}
      <div className='flex-1 flex'>
        {/* Desktop: Split View */}
        <div className='hidden md:flex flex-1'>
          {/* Left: Editor */}
          <div className='w-1/2 border-r border-gray-200'>
            <textarea
              value={value}
              onChange={handleTextareaChange}
              placeholder={placeholder}
              className='w-full h-full p-4 border-0 resize-none focus:outline-none font-mono text-sm leading-relaxed'
              style={{ minHeight: '500px', }}
            />
          </div>

          {/* Right: Preview */}
          <div className='w-1/2 overflow-y-auto'>
            <div className='p-4 prose prose-sm max-w-none'>
              {value ? (
                <ReactMarkdown
                  remarkPlugins={[ remarkGfm, ]}
                  rehypePlugins={[ rehypeHighlight, rehypeRaw, ]}
                  components={{
                    h1: ({ children, }) => (
                      <h1 className='text-2xl font-bold mb-4 text-gray-900'>{children}</h1>
                    ),
                    h2: ({ children, }) => (
                      <h2 className='text-xl font-bold mb-3 text-gray-900'>{children}</h2>
                    ),
                    h3: ({ children, }) => (
                      <h3 className='text-lg font-bold mb-2 text-gray-900'>{children}</h3>
                    ),
                    p: ({ children, }) => (
                      <p className='mb-4 text-gray-700 leading-relaxed'>{children}</p>
                    ),
                    ul: ({ children, }) => (
                      <ul className='mb-4 pl-6 list-disc'>{children}</ul>
                    ),
                    ol: ({ children, }) => (
                      <ol className='mb-4 pl-6 list-decimal'>{children}</ol>
                    ),
                    li: ({ children, }) => (
                      <li className='mb-1 text-gray-700'>{children}</li>
                    ),
                    blockquote: ({ children, }) => (
                      <blockquote className='border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4'>
                        {children}
                      </blockquote>
                    ),
                    code: ({ children, className, }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className='bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-600'>
                          {children}
                        </code>
                      ) : (
                        <code className={className}>{children}</code>
                      );
                    },
                    pre: ({ children, }) => (
                      <pre className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4'>
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {value}
                </ReactMarkdown>
              ) : (
                <div className='text-gray-400 italic'>
                  미리보기가 여기에 표시됩니다...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: Tab View */}
        <div className='md:hidden flex-1'>
          {activeTab === 'write' ? (
            <textarea
              value={value}
              onChange={handleTextareaChange}
              placeholder={placeholder}
              className='w-full h-full p-4 border-0 resize-none focus:outline-none font-mono text-sm leading-relaxed'
              style={{ minHeight: '500px', }}
            />
          ) : (
            <div className='h-full overflow-y-auto'>
              <div className='p-4 prose prose-sm max-w-none'>
                {value ? (
                  <ReactMarkdown
                    remarkPlugins={[ remarkGfm, ]}
                    rehypePlugins={[ rehypeHighlight, rehypeRaw, ]}
                  >
                    {value}
                  </ReactMarkdown>
                ) : (
                  <div className='text-gray-400 italic'>
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
