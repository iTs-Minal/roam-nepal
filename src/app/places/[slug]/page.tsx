"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import HeroSlider from "@/components/ui/heroslider";

export default async function PlacePage({ params }: { params: { slug: string } }) {
  const place = await prisma.place.findUnique({
    where: { slug: params.slug },
    include: {
      activities: true,
      accommodations: true,
      cafes: true,
      // 👈 make sure you add cafes + itineraries in your schema
      itineraries: true,
      religiousSites: true,
    },
  });
  if (!place) return <div>Place not found</div>;

  return (
    <div className="pb-16">
      {/* Hero Slider */}
      <HeroSlider images={place.images} title={place.name} />

        {/* About Section */}
<div className="max-w-6xl mx-auto mt-12 px-4 space-y-10">
  {/* Title & Description */}
  <div className="space-y-4 text-center">
    <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">About {place.name}</h2>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
      {place.description}
    </p>
  </div>

  {/* Info Cards Grid */}
  <div className="grid md:grid-cols-2 gap-8 mt-8">
    {/* Left Column */}
    <div className="space-y-6">
      {place.history && (
        <InfoCard title="History" content={place.history} />
      )}
      {place.howToReach && (
        <InfoCard title="How to Reach" content={place.howToReach} />
      )}
    </div>

    {/* Right Column */}
    <div className="space-y-6">
      {place.location && <InfoCard title="Location" content={place.location} />}
      {place.bestTime && <InfoCard title="Best Time to Visit" content={place.bestTime} />}
      {place.highlights && place.highlights.length > 0 && (
        <InfoCard title="Highlights" content={place.highlights.join(", ")} />
      )}
      {place.tips && <InfoCard title="Travel Tips" content={place.tips} />}
    </div>
  </div>
</div>


      {/* Carousel Sections */}
      <CarouselSection title="Accommodations" items={place.accommodations} hrefPrefix="/accommodations" />
      <CarouselSection title="Cafes" items={place.cafes} hrefPrefix="/cafes" />
      <CarouselSection title="Top Activities" items={place.activities} hrefPrefix="/activities" />
      <CarouselSection title="Itineraries" items={place.itineraries} hrefPrefix="/itineraries" />
      <CarouselSection title="Religious Sites" items={place.religiousSites} hrefPrefix="/religious-sites" />
    </div>
  );
}

/* Info Card */
function InfoCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}

/* Carousel Section with Conditional Buttons */
function CarouselSection({
  title,
  items,
  hrefPrefix,
}: {
  title: string;
  items: {
    id: string | number;
    name: string;
    slug: string;
    images: string[];
    rating?: number;
    price?: number;
    location?: string;
  }[];
  hrefPrefix: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateButtons = () => {
      setShowButtons(container.scrollWidth > container.clientWidth);
    };

    updateButtons();
    window.addEventListener("resize", updateButtons);
    return () => window.removeEventListener("resize", updateButtons);
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-12 px-4 max-w-6xl mx-auto relative">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {showButtons && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <FaChevronRight />
          </button>
        </>
      )}

      <div ref={containerRef} className="flex space-x-6 overflow-x-hidden pb-4">
        {items.map((item) => (
          <Link key={item.id} href={`${hrefPrefix}/${item.slug}`}>
            <div className="min-w-[280px] md:min-w-[300px] bg-white rounded-lg shadow-lg hover:shadow-xl transition flex-shrink-0 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                {item.location && <p className="text-gray-500 text-sm">{item.location}</p>}
                {item.rating && (
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <FaStar />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                )}
                {item.price && (
                  <p className="text-green-600 font-semibold">{`Rs. ${item.price}`}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
