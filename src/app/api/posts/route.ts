import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import slugify from 'slugify';

import { prisma } from '@/lib/prisma';

// /api/posts => CREATE POST
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bodySchema = z.object({
      userId: z.string({ required_error: 'The user ID is required' }).cuid(),
      title: z
        .string({ required_error: 'The post title is required' })
        .min(2, 'The post title must contain at least two characters'),
      subtitle: z
        .string()
        .min(2, 'The post subtitle must contain at least two characters')
        .optional(),
      content: z
        .string({ required_error: 'The post content is required' })
        .min(2, 'The post content must contain at least two characters')
    });

    const data = bodySchema.parse(body);
    const slug = slugify(data.title, { remove: /[*+~.()'"!:@]/g, lower: true });

    const post = await prisma.post.create({ data: { ...data, slug } });

    return NextResponse.json({ post, message: 'The post has been created' }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);

      return NextResponse.json({ error: validationError.details[0].message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
