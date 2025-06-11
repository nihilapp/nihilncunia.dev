'use client';

import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

import { Card, CardHeader, CardTitle, CardContent } from '@/(common)/_components/ui/card';
import { cn } from '@/_libs';
import type { PostEx } from '@/_entities/posts';

const postCardVariants = cva(
  'transition-shadow hover:shadow-md cursor-pointer',
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface PostCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof postCardVariants> {
  post: PostEx;
}

export function PostCard({ post, className, ...props }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}
      className={cn(postCardVariants({}), 'block', className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        {post.excerpt && (
          <CardContent>
            <p className='text-sm text-muted-foreground'>{post.excerpt}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
