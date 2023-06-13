import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface NextContext {
  params: { id: string };
}

export async function GET(request: NextRequest, context: NextContext) {
  try {
    const id = context.params.id;
    const post = await prisma.post.findFirst({ where: { id } });

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: NextContext) {
  try {
    const id = context.params.id;
    const data = await request.json();
    const post = await prisma.post.update({ where: { id }, data });

    return NextResponse.json({ post, message: 'Post updated!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: NextContext) {
  try {
    const id = context.params.id;
    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ message: 'Post deleted!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
