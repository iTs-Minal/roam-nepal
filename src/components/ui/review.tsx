"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Props {
  type: string; // place, activity, cafe, accommodation, itinerary, religiousSite
  itemId: number;
}

export default function ReviewSection({ type, itemId }: Props) {
  const { user, isSignedIn } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Fetch reviews when type/itemId changes
  useEffect(() => {
    setRating(0);
    setReviewText("");
    setSubmitted(false);
    setError("");

    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews/${type}/${itemId}`);
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data.reviews);

        // Prefill user's review if exists
        const myReview = data.reviews.find((r: Review) => r.userId === user?.id);
        if (myReview) {
          setRating(myReview.rating);
          setReviewText(myReview.comment);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [type, itemId, user?.id]);

  const handleSubmit = async () => {
    if (!isSignedIn) {
      setError("Please sign in to leave a review.");
      return;
    }
    if (!rating || !reviewText.trim()) {
      setError("Please provide a rating and a comment.");
      return;
    }

    // Build dynamic body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reviewData: Record<string, any> = {
      userId: user.id,
      userName: user.fullName || "Anonymous",
      rating,
      type,
      itemId,
      comment: reviewText,
    };
    reviewData[`${type}Id`] = itemId;

    try {
      const res = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      const newReview = await res.json();
      setSubmitted(true);
      setError("");

      // Update local state immediately
      setReviews(prev => {
        const existingIndex = prev.findIndex(r => r.userId === user.id);
        if (existingIndex > -1) {
          prev[existingIndex] = newReview;
          return [...prev];
        }
        return [newReview, ...prev];
      });

      setTimeout(() => setSubmitted(false), 2500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
          {user?.firstName?.[0] || "U"}
        </div>
        <div>
          <h2 className="text-xl font-bold">Leave a Review</h2>
          <p className="text-gray-500 text-sm">Share your experience with others ✨</p>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Star rating */}
      <div className="flex gap-2 mb-6">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          return (
            <motion.div key={i} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <FaStar
                className={`cursor-pointer text-3xl transition-colors duration-200 ${
                  starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Comment textarea */}
      <div className="relative mb-4">
        <textarea
          className="w-full border rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          rows={4}
          maxLength={300}
          placeholder="Write your honest thoughts..."
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
        />
        <span className="absolute bottom-2 right-3 text-xs text-gray-400">
          {reviewText.length}/300
        </span>
      </div>

      {/* Submit button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition"
      >
        {reviews.some(r => r.userId === user?.id) ? "Update Review" : "Submit Review"}
      </motion.button>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-4 text-green-600 text-sm font-medium"
        >
          <CheckCircle2 className="w-5 h-5" /> Thank you! Your review has been submitted.
        </motion.div>
      )}

      {/* Display average rating */}
      {reviews.length > 0 && (
        <div className="mt-6">
          <p className="text-gray-600 font-semibold">
            Average Rating: {avgRating.toFixed(1)} ⭐ ({reviews.length} review
            {reviews.length > 1 ? "s" : ""})
          </p>
        </div>
      )}

      {/* Display reviews */}
      <div className="mt-4 space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="border p-3 rounded-lg">
            <p className="font-semibold">{r.userName}</p>
            <p className="text-yellow-400">{'⭐'.repeat(r.rating)}</p>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
