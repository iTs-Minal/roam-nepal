"use client";

import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-16"
      style={{ backgroundImage: "url('/bg-hero.jpg')" }}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full max-w-7xl py-16">
        {/* Left Content */}
        <div className="flex-1 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Travel Explore <br />
            And Enjoy Every <br />
            Moment
          </h1>
          <p className="text-base md:text-lg mb-6 max-w-lg">
            Embark on a journey where every moment opportunity for discovery.
            From bustling streets of cosmopolitan cities to the serene beauty of
            untouched landscapes, travel.
          </p>

          {/* Search Form */}
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 w-full max-w-md mb-4">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search destination..."
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">
              Booking Now
            </Button>
            <Button
              variant="outline"
              className="text-white border-white px-6 py-2 rounded-full hover:bg-white hover:text-green-600"
            >
              Discover →
            </Button>
          </div>
        </div>

        {/* Right Images */}
        <div className="flex-1 relative flex justify-center items-end gap-6 mt-6">
          {/* Left Large Image */}
          <div className="w-72 md:w-64 h-96 md:h-[420px] rounded-full overflow-hidden shadow-xl relative">
            <Image
              src="/hero1.jpg"
              alt="Scenic Nepal 1"
              width={400}
              height={500}
              className="w-full h-full object-cover"
            />

            {/* Small Floating Image inside left image gap */}
            <div className="absolute bottom-[-20px] left-[-40px] w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-md hidden sm:block">
              <Image
                src="/hero3.jpg"
                alt="Scenic Nepal 3"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Image - same size, positioned lower */}
          <div className="w-72 md:w-64 h-96 md:h-[420px] rounded-full overflow-hidden shadow-xl relative translate-y-6">
            <Image
              src="/hero2.jpg"
              alt="Scenic Nepal 2"
              width={400}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
