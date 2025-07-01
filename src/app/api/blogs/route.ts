import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { title, subtitle, content, image, slug } = body;

  if (!title || !slug || !content || !image) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const blog = await prisma.blog.create({
    data: { title, subtitle, content, image, slug },
  });

  return NextResponse.json(blog);
}

export async function GET() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    take:5,
  });

  return NextResponse.json(blogs);
}
