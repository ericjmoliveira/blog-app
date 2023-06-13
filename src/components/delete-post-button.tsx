'use client';

import { toast } from 'react-toastify';

export function DeletePostButton({ postId }: { postId: string }) {
  const deletePost = async () => {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (data.error) {
      return toast(data.error, { type: 'error', theme: 'dark' });
    }

    toast(data.message, { type: 'success', theme: 'dark' });
  };

  return (
    <button onClick={deletePost} className="underline">
      Delete
    </button>
  );
}
