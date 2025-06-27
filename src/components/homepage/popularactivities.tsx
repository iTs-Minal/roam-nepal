"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Activity = {
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

export default function TrendingActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data));
  }, []);

  return (
    <section className="px-6 py-12 space-y-6">
      <h2 className="text-3xl font-bold">Trending Activities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Link key={activity.id} href={`/activity/${activity.slug}`}>
            <div className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
              <Image
                src={activity.images[0]}
                alt={activity.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold">{activity.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {activity.description}
                </p>
                <p className="text-xs mt-1 text-blue-600">{activity.place.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
