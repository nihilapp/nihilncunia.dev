interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;

  return (
    <div className="post-detail">
      <h1>포스트 상세 페이지</h1>
      <p>포스트 ID: {id}</p>
    </div>
  );
}
