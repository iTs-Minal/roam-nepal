"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

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

export default function CarouselCard({ item, hrefPrefix }: { item: CarouselItem; hrefPrefix: string }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

 return (
    <Link href={`${hrefPrefix}/${item.slug}`}>
      <div className="group relative rounded-xl overflow-hidden bg-white transition flex-shrink-0 min-w-[280px] md:min-w-[300px] shadow hover:shadow-lg">
        {/* Image Section */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={item.images[currentImage] || "/placeholder.webp"}
            alt={item.name}
            fill
            className="object-cover"
          />

          {/* Favorite */}
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-1.5 rounded-full text-red-500 z-10"
          >
            {isFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
          </button>

          {/* Arrows */}
          {item.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          {/* Dots */}
          {item.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {item.images.slice(0, 4).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full border border-white ${
                    idx === currentImage % 4 ? "bg-white" : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="pt-4 px-3 pb-3 space-y-1">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-ovo font-semibold text-gray-800 truncate">
            {item.name}
          </h3>

          {/* Location */}
          {item.location && (
            <p className="text-sm text-blue-600 font-outfit">
              {item.location}
            </p>
          )}

          {/* Rating + Price */}
          <div className="flex items-center justify-between mt-1 text-sm text-gray-700 font-outfit">
            {item.rating && (
              <div className="flex items-center gap-1 text-yellow-400 text-sm">
                <FaStar />
                <span>
                  {item.rating.toFixed(1)}
                  {item.totalRatings !== undefined && (
                    <span className="text-gray-500 text-xs ml-1">
                      ({item.totalRatings})
                    </span>
                  )}
                </span>
              </div>
            )}
            {item.price && (
              <p className="font-ovo font-semibold text-green-600">
                {`Rs. ${item.price}`}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
