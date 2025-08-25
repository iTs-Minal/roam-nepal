import HeroSlider from "@/components/ui/heroslider";
import CarouselSection from "@/components/ui/carousel-section";
import { prisma } from "@/lib/prisma"; // make sure prisma client is exported here

export default async function PlacePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params; // ✅ Await params

  const place = await prisma.place.findUnique({
    where: { slug },
    include: {
      activities: true,
      accommodations: true,
      religiousSites: true,
      cafes: true,
      itineraries: true,
    },
  });

  if (!place) {
    return <div>Place not found</div>;
  }

  return (
    <div className="pb-16">
      <HeroSlider images={place.images} title={place.name} />

      {/* About Section */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 relative inline-block">
            About {place.name}
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-yellow-400 rounded-full -translate-x-1/2"></span>
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-snug">
            {place.description}
          </p>
        </div>

        {/* Compact Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {place.history && (
            <InfoCard title="History" content={place.history} icon="📜" />
          )}
          {place.howToReach && (
            <InfoCard
              title="How to Reach"
              content={place.howToReach}
              icon="🛣️"
            />
          )}
          {place.location && (
            <InfoCard title="Location" content={place.location} icon="📍" />
          )}
          {place.bestTime && (
            <InfoCard title="Best Time" content={place.bestTime} icon="⏰" />
          )}
          {place.highlights?.length && (
            <InfoCard
              title="Highlights"
              content={place.highlights.join(", ")}
              icon="✨"
            />
          )}
          {place.tips && (
            <InfoCard title="Travel Tips" content={place.tips} icon="💡" />
          )}
        </div>
      </div>

      {/* Carousel Sections */}
      <CarouselSection
        title="Accommodations"
        items={place.accommodations.map((acc) => ({
          ...acc,
          rating: acc.rating === null ? undefined : acc.rating,
          price: acc.price === null ? undefined : acc.price,
        }))}
        hrefPrefix="/accommodations"
      />
      <CarouselSection title="Cafes" items={place.cafes} hrefPrefix="/cafes" />
      <CarouselSection
        title="Top Activities"
        items={place.activities}
        hrefPrefix="/activities"
      />
      <CarouselSection
        title="Itineraries"
        items={place.itineraries}
        hrefPrefix="/itineraries"
      />
      <CarouselSection
        title="Religious Sites"
        items={place.religiousSites}
        hrefPrefix="/religious-sites"
      />
    </div>
  );
}

{
  /* Compact Info Card */
}
function InfoCard({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
      {icon && <div className="text-2xl sm:text-3xl">{icon}</div>}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-base leading-snug mt-1">
          {content}
        </p>
      </div>
    </div>
  );
}
