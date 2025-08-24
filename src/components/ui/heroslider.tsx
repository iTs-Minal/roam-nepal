"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function HeroSlider({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Current Image */}
      <div className="w-full h-full relative z-0">
        <Image
          src={images[current]}
          alt={title}
          fill
          className="object-cover transition-opacity duration-700"
          priority
        />
      </div>

      {/* Overlay Title */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg text-center px-4">
          {title}
        </h1>
      </div>

      {/* Left & Right Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full z-20"
          >
            <FaChevronLeft className="text-gray-800" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full z-20"
          >
            <FaChevronRight className="text-gray-800" />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
