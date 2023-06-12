'use client';

import { signIn } from 'next-auth/react';

export function SignInButton() {
  return (
    <button onClick={() => signIn()} className="font-medium hover:underline">
      Sign in
    </button>
  );
}
