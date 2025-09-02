"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function ReviewSection({ placeId }: { placeId: number }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!rating || !review.trim()) return; // simple validation
    console.log({ placeId, rating, review });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setReview("");
    setRating(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-10"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
          U
        </div>
        <div>
          <h2 className="text-xl font-kanit font-bold">Leave a Review</h2>
          <p className="text-gray-500 text-sm">Share your experience with others ✨</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex gap-2 mb-6">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
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

      {/* Textarea */}
      <div className="relative mb-4">
        <textarea
          className="w-full border rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          rows={4}
          maxLength={300}
          placeholder="Write your honest thoughts..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <span className="absolute bottom-2 right-3 text-xs text-gray-400">
          {review.length}/300
        </span>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition"
      >
        Submit Review
      </motion.button>

      {/* Success Toast */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-4 text-green-600 text-sm font-medium"
        >
          <CheckCircle2 className="w-5 h-5" /> Thank you! Your review has been submitted.
        </motion.div>
      )}
    </motion.div>
  );
}

export default ReviewSection;
