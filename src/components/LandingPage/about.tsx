"use client"
import Image from "next/image";
import { Map, Mountain, Plane } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";


const textFade = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const AboutSection = () => {

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
    ref={ref}
      id="about"
      className=" w-full px-4 py-12 bg-gradient-to-t from-green-100 via-green-200 to-white relative"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Overlapping Images - Hidden on mobile, simplified image shown instead */}
        <motion.div 
         variants={textFade}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        className="relative w-full h-[400px] hidden sm:block">
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-2xl overflow-hidden shadow-lg z-30">
            <Image src="/about1.jpg" alt="img1" fill className="object-cover" />
          </div>
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-5 w-32 h-32 rounded-2xl overflow-hidden shadow-lg z-30">
            <Image src="/about2.jpg" alt="img2" fill className="object-cover" />
          </div>
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-36 h-36 rounded-2xl overflow-hidden shadow-lg z-20">
            <Image src="/about4.jpg" alt="img3" fill className="object-cover" />
          </div>
          {/* Center */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-84 h-84 rounded-2xl overflow-hidden shadow-lg z-10">
            <Image src="/about3.jpg" alt="img4" fill className="object-cover" />
          </div>
        </motion.div>

        {/* Single Image for Small Screens */}
        <motion.div 
         variants={textFade}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        className="sm:hidden w-full h-64 relative rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/about5.jpg"
            alt="imgMobile"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Right - Text Content */}
        <motion.div
        variants={textFade}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
        className="text-start px-2">
          <p className="text-sm font-semibold text-[#D97706] border-b-2 border-[#D97706] inline-block mb-1 font-kanit">
            About Nepal
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight font-kanit">
            Discover the <br />
            <span className="text-[#065F46]">Wonders of Nepal</span> <br />
            Every Month
          </h2>
          <p className="text-gray-600 mt-4 max-w-md text-sm font-exo">
            From the majestic Himalayas to serene lakes and cultural cities,
            explore curated destinations across Nepal — every season, every
            mood.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { value: "2000+", label: "Our Explorers" },
              { value: "100+", label: "Destinations" },
              { value: "20+", label: "Years Experience" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-100 px-6 py-4 rounded-xl text-center shadow-sm w-[calc(50%-0.5rem)] sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 + idx * 0.2 }}
              >
                <p className="text-2xl font-bold text-gray-900 font-kanit">{stat.value}</p>
                <p className="text-sm text-gray-600 font-outfit">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Bottom Feature Section */}
      <div className="mt-20 grid md:grid-cols-[250px_1fr] gap-10 items-start px-4 md:px-10">

        {/* Left Heading */}
        <motion.div 
         variants={textFade}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        className="text-start">
          <p className="text-sm font-semibold text-[#D97706] border-b-2 border-[#D97706] inline-block mb-1 font-kanit">
            What We Offer
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug font-ovo">
            Exclusive Features
          </h3>
          <span className="text-[#065F46] text-lg md:text-xl font-kanit">
            Tailored for Nepal
          </span>
          <p className="text-gray-600 mt-2 text-sm font-outfit">
            We offer the best experiences to explore Nepal’s nature, culture,
            and adventure — comfortably and safely.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Mountain size={32} className="text-[#D97706] mb-4" />,
              title: "Himalayan Adventures",
              desc: "Trek iconic trails to Everest, Annapurna, and more with expert local guides.",
            },
            {
              icon: <Map size={32} className="text-[#D97706] mb-4" />,
              title: "Curated Itineraries",
              desc: "Personalized travel plans covering culture, wildlife, and hidden gems.",
            },
            {
              icon: <Plane size={32} className="text-[#D97706] mb-4" />,
              title: "Seamless Booking",
              desc: "Hassle-free booking for transport, stays, and activities — all in one place.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-md p-6 rounded-xl text-left"
               initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4 + i * 0.2 }}
            >
              {item.icon}
              <h4 className="text-base font-semibold font-kanit">{item.title}</h4>
              <p className="text-sm text-gray-600 mt-2 font-outfit">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom Wave Transition */}
      <div className="absolute bottom-[-4rem] left-0 z-10 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C5,200 360,20 300,100 C600,150 700,0 1200,100 L1200,20 C20,20 Z"
            className="fill-[#fdf388]"
          ></path>
        </svg>
      </div>

    </section>
  );
};

export default AboutSection;
