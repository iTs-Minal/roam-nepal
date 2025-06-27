"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Accommodation = {
  id: number;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  place: {
    name: string;
    slug: string;
  };
};

export default function TopAccommodations() {
  const [data, setData] = useState<Accommodation[]>([]);

  useEffect(() => {
    fetch("/api/accommodations")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <section className="px-6 py-12 space-y-6">
      <h2 className="text-3xl font-bold">Top Accommodations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((acc) => (
          <Link
            key={acc.id}
            href={`/accommodation/${acc.slug}`}
            className="block shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <Image
              src={acc.images[0]}
              alt={acc.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold">{acc.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-1">{acc.description}</p>
              <p className="text-sm mt-1 font-medium text-blue-600">
                {acc.place.name} — NPR {acc.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
