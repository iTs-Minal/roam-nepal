import HeroSlider from "@/components/ui/heroslider";
import CarouselSection from "@/components/ui/carousel-section";
import { prisma } from "@/lib/prisma"; // make sure prisma client is exported here
import FooterSection from "@/components/landingpage/footer";
import HomeNavbar from "@/components/homepage/homenavbar";

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
    {/* Make sure navbar has fixed position */}
    <HomeNavbar />

    {/* Hero Slider with top padding to avoid hidden by navbar */}
    <div className="relative"> 
      {/* Adjust pt-20 according to navbar height, e.g., 80px = pt-20 */}
      <HeroSlider images={place.images} title={place.name} />
    </div>

    {/* About Section */}
    <div className="max-w-6xl mx-auto mt-10 mb-20 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-lilita text-gray-900 relative inline-block">
          About {place.name}
          <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-yellow-400 rounded-full -translate-x-1/2"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-snug font-outfit">
          {place.description}
        </p>
      </div>

      <div className="space-y-10">
        {place.history && (
          <SectionBlock title="History">{place.history}</SectionBlock>
        )}
        {place.howToReach && (
          <SectionBlock title="How to Reach">{place.howToReach}</SectionBlock>
        )}

        <div className="flex flex-wrap gap-3">
          {place.location && <Chip label="Location" value={place.location} />}
          {place.bestTime && <Chip label="Best Time" value={place.bestTime} />}
          {place.tips && <Chip label="Travel Tips" value={place.tips} />}
          {place.highlights?.length > 0 && (
            <Chip label="Highlights" value={place.highlights.join(", ")} />
          )}
        </div>
      </div>
    </div>

    {/* Carousel Sections */}
    <CarouselSection
      title="Accommodations"
      items={place.accommodations.map((acc) => ({
        ...acc,
        rating: acc.rating ?? undefined,
        price: acc.price ?? undefined,
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

    <FooterSection />
  </div>
);
}

/* Section Block */
function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-2xl font-kanit font-bold text-gray-900 relative inline-block pb-1">
        {title}
        <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-blue-500 rounded"></span>
      </h3>
      <p className="mt-3 text-gray-700 font-outfit leading-relaxed">
        {children}
      </p>
    </div>
  );
}

/* Compact Info Card */
function InfoCard({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
      {icon && (
        <div className="text-3xl p-2 rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-lg font-exo2 font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-snug mt-1 font-outfit">
          {content}
        </p>
      </div>
    </div>
  );
}

/* Highlight Chips */
function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm text-gray-700 text-sm font-outfit">
      <span className="font-bold font-exo2">{label}:</span> {value}
    </div>
  );
}
