'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button onClick={() => signOut()} className="font-medium hover:underline">
      Sign out
    </button>
  );
}
