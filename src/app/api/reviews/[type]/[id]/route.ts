import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { type: string; id: string } }
) {
  const { type, id } = context.params;

  // Map type to correct field in Review model
  const typeToFieldMap: Record<string, string> = {
    place: "placeId",
    activity: "activityId",
    cafe: "cafeId",
    accommodation: "accommodationId",
    itinerary: "itineraryId",
    religiousSite: "religiousSiteId",
  };

  const fieldName = typeToFieldMap[type];
  if (!fieldName) return NextResponse.json({ error: "Invalid type" }, { status: 400 });

  const reviews = await prisma.review.findMany({
    where: { [fieldName]: Number(id) },
    orderBy: { createdAt: "desc" },
  });

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return NextResponse.json({ reviews, avgRating });
}
