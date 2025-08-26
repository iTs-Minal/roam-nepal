import HeroSlider from "@/components/ui/heroslider";
import CarouselSection from "@/components/ui/carousel-section";
import { prisma } from "@/lib/prisma"; // make sure prisma client is exported here
import FooterSection from "@/components/landingpage/footer";

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
      blogs: true,
    },
  });

  if (!place) {
    return <div>Place not found</div>;
  }

  return (
    <div>
      <HeroSlider images={place.images} title={place.name} />

      {/* About Section */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 relative inline-block">
            About {place.name}
            <span className="absolute left-1/2 -bottom-2 w-30 h-1 bg-yellow-400 rounded-full -translate-x-1/2"></span>
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-snug">
            {place.description}
          </p>
        </div>

        {/* About Section */}
        <div className="space-y-10">
          {/* Big content sections */}
          {place.history && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 relative inline-block pb-1">
                History
                <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-blue-500 rounded"></span>
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {place.history}
              </p>
            </div>
          )}

          {place.howToReach && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 relative inline-block pb-1">
                How to Reach
                <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-blue-500 rounded"></span>
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {place.howToReach}
              </p>
            </div>
          )}

          {/* Short info grouped into highlight chips */}
          <div className="flex flex-wrap gap-3">
            {place.location && (
              <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm text-gray-700 text-sm">
                <span className="font-bold">Location:</span>{" "}
                {place.location}
              </div>
            )}
            {place.bestTime && (
              <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm text-gray-700 text-sm">
                <span className="font-bold">Best Time:</span>{" "}
                {place.bestTime}
              </div>
            )}
            {place.tips && (
              <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm text-gray-700 text-sm">
                <span className="font-bold">Travel Tips:</span> {place.tips}
              </div>
            )}
            {place.highlights?.length > 0 && (
              <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm text-gray-700 text-sm">
                <span className="font-bold">Highlights:</span>{" "}
                {place.highlights.join(", ")}
              </div>
            )}
          </div>
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

      <CarouselSection
        title="Blogs"
        items={place.blogs.map((blog) => ({
          ...blog,
          name: blog.title,
        }))}
        hrefPrefix="/blogs"
      />
      <div>
        <FooterSection />
      </div>
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
