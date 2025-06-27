import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const activities = await prisma.activity.findMany({
    take: 6,
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

  return NextResponse.json(activities);
}
