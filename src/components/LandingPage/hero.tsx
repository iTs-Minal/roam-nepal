"use client";

import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4 sm:px-8 pt-8 md:px-16"
      style={{ backgroundImage: "url('/bg-hero.jpg')" }}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full max-w-7xl py-8 sm:py-12 md:py-16">
        {/* Left Content */}
        <div className="flex-1 text-black">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-kanit leading-tight mb-6">
            Discover Nepals Hidden
            Wonders & Sacred Trails
          </h1>
          <p className=" md:text-lg mb-6 max-w-lg font-exo">
            From the towering peaks of the Himalayas to the peaceful temples and
            vibrant villages, Nepal invites you to a journey of discovery, soul,
            and unforgettable moments.
          </p>

          {/* Search Form */}
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-3 w-full max-w-md mb-4">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Where do you dream to go?"
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 font-ovo w-full">
            <Button className="bg-green-600/90 text-white px-8 py-6 rounded-full hover:bg-green-700 text-lg font-semibold w-full sm:w-auto">
              Booking Now →
            </Button>
            <Button
              variant="outline"
              className="border-2 border-indigo-600 text-black px-8 py-6 rounded-full hover:bg-indigo-50 text-lg font-semibold w-full sm:w-auto"
            >
              Discover →
            </Button>
          </div>
        </div>

        {/* Right Images */}
        <div className="flex-1 relative hidden md:flex justify-center items-end  mt-6">
          {/* Left Large Image */}
          <div className="w-72 md:w-64 h-96 md:h-[420px] rounded-4xl overflow-hidden border-white border-2 shadow-xl relative translate-y-[-15]">
            <Image
              src="/hero1.jpg"
              alt="Scenic Nepal 1"
              width={400}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>{" "}
          {/* Small Floating Image inside left image gap */}
          <div className="absolute top-5 left-1 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 overflow-hidden border-white shadow-md hidden sm:block">
            <Image
              src="/small-hero1.jpg"
              alt="Scenic Nepal 3"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-25 left-1 w-40 h-20 sm:w-24 sm:h-24 rounded-full border-4 overflow-hidden border-white shadow-md hidden sm:block">
            <Image
              src="/small-hero2.jpg"
              alt="Scenic Nepal 3"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-45 left-1 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 overflow-hidden border-white shadow-md hidden sm:block">
            <Image
              src="/small-hero3.jpg"
              alt="Scenic Nepal 3"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-65 left-1 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 overflow-hidden border-white shadow-md hidden sm:block">
            <Image
              src="/small-hero4.jpg"
              alt="Scenic Nepal 3"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right Image - same size, positioned lower */}
          <div className="w-72 md:w-64 h-96 md:h-[420px] rounded-4xl overflow-hidden border-white border-2 shadow-xl relative translate-y-15 translate-x-[-30px]">
            <Image
              src="/hero2.jpg"
              alt="Scenic Nepal 2"
              width={400}
              height={500}
              className="w-full h-full object-cover rounded-4xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
