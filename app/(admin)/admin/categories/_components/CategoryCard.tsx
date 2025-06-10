'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  FiEdit3,
  FiTrash2,
  FiFileText
} from 'react-icons/fi';

import { Badge } from '@/(common)/_components/ui/badge';
import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { CategoriesApi } from '@/_entities/categories';
import type { Category } from '@/_prisma/client';

interface CategoryWithCount extends Category {
  post_count: number;
  published_post_count: number;
}

interface CategoryCardProps {
  category: CategoryWithCount;
  onEdit: (category: CategoryWithCount) => void;
}

export function CategoryCard({ category, onEdit, }: CategoryCardProps) {
  const [ isDeleting, setIsDeleting, ] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: CategoriesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'categories', ], });
      setIsDeleting(false);
    },
    onError: (error: any) => {
      console.error('카테고리 삭제 실패:', error);
      alert('카테고리 삭제에 실패했습니다.');
      setIsDeleting(false);
    },
  });

  const handleDelete = async () => {
    if (category.post_count > 0) {
      alert('해당 카테고리에 포스트가 존재하여 삭제할 수 없습니다. 먼저 포스트를 다른 카테고리로 이동하거나 삭제해주세요.');
      return;
    }

    if (confirm(`"${category.name}" 카테고리를 삭제하시겠습니까?`)) {
      setIsDeleting(true);
      deleteMutation.mutate(category.id);
    }
  };

  return (
    <Card className='hover:shadow-md transition-all duration-200 group'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            {category.color && (
              <div
                className='w-4 h-4 rounded-full flex-shrink-0'
                style={{ backgroundColor: category.color, }}
              />
            )}
            <div className='min-w-0 flex-1'>
              <CardTitle className='text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate'>
                {category.name}
              </CardTitle>
              <CardDescription className='text-sm'>
                {category.slug}
              </CardDescription>
            </div>
          </div>

          <div className='flex items-center gap-1'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => onEdit(category)}
              className='h-8 w-8 p-0'
            >
              <FiEdit3 className='w-4 h-4' />
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleDelete}
              disabled={isDeleting}
              className='h-8 w-8 p-0 hover:text-destructive'
            >
              <FiTrash2 className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className='pt-0'>
        {category.description && (
          <p className='text-sm text-muted-foreground mb-4 line-clamp-2'>
            {category.description}
          </p>
        )}

        <div className='flex items-center gap-4 text-sm'>
          <Badge variant='outline' className='flex items-center gap-1'>
            <FiFileText className='w-3 h-3' />
            전체 {category.post_count}개
          </Badge>
          <Badge variant='outline' className='flex items-center gap-1 text-green-600 border-green-200'>
            <FiFileText className='w-3 h-3' />
            공개 {category.published_post_count}개
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
