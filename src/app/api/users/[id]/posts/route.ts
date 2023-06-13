import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface NextContext {
  params: { id: string };
}

export async function GET(request: NextRequest, context: NextContext) {
  try {
    const id = context.params.id;
    const posts = await prisma.post.findMany({
      where: { userId: id },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
