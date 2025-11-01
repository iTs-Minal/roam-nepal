import { prisma } from "@/lib/prisma";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";
import ReviewSection from "@/components/ui/review";
import HomeNavbar from "@/components/homepage/homenavbar";
import FooterSection from "@/components/landingpage/footer";
import Link from "next/link";
import ReviewsDisplay from "@/components/ui/review-display";

const Map = dynamic(() => import("@/components/ui/map"));

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch activity and related itineraries
  const activity = await prisma.activity.findUnique({
     where: { slug },
  include: {
    place: {
      include: {
        itineraries: true, // fetch itineraries linked to same place
      },
    },
  },
  });

  if (!activity) return <div>Activity not found</div>;

  return (
    <>
      <HomeNavbar />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={activity.images?.[0] || "/placeholder.jpg"}
            alt={activity.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {activity.name}
            </h1>
            <p className="text-white mt-2 text-lg">{activity.shortIntro}</p>
          </div>
        </div>

        {/* Description */}
        <section className="space-y-3">
          <p className="text-gray-700 text-lg leading-relaxed">
            {activity.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {activity.highlights?.map((h, i) => (
              <span
                key={i}
                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {h}
              </span>
            ))}
          </div>
        </section>

        {/* Info Grid */}
        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InfoCard
            icon={<FaClock />}
            title="Duration"
            value={activity.duration}
          />
          <InfoCard
            icon={<FaStar />}
            title="Difficulty"
            value={activity.difficulty}
          />
          <InfoCard
            icon={<FaMapMarkerAlt />}
            title="Best Season"
            value={activity.bestSeason}
          />
          <InfoCard title="Altitude Range" value={activity.altitudeRange} />
          <InfoCard title="Age Limit" value={activity.ageLimit} />
          <InfoCard
            title="Base Price"
            value={`${activity.basePrice} ${activity.currency}`}
          />
        </section>

        {/* Inclusions & Exclusions */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3">Included</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {activity.inclusions?.map((inc, i) => (
                <li key={i}>{inc}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3">Excluded</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {activity.exclusions?.map((exc, i) => (
                <li key={i}>{exc}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Equipment & Requirements */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3">Equipment Needed</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {activity.equipment?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3">Requirements</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {activity.requirements?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Safety & Policy */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3">Safety Notes</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {activity.safetyNotes?.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3">Cancellation Policy</h2>
            <p className="text-gray-700">{activity.cancellationPolicy}</p>
          </div>
        </section>

        {/* Gallery */}
        {activity.gallery?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
              {activity.gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative w-64 h-44 flex-shrink-0 rounded-xl overflow-hidden shadow-lg snap-start"
                >
                  <Image
                    src={img}
                    alt={`${activity.name} ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Itineraries */}
{activity.place?.itineraries?.length > 0 && (
  <section>
    <h2 className="text-2xl font-bold mb-4">Related Itineraries</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {activity.place.itineraries.map((it) => (
        <Link
          key={it.id}
          href={`/itineraries/${it.slug}`}
          className="bg-white rounded-2xl shadow hover:shadow-lg transition block"
        >
          <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
            <Image
              src={it.images?.[0] || "/placeholder.jpg"}
              alt={it.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{it.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{it.tagline}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
)}

        {/* Location & FAQ Side by Side */}
        {(activity.latitude && activity.longitude) ||
        activity.faq?.length > 0 ? (
          <section className="flex flex-col md:flex-row gap-6">
            {/* Location & Map */}
            {activity.latitude && activity.longitude && (
              <div className="bg-white p-4 rounded-2xl shadow flex-1">
                <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt /> Location
                </h2>
                <div className="w-full h-60 rounded-xl overflow-hidden">
                  <Map
                    latitude={activity.latitude}
                    longitude={activity.longitude}
                    title={activity.name}
                  />
                </div>
              </div>
            )}

            {/* FAQ */}
            {activity.faq?.length > 0 && (
              <div className="bg-white p-4 rounded-2xl shadow flex-1">
                <h2 className="text-2xl font-bold mb-4">FAQ</h2>
                <div className="space-y-3">
                  {activity.faq.map((f, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-semibold">{f.question}</h3>
                      <p className="text-gray-700 mt-1">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ) : null}

        {/* Reviews */}
        <ReviewsDisplay type="activity" itemId={activity.id} />
        <ReviewSection type="activity" itemId={activity.id} />
      </div>
      <FooterSection />
    </>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon?: React.ReactNode;
  title: string;
  value?: string | null;
}) {
  if (!value) return null;
  return (
    <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
      {icon && <div className="text-yellow-600 text-lg">{icon}</div>}
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{value}</p>
      </div>
    </div>
  );
}
