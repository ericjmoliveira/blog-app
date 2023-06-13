import { Post } from '@/interfaces';

export default async function PostPage({ params }: { params: { id: string; slug: string } }) {
  const response = await fetch(`http://localhost:3000/api/posts/${params.id}`, {
    next: { revalidate: 30 }
  });
  const data = await response.json();
  const post = data.post as Post;

  if (post) {
    return (
      <section>
        <section className="mb-4 border-b border-b-gray-500">
          <h1 className="mb-2 text-3xl font-medium">{post.title}</h1>
          <h2 className="mb-4 text-xl font-medium text-gray-600">
            {post.subtitle && post.subtitle}
          </h2>
          <p className="text-md mb-4 font-medium text-gray-600">
            Last update in: {new Date(post.updatedAt).toDateString()}
          </p>
        </section>
        <section className="whitespace-break-spaces">{post.content}</section>
      </section>
    );
  }

  return (
    <section>
      <p className="text-xl font-medium">Sorry, the post you are looking for was not found.</p>
    </section>
  );
}
