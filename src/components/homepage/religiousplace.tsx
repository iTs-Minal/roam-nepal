"use client";

import { useEffect, useState } from "react";
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
};

export default function ReligiousPlaces() {
  const [sites, setSites] = useState<ReligiousSite[]>([]);

  useEffect(() => {
    fetch("/api/religious-sites")
      .then((res) => res.json())
      .then((data) => setSites(data));
  }, []);

  return (
    <section className="px-6 py-12 space-y-6">
      <h2 className="text-3xl font-bold">Religious Places</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sites.map((site) => (
          <Link key={site.id} href={`/religious/${site.slug}`}>
            <div className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
              <Image
                src={site.images[0]}
                alt={site.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold">{site.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {site.description}
                </p>
                <p className="text-xs mt-1 text-blue-600">{site.place.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
