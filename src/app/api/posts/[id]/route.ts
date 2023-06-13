import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import slugify from 'slugify';

import { prisma } from '@/lib/prisma';

interface NextContext {
  params: { id: string };
}

// /api/post/:id => GET POST
export async function GET(request: NextRequest, context: NextContext) {
  try {
    const paramsSchema = z.object({
      id: z.string().cuid({ message: 'The user ID is not a valid CUID' })
    });

    const { id } = paramsSchema.parse(context.params);

    const post = await prisma.post.findFirst({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: 'The post was not found' }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);

      return NextResponse.json({ error: validationError.details[0].message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// /api/posts/:id => EDIT POST
export async function PUT(request: NextRequest, context: NextContext) {
  try {
    const paramsSchema = z.object({
      id: z.string().cuid({ message: 'The user ID is not a valid CUID' })
    });
    const body = await request.json();
    const bodySchema = z
      .object({
        title: z.string().min(2, 'The post title must contain at least two characters'),
        subtitle: z.string().min(2, 'The post subtitle must contain at least two characters'),
        content: z.string().min(2, 'The post content must contain at least two characters')
      })
      .partial()
      .refine((data) => data.title || data.subtitle || data.content, {
        message: 'At least one field for editing must be provided'
      });

    const { id } = paramsSchema.parse(context.params);
    const data = bodySchema.parse(body);

    if (data.title) {
      const slug = slugify(data.title, { remove: /[*+~.()'"!:@]/g, lower: true });

      const post = await prisma.post.update({ where: { id }, data: { ...data, slug } });

      return NextResponse.json({ post, message: 'The post has been edited' }, { status: 200 });
    }

    const post = await prisma.post.update({ where: { id }, data });

    return NextResponse.json({ post, message: 'The post has been edited' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);

      return NextResponse.json({ error: validationError.details[0].message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// /api/posts/:id => DELETE POST
export async function DELETE(request: NextRequest, context: NextContext) {
  try {
    const paramsSchema = z.object({
      id: z.string().cuid({ message: 'The user ID is not a valid CUID' })
    });

    const { id } = paramsSchema.parse(context.params);

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ message: 'The post has been deleted' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);

      return NextResponse.json({ error: validationError.details[0].message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
