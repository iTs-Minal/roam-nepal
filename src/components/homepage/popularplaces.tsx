"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Place = {
  id: number;
  name: string;
  slug: string;
  description: string;
  images: string[];
};

export default function PopularPlaces() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    fetch("/api/places")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
      });
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10 mt-8 bg-white">
      {/* Header and Description */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Popular Places
          <span className="block w-30 h-1 bg-red-500 mx-auto mt-2 rounded"></span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover the most loved destinations across Nepal. Each place has its
          own story, beauty, and adventures waiting for you.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {places.map((place) => (
          <Link href={`/places/${place.slug}`} key={place.id}>
            <div className="relative rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transition duration-300">
              {/* Image */}
              <Image
                src={place.images[0]}
                alt={place.name}
                height={400}
                width={300}
                className="w-full h-48 object-cover"
              />

              {/* Overlay and Text */}
              <div className="absolute inset-0 hover:bg-black/30 flex items-center justify-center">
                <div className="absolute bottom-0 left-0 w-full px-4 py-3 bg-gradient-to-t from-black/20 via-black/20 to-transparent">
                  <h3 className="text-white text-lg font-semibold relative inline-block">
                    {place.name}
                    <span className="block h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 mt-1" />
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
