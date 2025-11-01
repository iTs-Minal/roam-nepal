import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        accommodation: true, // singular, matches your schema
        // rooms: true, // only if you have a proper relation
      },
    });

    const formatted = bookings.map((b) => ({
      id: b.id,
      accommodationName: b.accommodation.name,
      // rooms: b.rooms?.map((r) => r.name) || [], // uncomment if rooms relation exists
      userFullName: b.fullName,
      userEmail: b.email,
      userPhone: b.phone,
      guests: b.guests,
      checkIn: b.checkInDate,
      checkOut: b.checkOutDate,
      message: b.message,
      status: b.status,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
