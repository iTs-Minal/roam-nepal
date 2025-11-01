/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { comment, rating, type, itemId } = await req.json();
  if (!type || !itemId) return NextResponse.json({ error: "Missing review target" }, { status: 400 });

  const typeToFieldMap: Record<string, string> = {
    place: "placeId",
    activity: "activityId",
    cafe: "cafeId",
    accommodation: "accommodationId",
    itinerary: "itineraryId",
    religiousSite: "religiousSiteId",
  };

  const fieldName = typeToFieldMap[type];
  if (!fieldName) return NextResponse.json({ error: "Invalid review type" }, { status: 400 });

  const clerkUser = await (await clerkClient()).users.getUser(userId);
  const userName = clerkUser.fullName || "Anonymous";

  // Only one review per user per item
  const existingReview = await prisma.review.findFirst({
    where: { userId, [fieldName]: itemId },
  });

  const reviewData: any = { userId, userName, comment, rating, [fieldName]: itemId };

  let savedReview;
  if (existingReview) {
    savedReview = await prisma.review.update({
      where: { id: existingReview.id },
      data: reviewData,
    });
  } else {
    savedReview = await prisma.review.create({ data: reviewData });
  }

  return NextResponse.json(savedReview);
}
