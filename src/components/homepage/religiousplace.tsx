

"use client";

import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";


type ReligiousSite = {
  id: number;
  name: string;
  slug: string;
  description: string;
  images: string[];
  place: {
    name: string;
    slug: string;
  };
  rating?: number;
  totalRatings?: number;
};

export default function ReligiousSitesSection() {

const [religiousSites, setReligiousSites] = useState<ReligiousSite[]>([]);

  useEffect(() => {
    fetch("/api/religious-sites")
      .then((res) => res.json())
      .then((data) => setReligiousSites(data));
  }, []);


  return (
    <section className="px-4 sm:px-6 lg:px-12 py-16 mt-10 bg-gray-100">
      {/* Section Header */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800">Religious Places</h2>
        <p className="mt-4 text-lg text-gray-600">
          Explore Nepal’s sacred and historic spiritual destinations.
        </p>
      </div>

      {/* Site Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {religiousSites.map((site) => (
          <ReligiousCard key={site.id} site={site} />
        ))}
      </div>
    </section>
  );
}

function ReligiousCard({ site }: { site: ReligiousSite }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? site.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === site.images.length - 1 ? 0 : prev + 1));
  };

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
    // TODO: Call backend to save favorite
  };

  return (
    <Link href={`/religious-sites/${site.slug}`}>
      <div className="group relative rounded-xl overflow-hidden bg-white transition">
        {/* Image Carousel */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={site.images[currentImage]|| "/placeholder.webp"}
            alt={site.name}
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
            {site.images.slice(0,4).map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full border border-white ${
                  idx === currentImage % 4? "bg-white" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Site Info */}
        <div className="pt-4 px-2 pb-2 space-y-1">
          <h3 className="text-base font-semibold text-gray-800 truncate">{site.name}</h3>
          <p className="text-sm text-blue-600">{site.place.name}</p>

          <div className="flex items-center mt-1 text-sm text-gray-700">
            <FaStar className="text-yellow-400 mr-1" />
            <span>
              {site.rating?.toFixed(1) || "0.0"}
              <span className="text-gray-500 text-xs ml-1">({site.totalRatings || 0})</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

