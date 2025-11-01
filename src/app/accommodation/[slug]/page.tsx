import HomeNavbar from "@/components/homepage/homenavbar";
import FooterSection from "@/components/landingpage/footer";
import ReviewSection from "@/components/ui/review";
import ReviewsDisplay from "@/components/ui/review-display";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AccommodationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const accommodation = await prisma.accommodation.findUnique({
    where: { slug },
    include: {
      rooms: true,
      place: true,
    },
  });

  if (!accommodation) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
        <HomeNavbar/>
      {/* Hero Section */}
      <section className="relative h-[500px] w-full">
        <Image
          src={accommodation.images?.[0] || "/placeholder.jpg"}
          alt={accommodation.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {accommodation.name}
          </h1>
          <div className="flex items-center gap-3 mt-3 text-gray-200 text-sm">
            <span className="bg-yellow-400 text-black font-semibold px-2 py-1 rounded">
              ★ {accommodation.rating?.toFixed(1) ?? "N/A"}
            </span>
            <span>{accommodation.place?.name}</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-16">
        {/* Overview */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {accommodation.description}
          </p>
        </section>

        {/* Gallery */}
        {accommodation.images?.length > 1 && (
          <section>
            <h2 className="text-2xl font-semibold mb-5">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {accommodation.images.slice(1).map((img, i) => (
                <div key={i} className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={img || "/placeholder.jpg"}
                    alt={`Image ${i + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Amenities */}
        <section>
          <h2 className="text-2xl font-semibold mb-5">Amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {accommodation.amenities.map((amenity, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition"
              >
                <span className="text-green-600 text-lg">✔</span>
                <span className="text-gray-700 text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Rooms */}
        {accommodation.rooms.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-5">Available Rooms</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodation.rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={room.images?.[0] || "/placeholder.jpg"}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2">
                      {room.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {room.description}
                    </p>

                    <div className="flex justify-between items-center mb-3">
                      <p className="text-blue-600 font-bold">
                        ${room.pricePerNight}/night
                      </p>
                      <p className="text-gray-500 text-sm">{room.bedType}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      {room.amenities.slice(0, 3).map((a, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 px-2 py-1 rounded-full"
                        >
                          {a}
                        </span>
                      ))}
                    </div>

                    <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Map Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-5">Location</h2>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={`https://www.google.com/maps?q=${accommodation.latitude},${accommodation.longitude}&output=embed`}
              width="100%"
              height="350"
              loading="lazy"
              className="rounded-xl border-0"
            ></iframe>
          </div>
          <p className="text-gray-600 mt-3 text-sm">
            Latitude: {accommodation.latitude}°, Longitude:{" "}
            {accommodation.longitude}°
          </p>
        </section>

        {/* Booking CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl text-center p-10 shadow-xl">
          <h3 className="text-3xl font-bold mb-2">
            {accommodation.price != null
              ? `$${accommodation.price.toFixed(2)} / night`
              : "Price not available"}
          </h3>
          <p className="mb-6 text-gray-100 text-lg">
            Stay at {accommodation.name} and experience comfort in{" "}
            {accommodation.place?.name}.
          </p>
          <Link href={`/accommodation/${accommodation.slug}/booking`}>
          <button className="bg-white text-blue-700 px-10 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition">
            Book Now
          </button>
          </Link>
        </section>
      </main>
        {/* Reviews */}
              <ReviewsDisplay type="accommodation" itemId={accommodation.id} />
              <ReviewSection type="accommodation" itemId={accommodation.id} />
            <FooterSection />
    </div>
  );
}
