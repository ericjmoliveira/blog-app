import Link from 'next/link';
import Image from 'next/image';

import { getAuthSession } from '@/lib/auth';
import { SignInButton } from './sign-in-button';
import { SignOutButton } from './sign-out-button';

export async function Sidebar() {
  const session = await getAuthSession();

  return (
    <aside className="fixed left-0 top-0 min-h-screen w-1/5 bg-black p-8 text-white">
      {session ? (
        <section>
          <div className="mb-16 flex items-center gap-2">
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
                <Link href={'/'} className="hover:underline">
                  View posts list
                </Link>
              </li>
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
