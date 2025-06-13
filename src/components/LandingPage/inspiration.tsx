"use client";
import Image from "next/image";
import { Star } from "lucide-react";

const InspirationSection = () => {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto space-y-12">
      {/* Section 1: Spark Ideas */}
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase mb-1">Start Your Journey</p>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">
            Spark Ideas <span className="font-normal">For Your Next Journey</span>
          </h2>
          <button className="text-sm text-blue-600 hover:underline font-medium">More</button>
        </div>
        <p className="text-gray-500 mt-1 text-sm">
          Popular Destinations Among Bangladeshi Travelers
        </p>

        {/* Idea Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative rounded-xl overflow-hidden">
            <Image
              src="/newyear.jpg" // Replace later
              alt="Pokhara"
              width={500}
              height={300}
              className="object-cover w-full h-56"
            />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">New Year&apos;s Eve in New York City</h3>
              <p className="text-sm text-white/90 max-w-[85%]">
                Ring in the New Year with Iconic Moments and Unforgettable Memories in NYC.
              </p>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <Image
              src="/japan.jpg" // Replace later
              alt="Japan Ryokans"
              width={500}
              height={300}
              className="object-cover w-full h-56"
            />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">6 Best Ryokans in Japan to rejuvenate Yourself</h3>
              <p className="text-sm text-white/90 max-w-[85%]">
                Discover Unmissable Ryokans To Relax And Unwind In Style.
              </p>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <Image
              src="/japan.jpg" // Replace later
              alt="Japan Ryokans"
              width={500}
              height={300}
              className="object-cover w-full h-56"
            />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">6 Best Ryokans in Japan to rejuvenate Yourself</h3>
              <p className="text-sm text-white/90 max-w-[85%]">
                Discover Unmissable Ryokans To Relax And Unwind In Style.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Best Retreats */}
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase mb-1">Best Retreats</p>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">
            Choose <span className="font-normal">A Highly Acclaimed Holiday Stay</span>
          </h2>
          <button className="text-sm text-blue-600 hover:underline font-medium">
            Discover Holiday Rentals
          </button>
        </div>
        <p className="text-gray-500 mt-1 text-sm">
          Choose a highly acclaimed holiday stay for your next getaway and experience the best in comfort and luxury.
        </p>

        {/* Retreat Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, index) => (
            <div key={index} className="border rounded-xl overflow-hidden shadow-sm">
              <Image
                src={`/retreat${index + 1}.jpg`} // Replace later
                alt={`Retreat ${index + 1}`}
                width={400}
                height={250}
                className="w-full h-60 object-cover"
              />
              <div className="p-2">
                <p className="text-sm text-gray-500 mb-1">Starting From</p>
                <h3 className="text-lg font-semibold text-red-600">BDT 9,455</h3>
                <p className="text-gray-800 text-sm font-medium">Apartment Share Misato</p>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Star size={16} className="fill-yellow-500 text-yellow-500 mr-1" />
                  4.9 · 1200+ Reviews
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspirationSection;
