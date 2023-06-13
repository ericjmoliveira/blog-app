import { PostForm } from '@/components/post-form';
import { getAuthSession } from '@/lib/auth';
import { Post } from '@/interfaces';
import { SignInButton } from '@/components/sign-in-button';

export default async function EditPost({ params }: { params: { id: string } }) {
  const session = await getAuthSession();

  if (!session) {
    return (
      <section>
        <h1 className="mb-4 text-2xl font-medium">You must sign in to edit a post</h1>
        <SignInButton />
      </section>
    );
  }

  const response = await fetch(`http://localhost:3000/api/posts/${params.id}`, {
    next: { revalidate: 30 }
  });
  const data = await response.json();
  const post = data.post as Post;

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Edit post</h1>
      <PostForm userId={session?.user.id!} editPostData={post} />
    </section>
  );
}
