import { prisma } from "@/lib/prisma";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";
import ReviewSection from "@/components/ui/review";
import HomeNavbar from "@/components/homepage/homenavbar";
import FooterSection from "@/components/landingpage/footer";

const Map = dynamic(() => import("@/components/ui/map"));

export default async function ItineraryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Fetch itinerary from DB
  const itinerary = await prisma.itinerary.findUnique({
    where: { slug },
    include: {
      place: true,
      days: true,
      departures: true,
      activities: true,
    },
  });

  if (!itinerary) return <div>Itinerary not found</div>;

  return (
    <>
      <HomeNavbar />
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-12">
        
        {/* Hero Section */}
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={itinerary.images[0] || "/placeholder.jpg"}
            alt={itinerary.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 rounded-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{itinerary.title}</h1>
            {itinerary.tagline && (
              <p className="text-white mt-2 text-lg">{itinerary.tagline}</p>
            )}
          </div>
        </div>

        {/* About & Highlights */}
        <div className="space-y-4">
          <p className="text-gray-700 font-outfit text-lg">{itinerary.description}</p>
          <div className="flex flex-wrap gap-2">
            {itinerary.highlights?.map((item, i) => (
              <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3">What's Included</h2>
            <ul className="list-disc list-inside text-gray-700">
              {itinerary.inclusions?.map((inc, i) => (
                <li key={i}>{inc}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3">Exclusions</h2>
            <ul className="list-disc list-inside text-gray-700">
              {itinerary.exclusions?.map((exc, i) => (
                <li key={i}>{exc}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Day by Day */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Day by Day Plan</h2>
          <div className="space-y-6">
            {itinerary.days?.map((day, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-xl font-semibold mb-2">Day {day.dayNumber}: {day.title}</h3>
                <p className="text-gray-700 mb-2">{day.summary}</p>
                {day.activities?.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 mb-2">
                    {day.activities.map((act, idx) => (
                      <li key={idx}>{act}</li>
                    ))}
                  </ul>
                )}
                <div className="text-gray-600 text-sm">
                  Meals: {day.meals ? `${day.meals.breakfast ? "Breakfast " : ""}${day.meals.lunch ? "Lunch " : ""}${day.meals.dinner ? "Dinner" : ""}` : "Not specified"} | Transport: {day.transport || "N/A"}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        {itinerary.gallery?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
              {itinerary.gallery.map((img, i) => (
                <div key={i} className="relative w-64 h-44 flex-shrink-0 rounded-xl overflow-hidden shadow-lg snap-start">
                  <Image src={img} alt={`${itinerary.title} ${i}`} fill className="object-cover"/>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Departures */}
        {itinerary.departures?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Upcoming Departures</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {itinerary.departures.map((dep) => (
                <div key={dep.id} className="bg-white p-4 rounded-2xl shadow flex justify-between items-center">
                  <span>{new Date(dep.date).toLocaleDateString()} {dep.startTime}</span>
                  <span>Status: {dep.status}</span>
                  <span>Seats: {dep.seatsAvailable}/{dep.seatsTotal}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Map (Small) */}
        {itinerary.place?.latitude && itinerary.place?.longitude && (
          <section className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
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

        {/* FAQ */}
        {itinerary.faq?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
            <div className="space-y-3">
              {itinerary.faq.map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow">
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="text-gray-700 mt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        <ReviewSection placeId={itinerary.id} />

      </div>
      <FooterSection/>
    </>
  );
}
