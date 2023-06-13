import { PostForm } from '@/components/post-form';
import { SignInButton } from '@/components/sign-in-button';
import { getAuthSession } from '@/lib/auth';

export default async function New() {
  const session = await getAuthSession();

  if (!session) {
    return (
      <section>
        <h1 className="mb-4 text-2xl font-medium">You must sign in to create a post</h1>
        <SignInButton />
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Create new post</h1>
      <PostForm userId={session?.user.id!} />
    </section>
  );
}
