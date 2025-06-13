"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const sliderDestinations = [
  {
    title: "The Most Breathtaking Beaches of Papua Island",
    image: "/chitwan.jpg",
  },
  {
    title: "Scenic Serenity of Rara Lake",
    image: "/pokhara.jpg",
  },
  {
    title: "Mystical Beauty of Mustang Valley",
    image: "/lumbini.jpg",
  },
  {
    title: "Mystical Beauty of Mustang Valley",
    image: "/bardia.jpg",
  },
];

const recommendedDestinations = [
  {
    id: 1,
    location: "UAE",
    image: "/chitwan.jpg",
    description:
      "Experience luxury and innovation in the heart of the Middle East. From towering skyscrapers to golden deserts.",
    badgeColor: "bg-red-500",
  },
  {
    id: 2,
    location: "Singapore",
    image: "/bardia.jpg",
    description:
      "Discover the perfect blend of tradition and modernity in this vibrant city-state.",
    badgeColor: "bg-green-500",
  },
  {
    id: 3,
    location: "New York",
    image: "/pokhara.jpg",
    description:
      "The city that never sleeps awaits with iconic landmarks, world-class dining, and endless entertainment.",
    badgeColor: "bg-blue-500",
  },
  {
    id: 4,
    location: "Toronto",
    image: "/lumbini.jpg",
    description:
      "Canada's multicultural hub offering stunning skylines, diverse neighborhoods, and warm hospitality.",
    badgeColor: "bg-orange-500",
  },
];

const DestinationSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sliderDestinations.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === sliderDestinations.length - 1 ? 0 : prev + 1
    );
  };

  const currentDestination = sliderDestinations[currentIndex];

  return (
    <section className="flex flex-col w-full px-4 py-16 bg-white text-center">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <p className="text-sm font-medium text-gray-500 uppercase mb-2">
          Explore Monthly
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          We Recommend <br className="hidden md:block" />
          Destinations Every Month
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10 text-sm">
          Embark on the adventure of a lifetime, where every step you take
          unveils a new story, and every destination leaves a lasting
          impression.
        </p>

        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Map Card */}
          <div className="relative rounded-2xl overflow-hidden shadow-md h-60 bg-gray-200">
            <Image src="/map.PNG" alt="Location" fill className="object-cover" />
            <div className="absolute bottom-3 left-3 text-white text-sm font-semibold">
              See true <br /> location
            </div>
          </div>

          {/* Weather Card */}
          <div className="relative rounded-2xl overflow-hidden shadow-md h-60 bg-gray-200">
            <Image src="/weather.jpg" alt="Weather" fill className="object-cover" />
            <div className="absolute bottom-3 left-3 text-white text-sm font-semibold">
              32° <br /> Sunny
            </div>
          </div>

          {/* Review Card */}
          <div className="relative rounded-2xl overflow-hidden shadow-md h-60 bg-white flex flex-col justify-center items-center p-4">
            <div className="flex -space-x-2 mb-2">
              <Image src="/avatar1.jpg" alt="Avatar 1" width={50} height={42} className="rounded-full border-2 border-white" />
              <Image src="/avatar2.jpg" alt="Avatar 2" width={50} height={42} className="rounded-full border-2 border-white" />
              <Image src="/avatar3.jpg" alt="Avatar 3" width={50} height={42} className="rounded-full border-2 border-white" />
            </div>
            <div className="flex items-center justify-center text-yellow-500 text-lg font-semibold">
              <Star size={18} className="fill-yellow-400" /> 4.8k
            </div>
            <p className="text-sm text-gray-700 mt-2 font-medium text-center">
              The World’s Most Enchanting Dive Destinations
            </p>
          </div>

          {/* Slider Card */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-md h-60">
            <Image
              src={currentDestination.image}
              alt={currentDestination.title}
              fill
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full px-4 pb-4 text-white flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-2">
              <p className="text-sm sm:text-base font-medium max-w-[70%] leading-snug">
                {currentDestination.title}
              </p>
              <div className="flex gap-2">
                <button onClick={handlePrev} className="bg-white/20 hover:bg-white/30 p-1.5 rounded-full transition">
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button onClick={handleNext} className="bg-white/20 hover:bg-white/30 p-1.5 rounded-full transition">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Destinations */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={destination.image}
                  height={192}
                  width={320}
                  alt={destination.location}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <div
                  className={`inline-flex items-center ${destination.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium mb-3`}
                >
                  <span className="w-3 h-3 bg-white/20 rounded-sm mr-2"></span>
                  {destination.location}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {destination.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Explore More Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;
