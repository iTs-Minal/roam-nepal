import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      userName,
      rating,
      comment,
      placeId,
      activityId,
      cafeId,
      itineraryId,
      accommodationId,
      religiousSiteId,
    } = body;

    const review = await prisma.review.create({
      data: {
        userId,
        userName,
        rating,
        comment,
        placeId,
        activityId,
        cafeId,
        accommodationId,
        itineraryId,
        religiousSiteId,
      },
    });

    // Update average rating
    let targetType:
      | "place"
      | "activity"
      | "cafe"
      | "accommodation"
      | "itinerary"
      | "religiousSite"
      | null = null;
    let targetId: number | undefined;

    if (placeId) { targetType = "place"; targetId = placeId; }
    if (activityId) { targetType = "activity"; targetId = activityId; }
    if (cafeId) { targetType = "cafe"; targetId = cafeId; }
    if (accommodationId) { targetType = "accommodation"; targetId = accommodationId; }
    if (religiousSiteId) { targetType = "religiousSite"; targetId = religiousSiteId; }
    if (itineraryId) { targetType = "itinerary"; targetId = itineraryId; }

    if (targetType && targetId) {
      const reviews = await prisma.review.findMany({
        where: { [`${targetType}Id`]: targetId },
      });
      const avg = reviews.length ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;

      switch (targetType) {
        case "place":
          await prisma.place.update({
            where: { id: targetId },
            data: { rating: avg },
          });
          break;
        case "activity":
          await prisma.activity.update({
            where: { id: targetId },
            data: { rating: avg },
          });
          break;
        case "cafe":
          await prisma.cafe.update({
            where: { id: targetId },
            data: { rating: avg },
          });
          break;
        case "accommodation":
          await prisma.accommodation.update({
            where: { id: targetId },
            data: { rating: avg },
          });
          break;
        case "religiousSite":
          await prisma.religiousSite.update({
            where: { id: targetId },
            data: { rating: avg },
          });
          break;
        case "itinerary":
          await prisma.itinerary.update({
            where: { id: targetId },
            data: { rating: avg },
          });
          break;
        default:
          break;
      }
    }

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("Review POST error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
