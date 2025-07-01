// app/api/blogs/[id]/route.ts

import { NextResponse } from 'next/server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id: string } }) {
    const blog = await prisma.blog.findUnique({ where: { id: Number(context.params.id) } });
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json(blog);
}

export async function PUT(req: Request, context: { params: { id: string } }) {
    const data = await req.json();
    try {
        const updated = await prisma.blog.update({
            where: { id: Number(context.params.id) },
            data,
        });
        return NextResponse.json(updated);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}



export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  try {
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ message: 'Blog deleted successfully' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}