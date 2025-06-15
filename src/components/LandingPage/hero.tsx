"use client";

import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const textFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const HeroSection = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4 sm:px-8 pt-8 md:px-16"
      style={{ backgroundImage: "url('/bg-hero.jpg')" }}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full max-w-7xl py-8 sm:py-12 md:py-16">
        
        {/* Left Content */}
        <div className="flex-1 text-black">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-kanit leading-tight mb-6"
            initial="hidden"
            animate="visible"
            variants={textFadeIn}
          >
            Discover Nepals Hidden Wonders & Sacred Trails
          </motion.h1>
          <motion.p
            className=" md:text-lg mb-6 max-w-lg font-exo"
            initial="hidden"
            animate="visible"
            variants={textFadeIn}
            transition={{ delay: 0.5 }}
          >
            From the towering peaks of the Himalayas to the peaceful temples and
            vibrant villages, Nepal invites you to a journey of discovery, soul,
            and unforgettable moments.
          </motion.p>

          {/* Search Form */}
          <motion.div
            className="flex items-center gap-2 bg-white rounded-full px-4 py-3 w-full max-w-md mb-4"
            initial="hidden"
            animate="visible"
            variants={textFadeIn}
            transition={{ delay: 0.8 }}
          >
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Where do you dream to go?"
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            />
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textFadeIn}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center gap-4 font-ovo w-full"
          >
            <Button className="bg-gradient-to-l from-[#a7f3d0] to-[#46f3ae] text-black px-8 py-6 rounded-full hover:scale-105 text-lg font-semibold w-full sm:w-auto">
              Booking Now →
            </Button>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-[#99c7fc] to-[#38b7d6] border-2 border-black text-black px-8 py-6 rounded-full hover:scale-105 hover:bg-indigo-50 text-lg font-semibold w-full sm:w-auto"
            >
              Discover More →
            </Button>
          </motion.div>
        </div>

        {/* Right Images */}
        <div className="flex-1 relative hidden md:flex justify-center items-end  mt-6">
          {/* Left Large Image */}
          <motion.div
            className="w-72 md:w-64 h-96 md:h-[420px] rounded-4xl overflow-hidden border-white border-2 shadow-xl relative translate-y-[-15]"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/hero1.jpg"
              alt="Scenic Nepal 1"
              width={400}
              height={500}
              className="w-full h-full object-cover"
            />
          </motion.div>{" "}
          {/* Small Floating Image inside left image gap */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + 0 * 0.2 }}
            className="absolute top-5 left-1 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 overflow-hidden border-white shadow-md hidden sm:block"
          >
            <Image
              src="/small-hero1.jpg"
              alt="Scenic Nepal 3"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + 1 * 0.2 }}
            className="absolute top-25 left-1 w-40 h-20 sm:w-24 sm:h-24 rounded-full border-4 overflow-hidden border-white shadow-md hidden sm:block"
          >
            <Image
              src="/small-hero2.jpg"
              alt="Scenic Nepal 3"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + 2 * 0.2 }}
            className="absolute top-45 left-1 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 overflow-hidden border-white shadow-md hidden sm:block"
          >
            <Image
              src="/small-hero3.jpg"
              alt="Scenic Nepal 3"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + 3 * 0.2 }}
            className="absolute top-65 left-1 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 overflow-hidden border-white shadow-md hidden sm:block"
          >
            <Image
              src="/small-hero4.jpg"
              alt="Scenic Nepal 3"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Right Image - same size, positioned lower */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-72 md:w-64 h-96 md:h-[420px] rounded-4xl overflow-hidden border-white border-2 shadow-xl relative translate-y-15 translate-x-[-30px]"
          >
            <Image
              src="/hero2.jpg"
              alt="Scenic Nepal 2"
              width={400}
              height={500}
              className="w-full h-full object-cover rounded-4xl"
            />
          </motion.div>
        </div>

      </div>

      {/* SVG Wave Divider */}
      <div className="absolute bottom-[-3rem] left-0 w-full z-10 overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[80px]"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.46,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-[#f5fffb]"
          ></path>
        </svg>
      </div>

    </section>
  );
};

export default HeroSection;
