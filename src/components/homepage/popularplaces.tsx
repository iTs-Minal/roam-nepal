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
      .then((data) =>{
        console.log(data);
        setPlaces(data)});
      
  }, []);

  return (
    <section className="px-6 py-12 space-y-6">
      <h2 className="text-3xl font-bold">Popular Places</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {places.map((place) => (
          <Link href={`/place/${place.slug}`} key={place.id}>
            <div className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
              <Image
                src={place.images[0]}
                alt={place.name}
                height={200}
                width={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold">{place.name}</h3>
                <p className="text-sm text-gray-600">
                  {place.description.slice(0, 80)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
