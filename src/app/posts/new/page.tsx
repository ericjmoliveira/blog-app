import { PostForm } from '@/components/post-form';
import { getAuthSession } from '@/lib/auth';

export default async function New() {
  const session = await getAuthSession();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Create new post</h1>
      <PostForm userId={session?.user.id!} />
    </section>
  );
}
