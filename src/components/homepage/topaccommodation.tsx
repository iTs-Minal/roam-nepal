"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

type Accommodation = {
  id: number;
  name: string;
  slug: string;
  description: string;
  images: string[];

  place: {
    name: string;
    slug: string;
  };
  rating:number;
  price: number;
  totalRatings:number;
};

export default function TopAccommodations() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  useEffect(() => {
    fetch("/api/accommodations")
      .then((res) => res.json())
      .then((data) => setAccommodations(data));
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-16 mt-10 bg-neutral-100">
      {/* Header */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800">Top Accommodations</h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover the best places to stay in Nepal’s most beautiful destinations.
        </p>
      </div>

      {/* Accommodation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {accommodations.map((accommodation) => (
          <AccommodationCard key={accommodation.id} accommodation={accommodation} />
        ))}
      </div>
    </section>
  );
}

function AccommodationCard({ accommodation }: { accommodation: Accommodation }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
    // TODO: Save to DB
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? accommodation.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === accommodation.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Link href={`/accommodation/${accommodation.slug}`}>
      <div className="group relative rounded-xl overflow-hidden bg-white transition">
        {/* Image Section */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={accommodation.images[currentImage]}
            alt={accommodation.name}
            fill
            className="object-cover"
          />

          {/* Heart Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-1.5 rounded-full text-red-500 z-10"
          >
            {isFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.preventDefault();
              prevImage();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              nextImage();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <FaChevronRight />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {accommodation.images.slice(0,4).map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full border border-white ${
                  idx === currentImage % 4 ? "bg-white" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info Below */}
        <div className="pt-4 px-2 pb-2 space-y-1">
          <h3 className="text-base font-semibold text-gray-800">{accommodation.name}</h3>
          <p className="text-sm text-blue-600">{accommodation.place.name}</p>

          <div className="flex items-center mt-1 text-sm text-gray-700">
            <FaStar className="text-yellow-400 mr-1" />
            <span>
              {accommodation.rating?.toFixed(1) || "0.0"}
              <span className="text-gray-500 text-xs ml-1">
                ({accommodation.totalRatings || 0})
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
