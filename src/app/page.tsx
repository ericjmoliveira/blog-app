import Link from 'next/link';

import { getAuthSession } from '@/lib/auth';
import { Post } from '@/interfaces';
import { SignInButton } from '@/components/sign-in-button';
import { DeletePostButton } from '@/components/delete-post-button';

export const metadata = {
  title: 'Posts List'
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    return (
      <section>
        <h1 className="mb-4 text-2xl font-medium">You must sign in to view your posts</h1>
        <SignInButton />
      </section>
    );
  }

  const response = await fetch(`http://localhost:3000/api/users/${session.user.id}/posts`, {
    next: { revalidate: 30 }
  });
  const data = await response.json();
  const posts = data.posts as Post[];

  return (
    <section>
      <h1 className="mb-16 text-2xl font-medium">Posts List</h1>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th className="px-4 py-2">TITLE</th>
            <th className="px-4 py-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-4 py-2">{post.title}</td>
              <td className="flex items-center justify-evenly px-4 py-2">
                <Link href={`/posts/${post.id}/${post.slug}`} className="underline">
                  View
                </Link>
                <Link href={`/posts/edit/${post.id}`} className="underline">
                  Edit
                </Link>
                <DeletePostButton postId={post.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
