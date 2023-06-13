import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { prisma } from '@/lib/prisma';

interface NextContext {
  params: { id: string };
}

// /api/users/:id/posts => GET ALL USER POSTS
export async function GET(request: NextRequest, context: NextContext) {
  try {
    const paramsSchema = z.object({
      id: z.string().cuid({ message: 'The user ID is not a valid CUID' })
    });

    const { id } = paramsSchema.parse(context.params);

    const posts = await prisma.post.findMany({
      where: { userId: id },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);

      return NextResponse.json({ error: validationError.details[0].message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
