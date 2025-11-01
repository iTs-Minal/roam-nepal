"use client";

import { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";

export default function ReviewsDisplay({ type, itemId }: { type: string; itemId: number }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [avgRating, setAvgRating] = useState<number>(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`/api/reviews/${type}/${itemId}`);
      const data = await res.json();
      setAvgRating(data.avgRating);
    };
    fetchReviews();
  }, [type, itemId]);

  return (
    <div className="mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Average Ratings</h2>
        <div className="flex items-center gap-2 text-yellow-500">
          <FaTrophy className="text-2xl" />
          <span className="text-lg font-semibold">{avgRating.toFixed(1)} / 5</span>
        </div>
      </div>

    </div>
  );
}
