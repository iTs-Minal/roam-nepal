import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      accommodationId,
      checkInDate,
      checkOutDate,
      guests,
      fullName,
      email,
      phone,
      message,
      userId,
    } = body;

    if (!accommodationId || !checkInDate || !checkOutDate || !fullName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Minimal creation without rooms relation
    const booking = await prisma.booking.create({
      data: {
        accommodationId,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        guests: Number(guests),
        fullName,
        email,
        phone,
        message,
        status: "pending" as const,
        userId: userId || null,
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
