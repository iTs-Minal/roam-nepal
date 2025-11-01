import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Status = "pending" | "approved" | "rejected";

export async function PATCH(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const { status } = await req.json();

    if (!status) return NextResponse.json({ error: "Missing status" }, { status: 400 });

    // ✅ Ensure correct enum
    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: Number(id) },
      data: {
        status: status as Status,
      },
    });

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error("Booking status update error:", error);
    return NextResponse.json({ error: "Failed to update booking status" }, { status: 500 });
  }
}
