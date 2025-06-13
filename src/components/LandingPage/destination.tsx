"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const sliderDestinations = [
  {
    title: "Majestic Trails of the Annapurna Trek",
    image: "/annapurna.jpg",
  },
  {
    title: "Tranquil Reflections of Rara Lake",
    image: "/rara.jpg",
  },
  {
    title: "Lush Beauty of Ilam Tea Gardens",
    image: "/teagarden.jpg",
  },
  {
    title: "Spiritual Grandeur of Kathmandu's Temples",
    image: "/kathmandu.jpg",
  },
  {
    title: "Peaceful Retreat in Bandipur Hilltown",
    image: "/bandipur.jpg",
  },
];

// const recommendedDestinations = [
//   {
//     id: 1,
//     location: "UAE",
//     image: "/chitwan.jpg",
//     description:
//       "Experience luxury and innovation in the heart of the Middle East. From towering skyscrapers to golden deserts.",
//     badgeColor: "bg-red-500",
//   },
//   {
//     id: 2,
//     location: "Singapore",
//     image: "/bardia.jpg",
//     description:
//       "Discover the perfect blend of tradition and modernity in this vibrant city-state.",
//     badgeColor: "bg-green-500",
//   },
//   {
//     id: 3,
//     location: "New York",
//     image: "/pokhara.jpg",
//     description:
//       "The city that never sleeps awaits with iconic landmarks, world-class dining, and endless entertainment.",
//     badgeColor: "bg-blue-500",
//   },
//   {
//     id: 4,
//     location: "Toronto",
//     image: "/lumbini.jpg",
//     description:
//       "Canada's multicultural hub offering stunning skylines, diverse neighborhoods, and warm hospitality.",
//     badgeColor: "bg-orange-500",
//   },
// ];

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
    <section className="relative flex flex-col w-full px-4 py-16 text-center bg-gradient-to-br from-[#fdf388] via-[#fcf9dc] to-[#83ceff]">
      
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
          <div className="relative rounded-2xl overflow-hidden shadow-md h-80 w-60 bg-gray-200">
            <Image
              src="/map.PNG"
              alt="Location"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 text-white text-sm font-semibold">
              See true <br /> location
            </div>
          </div>

          {/* Weather Card */}
          <div className="relative bottom-[-3.5rem] ml-[-2rem] rounded-2xl overflow-hidden shadow-md h-66 w-50 bg-gray-200">
            <Image
              src="/weather.jpg"
              alt="Weather"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 text-white text-sm font-semibold">
              32° <br /> Sunny
            </div>
          </div>

          {/* Review Card */}
          <div className="relative rounded-2xl overflow-hidden shadow-md h-80 w-60 bg-white flex flex-col justify-center items-center p-4 ml-[-7rem]">
            <div className="flex -space-x-2 mb-2">
              <Image
                src="/avatar1.jpg"
                alt="Avatar 1"
                width={50}
                height={42}
                className="rounded-full border-2 border-white"
              />
              <Image
                src="/avatar2.jpg"
                alt="Avatar 2"
                width={50}
                height={42}
                className="rounded-full border-2 border-white"
              />
              <Image
                src="/avatar3.jpg"
                alt="Avatar 3"
                width={50}
                height={42}
                className="rounded-full border-2 border-white"
              />
            </div>
            <div className="flex items-center justify-center text-yellow-500 text-lg font-semibold">
              <Star size={18} className="fill-yellow-400" /> 4.8k
            </div>
            <p className="text-sm text-gray-700 mt-2 font-medium text-center">
              The World’s Most Enchanting Dive Destinations
            </p>
          </div>

          {/* Slider Card */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-md h-80 w-105 ml-[-9rem]">
            <Image
              src={currentDestination.image}
              alt={currentDestination.title}
              fill
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full px-4 pb-4 text-white flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-2">
              <p className="text-sm text-left sm:text-base font-medium max-w-[70%] leading-snug">
                {currentDestination.title}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="bg-white/20 hover:bg-white/30 p-1.5 rounded-full transition"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white/20 hover:bg-white/30 p-1.5 rounded-full transition"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Recommended Destinations Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-6 text-gray-800">
          {/* Row 1 - Chitwan */}
          <div className="flex flex-col justify-between">
            <h3 className="text-2xl text-left font-medium mb-2 leading-snug">
              <strong>Top -</strong> <br />
              Recommended Destinations
            </h3>
            <div className="relative">
              <Image
                src="/chitwan.jpg"
                alt="Chitwan Jungle"
                width={300}
                height={200}
                className="object-cover w-full h-36 rounded-xl"
              />
              <div className="absolute top-1 left-1 text-black font-bold text-sm px-2 py-1 rounded-full flex items-center gap-2 shadow-md">
                🌳 Forest - Chitwan
              </div>
            </div>
          </div>

          {/* Row 2 - Pokhara */}
          <div className="relative">
            <Image
              src="/pokhara.jpg"
              alt="Pokhara Lake"
              width={400}
              height={400}
              className="object-cover w-full h-72 rounded-xl"
            />
            <div className="absolute top-1 left-1 text-black font-bold text-sm px-2 py-1 rounded-full flex items-center gap-2 shadow-md">
              🏞️ Lake - Pokhara
            </div>
          </div>

          {/* Row 3 - Bardia */}
          <div className="relative">
            <Image
              src="/bardia.jpg"
              alt="Bardia National Park"
              width={400}
              height={400}
              className="object-cover w-full h-72 rounded-xl"
            />
            <div className="absolute top-1 left-1 text-black font-bold text-sm px-2 py-1 rounded-full flex items-center gap-2 shadow-md">
              🐘 Wildlife - Bardia
            </div>
          </div>

          {/* Row 4 - Lumbini */}
          <div className="flex flex-col justify-between">
            <div className="relative">
              <Image
                src="/lumbini.jpg"
                alt="Lumbini"
                width={400}
                height={200}
                className="object-cover w-full h-36 rounded-xl mb-2"
              />
              <div className="absolute top-1 left-1 text-white font-bold text-sm px-2 py-1 rounded-full flex items-center gap-2 shadow-md">
                🕊️ Peace - Lumbini
              </div>
            </div>
            <p className="text-sm text-left leading-relaxed text-gray-600">
              When it comes to planning a dream vacation, some destinations
              stand out as top recommendations for traveling across Nepal.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center">
  <button className="bg-gradient-to-r from-[#a7f3d0] to-[#6ee7b7] text-[#065f46] px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
    Explore More Destinations 
  </button>
</div>
      </div>
    </section>
  );
};

export default DestinationSection;
