
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FaMapMarkerAlt } from "react-icons/fa";
import HomeNavbar from "@/components/homepage/homenavbar";
import FooterSection from "@/components/landingpage/footer";
import ReviewsDisplay from "@/components/ui/review-display";
import ReviewSection from "@/components/ui/review";
import BookingWidget from "../booking-widget";


const Map = dynamic(() => import("@/components/ui/map"));

type ItineraryWithRelations = Awaited<ReturnType<typeof prisma.itinerary.findUnique>> & {
  place: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    // Add other fields if needed
  } | null;
  days: Array<{
    dayNumber: number;
    title: string;
    summary: string;
  }>;
  departures: Array<{
    id: number;
    date: Date;
    startTime: string;
    seatsAvailable: number;
    priceOverride?: number | null;
  }>;
  pricePerPerson?: number;
};

export default async function ItineraryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const itinerary = await prisma.itinerary.findUnique({
    where: { slug },
    include: {
      place: true,
      days: true,
      departures: true,
    },
    // Ensure pricePerPerson is selected
  }) as ItineraryWithRelations;

  if (!itinerary) return <div>Itinerary not found</div>;

  return (
    <>
      <HomeNavbar />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">

        {/* Hero */}
        <section className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={itinerary.images[0] || "/placeholder.jpg"}
            alt={itinerary.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 rounded-2xl">
            <h1 className="text-4xl font-bold text-white">{itinerary.title}</h1>
            {itinerary.tagline && <p className="text-white mt-2">{itinerary.tagline}</p>}
          </div>
        </section>

        {/* Description */}
        <section>
          <p className="text-gray-700">{itinerary.description}</p>
        </section>

        {/* Day-by-Day */}
        {itinerary.days?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Day-by-Day Plan</h2>
            {itinerary.days.map((day) => (
              <div key={day.dayNumber} className="bg-white p-4 rounded-xl shadow">
                <h3 className="font-semibold">Day {day.dayNumber}: {day.title}</h3>
                <p>{day.summary}</p>
              </div>
            ))}
          </section>
        )}

        {/* Map */}
        {itinerary.place?.latitude && itinerary.place?.longitude && (
          <section className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaMapMarkerAlt /> Location
            </h2>
            <div className="w-full h-60">
              <Map
                latitude={itinerary.place.latitude}
                longitude={itinerary.place.longitude}
                title={itinerary.place.name}
              />
            </div>
          </section>
        )}

        {/* Booking Widget */}
        {itinerary.departures && itinerary.departures.length > 0 && (
          <section>
            <BookingWidget
              currency="USD"
              basePrice={itinerary.pricePerPerson || 100}
              openDepartures={itinerary.departures.map(d => ({
                id: d.id,
                date: d.date instanceof Date ? d.date.toISOString() : d.date,
                startTime: d.startTime,
                seatsAvailable: d.seatsAvailable,
                priceOverride: d.priceOverride || null,
              }))}
              bookingCutoffHrs={24}
            />
          </section>
        )}

        {/* Reviews */}
        <section className="space-y-4">
          <ReviewsDisplay type="itinerary" itemId={itinerary.id} />
          <ReviewSection type="itinerary" itemId={itinerary.id} />
        </section>

      </main>

      <FooterSection />
    </>
  );
}
