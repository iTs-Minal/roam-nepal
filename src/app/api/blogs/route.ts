// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  console.log("📦 Blog POST body:", body);

  const { title, subtitle, content, images, slug, placeId } = body;

  if (!title || !slug || !content || !images || !Array.isArray(images)) {
     console.log('Missing or invalid fields');
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        subtitle,
        content,
        slug,
        images,
        placeId: placeId ? Number(placeId) : undefined,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("❌ Blog creation failed:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const placeId = url.searchParams.get("placeId");

  try {
    const blogs = await prisma.blog.findMany({
      where: placeId ? { placeId: Number(placeId) } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("❌ Blog fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
