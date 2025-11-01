import HomeNavbar from "@/components/homepage/homenavbar";
import FooterSection from "@/components/landingpage/footer";
// import Image from "next/image";
import { prisma } from "@/lib/prisma";
import BookingForm from "./booking-form"; // We'll create this

export default async function BookingPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const accommodation = await prisma.accommodation.findUnique({
    where: { slug },
    include: { rooms: true },
  });

  if (!accommodation) return <p>Accommodation not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <HomeNavbar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Book Your Stay at {accommodation.name}
        </h1>

        <BookingForm accommodation={accommodation} />

      </main>

      <FooterSection />
    </div>
  );
}
