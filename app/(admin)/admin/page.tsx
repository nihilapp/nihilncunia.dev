'use client';

import Link from 'next/link';
import React from 'react';

import { Button } from '@/(common)/_components/ui/button';

export default function AdminDashboard() {
  // TODO: 실제 데이터로 교체
  const stats = {
    totalPosts: 12,
    publishedPosts: 8,
    draftPosts: 4,
    totalCategories: 5,
    totalViews: 1250,
  };

  const recentPosts = [
    {
      id: '1',
      title: '첫 번째 블로그 포스트',
      status: 'published',
      createdAt: '2024-01-15',
      views: 45,
    },
    {
      id: '2',
      title: '두 번째 블로그 포스트',
      status: 'draft',
      createdAt: '2024-01-14',
      views: 0,
    },
    {
      id: '3',
      title: '세 번째 블로그 포스트',
      status: 'published',
      createdAt: '2024-01-13',
      views: 128,
    },
  ];

  return (
    <div className='space-y-8'>
      {/* Welcome Section */}
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>
              관리자 대시보드
            </h1>
            <p className='text-gray-600'>
              블로그 관리 시스템에 오신 것을 환영합니다.
            </p>
          </div>

          <Link href='/admin/posts/new'>
            <Button className='flex items-center space-x-2'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
              <span>새 포스트 작성</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                </svg>
              </div>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>전체 포스트</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.totalPosts}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
              </div>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>발행된 포스트</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.publishedPosts}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>임시 저장</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.draftPosts}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                </svg>
              </div>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>카테고리</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.totalCategories}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                </svg>
              </div>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>총 조회수</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className='bg-white rounded-lg shadow'>
        <div className='px-6 py-4 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>최근 포스트</h2>
            <Link href='/admin/posts'>
              <Button variant='outline' size='sm'>
                전체 보기
              </Button>
            </Link>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  제목
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  상태
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  작성일
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  조회수
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  작업
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {recentPosts.map((post) => (
                <tr key={post.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                      {post.title}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.status === 'published' ? '발행됨' : '임시저장'}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {post.createdAt}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {post.views.toLocaleString()}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className='text-indigo-600 hover:text-indigo-900 mr-4'
                    >
                      편집
                    </Link>
                    {post.status === 'published' && (
                      <Link
                        href={`/posts/${post.id}`}
                        target='_blank'
                        className='text-gray-600 hover:text-gray-900'
                      >
                        보기
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Link href='/admin/posts/new' className='block'>
          <div className='bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center'>
                  <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                  </svg>
                </div>
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-semibold text-gray-900'>새 포스트 작성</h3>
                <p className='text-sm text-gray-600'>새로운 블로그 포스트를 작성합니다</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href='/admin/posts' className='block'>
          <div className='bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center'>
                  <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                </div>
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-semibold text-gray-900'>포스트 관리</h3>
                <p className='text-sm text-gray-600'>모든 포스트를 관리합니다</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href='/admin/categories' className='block'>
          <div className='bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center'>
                  <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                  </svg>
                </div>
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-semibold text-gray-900'>카테고리 관리</h3>
                <p className='text-sm text-gray-600'>포스트 카테고리를 관리합니다</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
