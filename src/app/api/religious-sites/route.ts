import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const religiousSites = await prisma.religiousSite.findMany({
    take: 10,
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      images: true,
      place: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  return NextResponse.json(religiousSites);
}
