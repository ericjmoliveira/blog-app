import Link from 'next/link';
import { getAuthSession } from '@/lib/auth';

import { Post } from '@/interfaces';

export default async function Home() {
  const session = await getAuthSession();

  if (session) {
    const response = await fetch(`http://localhost:3000/api/users/${session.user.id}/posts`);
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
                  <button className="underline">Edit</button>
                  <button className="underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }

  return <h1 className="text-xl font-medium">Home</h1>;
}
