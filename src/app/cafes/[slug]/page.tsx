import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaClock, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import ReviewSection from "@/components/ui/review";
import HomeNavbar from "@/components/homepage/homenavbar";
import FooterSection from "@/components/landingpage/footer";

const Map = dynamic(() => import("@/components/ui/map"));

export default async function CafePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params; // ✅ Await params

  const cafe = await prisma.cafe.findUnique({ where: { slug } });
  if (!cafe) return <div>Cafe not found</div>;

  return (
    <>
      <HomeNavbar />
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-12">
        {/* Hero / Top Section */}

        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={cafe.images[0] || "/placeholder.jpg"}
            alt={cafe.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 rounded-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {cafe.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < (cafe.rating ?? 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="bg-neutral-100 bg-opacity-20 text-black px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                <FaClock /> {cafe.openingTime} - {cafe.closingTime}
              </span>
            </div>
          </div>
        </div>

        {/* About & Specialties */}
        <div className="space-y-4">
          <p className="text-gray-700 font-outfit text-lg">
            {cafe.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {cafe.specialties.map((item) => (
              <span
                key={item}
                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
            {cafe.images.map((img, i) => (
              <div
                key={i}
                className="relative w-64 h-44 flex-shrink-0 rounded-xl overflow-hidden shadow-lg snap-start"
              >
                <Image
                  src={img || "/placeholder.jpg"}
                  alt={`${cafe.name} ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Menu */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {cafe.menu?.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.description}
                  </p>
                  <p className="mt-2 font-bold text-gray-800">
                    Rs {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Facilities & Ambiance */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Facilities & Ambiance</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {cafe.facilities?.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-gray-700"
              >
                {f.available ? "✅" : "❌"} {f.name}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {cafe.ambiance.map((a, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {a}
              </span>
            ))}
          </div>
        </section>

        {/* Map & Contact Info Side by Side */}
        {cafe.latitude && cafe.longitude && (
          <section className="flex flex-col md:flex-row gap-6 items-start">
            {/* Map Card */}
            <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <h2 className="text-2xl font-bold mb-4 p-6 flex items-center gap-2 bg-gray-50 border-b border-gray-200">
                <FaMapMarkerAlt /> Location
              </h2>
              <div className="w-full h-80">
                <Map
                  latitude={cafe.latitude}
                  longitude={cafe.longitude}
                  title={cafe.name}
                />
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Info</h2>
              <ul className="text-gray-700 font-outfit space-y-2">
                {cafe.contactInfo?.phone && (
                  <li>
                    <span className="font-semibold">Phone:</span>{" "}
                    {cafe.contactInfo.phone}
                  </li>
                )}
                {cafe.contactInfo?.email && (
                  <li>
                    <span className="font-semibold">Email:</span>{" "}
                    {cafe.contactInfo.email}
                  </li>
                )}
                {cafe.contactInfo?.website && (
                  <li>
                    <span className="font-semibold">Website:</span>{" "}
                    <Link
                      href={cafe.contactInfo.website}
                      className="text-blue-600 underline"
                    >
                      {cafe.contactInfo.website}
                    </Link>
                  </li>
                )}
                {cafe.contactInfo?.address && (
                  <li>
                    <span className="font-semibold">Address:</span>{" "}
                    {cafe.contactInfo.address}
                  </li>
                )}
              </ul>
            </div>
          </section>
        )}

        {/* User Reviews */}
        <ReviewSection placeId={cafe.id} />
        
      </div>
      <FooterSection/>
    </>
  );
}
