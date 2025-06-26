import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const places = await prisma.place.findMany({
    take: 5,
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      images: true,
    },
  });

  return NextResponse.json(places);
}
