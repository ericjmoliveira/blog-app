import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const slug = 'some-slug';
    const data = { ...body, slug };

    const post = await prisma.post.create({ data });

    return NextResponse.json({ post, message: 'Post created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
