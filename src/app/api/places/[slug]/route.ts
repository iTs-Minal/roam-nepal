import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const place = await prisma.place.findUnique({
    where: { slug },
    include: { activities: true, accommodations: true, cafes: true, itineraries: true, religiousSites: true },
  });

  if (!place) return NextResponse.json({ error: "Place not found" }, { status: 404 });

  return NextResponse.json(place);
}
