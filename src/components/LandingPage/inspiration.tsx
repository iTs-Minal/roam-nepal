"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const InspirationSection = () => {

    const ref = useRef(null);


  return (
    <section ref={ref} className="px-4 py-16 w-full mx-auto space-y-12 bg-gradient-to-r from-[#79d2e9] to-[#ffd2b8]">

      {/* Section 1: Spark Ideas */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        variants={fadeUp}>
        <p className="text-sm font-medium text-gray-500 uppercase mb-1 font-kanit">Start Your Journey</p>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">
            Spark Ideas <span className="font-normal font-outfit">For Your Nepal Adventure</span>
          </h2>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 hover:shadow-lg font-exo">More</button>
        </div>
        <p className="text-gray-800 mt-1 text-sm font-outfit">
          Popular Things To Do In The Heart Of The Himalayas
        </p>

        {/* Idea Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="relative rounded-xl overflow-hidden">
            <Image
              src="/paragliding.jpg" // Replace later
              alt="Pokhara"
              width={500}
              height={300}
              className="object-cover w-full h-56"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold font-ovo">Paragliding Over Pokhara</h3>
              <p className="text-sm text-white max-w-[85%] font-exo">
                Soar above lakes and hills for breathtaking aerial views of the Himalayas.
              </p>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <Image
              src="/treking.jpg" // Replace later
              alt="Treking Nepal"
              width={500}
              height={300}
              className="object-cover w-full h-56"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold font-ovo">Himalayan Trekking Adventures</h3>
              <p className="text-sm text-white max-w-[85%] font-exo">
                Discover iconic trails like Annapurna, Everest Base Camp, and Langtang Valley.
              </p>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <Image
              src="/florafauna.PNG" // Replace later
              alt="flora fauna"
              width={500}
              height={300}
              className="object-cover w-full h-56"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold font-ovo">Explore Flora & Fauna</h3>
              <p className="text-sm text-white max-w-[85%] font-exo">
                 Visit national parks to observe rare wildlife and vibrant biodiversity.
              </p>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Section 2: Best Retreats */}
      <motion.div
       initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        variants={fadeUp}
        className="mt-20"
      >
        <p className="text-sm font-medium text-gray-500 uppercase mb-1 font-kanit">Best Retreats</p>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">
            Choose <span className="font-normal font-outfit">A Highly Acclaimed Holiday Stay</span>
          </h2>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 hover:shadow-lg font-exo">
            Discover Holiday Rentals
          </button>
        </div>
        <p className="text-gray-800 mt-1 text-sm font-outfit">
          Experience Nepalese hospitality in beautiful mountain lodges and tranquil resorts.
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
                <p className="text-sm text-gray-900 mb-1 font-kanit">Starting From</p>
                <h3 className="text-lg font-semibold text-red-600 font-exo">NPR 9,455</h3>
                <p className="text-gray-800 text-sm font-medium font-outfit">Mountain View Eco Lodge</p>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Star size={16} className="fill-yellow-500 text-yellow-500 mr-1" />
                  4.9 · 1200+ Reviews
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default InspirationSection;
