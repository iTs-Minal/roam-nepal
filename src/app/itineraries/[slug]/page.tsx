import { prisma } from "@/lib/prisma";
import BookingWidget from "../booking-widget";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import FooterSection from "@/components/landingpage/footer";
import HomeNavbar from "@/components/homepage/homenavbar";
import ReviewSection from "@/components/ui/review";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;


  const itinerary = await prisma.itinerary.findUnique({
    where: { slug: slug },
    include: {
      days: { orderBy: { dayNumber: "asc" } },
      place: true,
      departures: { where: { status: "OPEN" }, orderBy: { date: "asc" } },
    },
  });

  if (!itinerary) {
    return (
      <div className="max-w-6xl mx-auto py-16 text-center font-kanit">
        Itinerary not found
      </div>
    );
  }

  // Prepare client-safe props
  const openDepartureDates = itinerary.departures.map((d) => ({
    id: d.id,
    date: d.date.toISOString(),
    startTime: d.startTime,
    priceOverride: d.priceOverride,
    seatsAvailable: d.seatsAvailable,
  }));

  return (
    <>
      <HomeNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 font-outfit">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero */}
          <section className="relative rounded-2xl overflow-hidden shadow-lg">
            {itinerary.images?.[0] ? (
              <div className="relative h-64 md:h-96">
                <img
                  src={itinerary.images[0]}
                  alt={itinerary.title}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {itinerary.title}
                  </h1>
                  {itinerary.tagline && (
                    <p className="mt-1 text-lg opacity-90">
                      {itinerary.tagline}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-4 text-sm md:text-base">
                    <span className="flex items-center gap-1">
                      <FaClock /> {itinerary.durationDays}D /{" "}
                      {itinerary.durationNights}N
                    </span>
                    {itinerary.place && (
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt /> {itinerary.place.name}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xl md:text-2xl font-semibold text-yellow-400">
                    {itinerary.currency} {itinerary.basePrice}
                  </p>
                </div>
              </div>
            ) : null}
          </section>

          {/* (Optional) Image gallery — uses itinerary.images + gallery */}
          {itinerary.images?.length || itinerary.gallery?.length ? (
            <section className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-2">
              {[...(itinerary.images || []), ...(itinerary.gallery || [])]
                .slice(0, 6)
                .map((src, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
                  >
                    <img
                      src={src}
                      alt={`Gallery image ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </section>
          ) : null}

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-kanit font-bold mb-2">Overview</h2>
            <p className="text-gray-800 leading-relaxed">
              {itinerary.description}
            </p>
          </section>

          {/* Highlights */}
          {itinerary.highlights?.length > 0 && (
            <section>
              <h2 className="text-2xl font-kanit font-bold mb-2">Highlights</h2>
              <ul className="flex flex-wrap gap-2">
                {itinerary.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Inclusions / Exclusions */}
          <section className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-kanit font-bold mb-2">Inclusions</h3>
              <ul className="space-y-1 text-sm text-green-700">
                {itinerary.inclusions?.map((inc, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <FaCheckCircle /> {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-kanit font-bold mb-2">Exclusions</h3>
              <ul className="space-y-1 text-sm text-red-700">
                {itinerary.exclusions?.map((exc, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <FaTimesCircle /> {exc}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Practical info */}
          <section className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="text-lg font-kanit mb-1">Meeting Point</h3>
              <p className="text-gray-700">
                {itinerary.meetingPoint ?? "Provided after booking"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-kanit mb-1">End Point</h3>
              <p className="text-gray-700">
                {itinerary.endPoint ?? "Provided after booking"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-kanit mb-1">Languages</h3>
              <p className="text-gray-700">{itinerary.languages.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-lg font-kanit mb-1">Difficulty</h3>
              <p className="text-gray-700">{itinerary.difficulty ?? "—"}</p>
            </div>
          </section>

          {/* Day-by-day */}
          {itinerary.days?.length > 0 && (
            <section>
              <h2 className="text-2xl font-kanit font-bold mb-3">
                Detailed Itinerary
              </h2>
              <div className="space-y-4">
                {itinerary.days?.map((day) => (
                  <div
                    key={day.id}
                    className="border-l-4 border-indigo-600 pl-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                  >
                    <h3 className="text-lg md:text-xl font-semibold mb-1">
                      Day {day.dayNumber}: {day.title}
                    </h3>
                    <p className="text-gray-700">{day.summary}</p>
                    {day.activities?.length > 0 && (
                      <ul className="list-disc pl-5 mt-2 text-gray-600">
                        {day.activities.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
                      {day.meals && (
                        <span>
                          🍴 Meals:{" "}
                          {Object.entries(day.meals)
                            .filter(([, v]) => v)
                            .map(([k]) => k)
                            .join(", ")}
                        </span>
                      )}
                      {day.accommodation && (
                        <span>🏨 Stay: {day.accommodation}</span>
                      )}
                      {day.transport && (
                        <span>🚗 Transport: {day.transport}</span>
                      )}
                    </div>
                    {day.images?.length ? (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {day.images.slice(0, 3).map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            className="w-full h-24 object-cover rounded"
                            alt={`Day ${day.dayNumber} image ${i + 1}`}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* What to bring / Safety */}
          {itinerary.whatToBring?.length || itinerary.safetyNotes?.length ? (
            <section className="grid md:grid-cols-2 gap-6 text-sm">
              {itinerary.whatToBring?.length ? (
                <div>
                  <h3 className="text-lg font-kanit mb-1">What to Bring</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {itinerary.whatToBring.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {itinerary.safetyNotes?.length ? (
                <div>
                  <h3 className="text-lg font-kanit mb-1">Safety Notes</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {itinerary.safetyNotes.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}

          {/* Policy */}
          {itinerary.cancellationPolicy && (
            <section>
              <h2 className="text-xl font-kanit font-bold mb-2">
                Cancellation Policy
              </h2>
              <p className="text-gray-700 text-sm">
                {itinerary.cancellationPolicy}
              </p>
            </section>
          )}
        </div>

        {/* RIGHT: Booking Widget */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <BookingWidget
              currency={itinerary.currency}
              basePrice={itinerary.basePrice}
              seasonalRates={itinerary.seasonalRates as any}
              pricingTiers={itinerary.pricingTiers as any}
              bookingCutoffHrs={itinerary.bookingCutoffHrs ?? 24}
              openDepartures={openDepartureDates.filter(
                (d) => new Date(d.date) >= new Date()
              )} // future only
            />
          </div>
        </aside>
      </div>
      <ReviewSection placeId={itinerary.id} />
      <FooterSection />
    </>
  );
}
