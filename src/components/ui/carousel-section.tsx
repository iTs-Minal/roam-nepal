"use client";

import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CarouselCard from "./carousel-card";

type CarouselItem = {
  id: string | number;
  name: string;
  slug: string;
  images: string[];
  rating?: number;
  price?: number;
  location?: string;
  totalRatings?: number;
};

export default function CarouselSection({
  title,
  items,
  hrefPrefix,
}: {
  title: string;
  items: CarouselItem[];
  hrefPrefix: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeft(scrollLeft > 0); // Show left if not at the very start
      setShowRight(scrollLeft + clientWidth < scrollWidth - 1); // Show right if not at the very end
    };

    updateButtons();
    container.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    return () => {
      container.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.clientWidth * 0.8;
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

return (
    <section className="mt-12 px-4 max-w-6xl mx-auto relative">
      {/* Title with emphasis */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-lilita text-gray-900 mb-6 relative inline-block tracking-wide">
        {title}
        <span className="absolute left-0 -bottom-2 w-16 sm:w-20 h-1 bg-yellow-400 rounded-full"></span>
      </h2>

      <div className="relative">
        {/* Carousel container */}
        <div
          ref={containerRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-hidden pb-6 scroll-smooth"
        >
          {items.map((item) => (
            <CarouselCard
              key={item.id}
              item={item}
              hrefPrefix={hrefPrefix}
              className="flex-shrink-0 w-[220px] sm:w-[260px] md:w-[280px] font-outfit"
              titleClass="font-kanit text-lg sm:text-xl"
              subtitleClass="font-exo text-sm text-gray-600"
              descriptionClass="font-ovo text-xs sm:text-sm text-gray-500"
            />
          ))}
        </div>

        {/* Scroll buttons */}
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/90 rounded-full shadow-md hover:bg-white transition"
          >
            <FaChevronLeft className="text-sm sm:text-base" />
          </button>
        )}
        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/90 rounded-full shadow-md hover:bg-white transition"
          >
            <FaChevronRight className="text-sm sm:text-base" />
          </button>
        )}
      </div>
    </section>
  );
}
