interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params, }: CategoryPageProps) {
  const { category, } = await params;

  return (
    <div className='category-posts'>
      <h1>카테고리: {decodeURIComponent(category)}</h1>
      <p>해당 카테고리의 포스트 목록을 확인할 수 있습니다.</p>
    </div>
  );
}
