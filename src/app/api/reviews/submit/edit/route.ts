import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId} = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { comment, rating, placeId, activityId, religiousSiteId, cafeId, itineraryId, accommodationId } = await req.json();

    if (!comment || !rating) {
      return NextResponse.json({ error: "Missing comment or rating" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereCondition: any = { userId };
    if (placeId) whereCondition.placeId = Number(placeId);
    if (activityId) whereCondition.activityId = Number(activityId);
    if (religiousSiteId) whereCondition.religiousSiteId = Number(religiousSiteId);
    if (cafeId) whereCondition.cafeId = Number(cafeId);
    if (itineraryId) whereCondition.itineraryId = Number(itineraryId);
    if (accommodationId) whereCondition.accommodationId = Number(accommodationId);

    const review = await prisma.review.upsert({
      where: whereCondition,
      update: {
        comment,
        rating,
        updatedAt: new Date(),
      },
      create: {
        userId,
        comment,
        rating,
        placeId: placeId ? Number(placeId) : null,
        activityId: activityId ? Number(activityId) : null,
        religiousSiteId: religiousSiteId ? Number(religiousSiteId) : null,
        itineraryId: itineraryId ? Number(itineraryId) : null,
        cafeId: cafeId ? Number(cafeId) : null,
        accommodationId: accommodationId ? Number(accommodationId) : null,
      },
    });

    return NextResponse.json(review);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Failed to submit review:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
