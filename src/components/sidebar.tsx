import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SignInButton } from './sign-in-button';
import { SignOutButton } from './sign-out-button';

export async function Sidebar() {
  const session = await getServerSession(authOptions);

  return (
    <aside className="fixed top-0 left-0 min-h-screen w-1/5 bg-black text-white p-8">
      {session ? (
        <section>
          <div className="flex items-center gap-2 mb-16">
            <Image
              src={session?.user.image!}
              width={40}
              height={40}
              alt="GitHub profile image"
              className="rounded-full"
            />
            <p className="text-xl font-medium">{session?.user.name}</p>
          </div>
          <nav>
            <ul className="flex flex-col gap-8 font-medium">
              <li>
                <Link href={'/posts/new'} className="hover:underline">
                  Create new post
                </Link>
              </li>
              <li>
                <SignOutButton />
              </li>
            </ul>
          </nav>
        </section>
      ) : (
        <section>
          <div className="mb-8">
            <p className="text-xl font-medium">Not signed in</p>
          </div>
          <nav>
            <ul>
              <li>
                <SignInButton />
              </li>
            </ul>
          </nav>
        </section>
      )}
    </aside>
  );
}
