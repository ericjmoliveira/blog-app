'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface PostFormProps {
  userId: string;
  editPostData?: { id: string; title: string; subtitle?: string; content: string };
}

export function PostForm({ userId, editPostData }: PostFormProps) {
  const [title, setTitle] = useState(editPostData ? editPostData.title : '');
  const [subtitle, setSubtitle] = useState(editPostData ? editPostData.subtitle : '');
  const [content, setContent] = useState(editPostData ? editPostData.content : '');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newPostData = { userId, title, subtitle: subtitle ? subtitle : undefined, content };

    if (!editPostData) {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPostData)
      });

      const data = await response.json();

      if (data.error) {
        return toast(data.error, { type: 'error', theme: 'dark' });
      }

      toast(data.message, { type: 'success', theme: 'dark' });

      return router.push(`/posts/${data.post.id}/${data.post.slug}`);
    }

    const response = await fetch(`http://localhost:3000/api/posts/${editPostData.id}`, {
      method: 'PUT',
      body: JSON.stringify(newPostData)
    });

    const data = await response.json();

    if (data.error) {
      return toast(data.error, { type: 'error', theme: 'dark' });
    }

    toast(data.message, { type: 'success', theme: 'dark' });

    return router.push(`/posts/${data.post.id}/${data.post.slug}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col gap-2">
        <label htmlFor="title" className="text-lg">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border border-gray-500 px-4 py-2"
          placeholder="Post title"
          required
        />
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <label htmlFor="subtitle" className="text-lg">
          Subtitle (optional):
        </label>
        <input
          type="text"
          id="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="rounded-md border border-gray-500 px-4 py-2"
          placeholder="Post subtitle (optional)"
        />
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <label htmlFor="content" className="text-lg">
          Content:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-60 resize-none rounded-md border border-gray-500 px-4 py-2"
          placeholder="Post content"
          required
        />
      </div>
      <button className="rounded-md border border-black bg-black px-4 py-2 font-medium text-white transition hover:border-black hover:bg-white hover:text-black">
        {editPostData ? 'Save changes' : 'Create post'}
      </button>
    </form>
  );
}
