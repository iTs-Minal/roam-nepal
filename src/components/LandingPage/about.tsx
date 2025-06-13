import Image from "next/image";
import { Map, Mountain, Plane } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className=" w-full px-4 py-12 bg-gradient-to-t from-green-100 via-green-200 to-white relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Overlapping Images - Hidden on mobile, simplified image shown instead */}
        <div className="relative w-full h-[400px] hidden sm:block">
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-2xl overflow-hidden shadow-lg z-30">
            <Image src="/about2.jpg" alt="img1" fill className="object-cover" />
          </div>
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-5 w-32 h-32 rounded-2xl overflow-hidden shadow-lg z-30">
            <Image src="/about6.jpg" alt="img2" fill className="object-cover" />
          </div>
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-36 h-36 rounded-2xl overflow-hidden shadow-lg z-20">
            <Image src="/about4.jpg" alt="img3" fill className="object-cover" />
          </div>
          {/* Center */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-84 h-84 rounded-2xl overflow-hidden shadow-lg z-10">
            <Image src="/about5.jpg" alt="img4" fill className="object-cover" />
          </div>
        </div>

        {/* Single Image for Small Screens */}
        <div className="sm:hidden w-full h-64 relative rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/about5.jpg"
            alt="imgMobile"
            fill
            className="object-cover"
          />
        </div>

        {/* Right - Text Content */}
        <div className="text-start px-2">
          <p className="text-sm font-semibold text-[#D97706] border-b-2 border-[#D97706] inline-block mb-1">
            About Nepal
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Discover the <br />
            <span className="text-[#065F46]">Wonders of Nepal</span> <br />
            Every Month
          </h2>
          <p className="text-gray-600 mt-4 max-w-md text-sm">
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
              <div
                key={idx}
                className="bg-gray-100 px-6 py-4 rounded-xl text-center shadow-sm w-[calc(50%-0.5rem)] sm:w-auto"
              >
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Feature Section */}
      <div className="mt-20 grid md:grid-cols-[250px_1fr] gap-10 items-start px-4 md:px-10">
        {/* Left Heading */}
        <div className="text-start">
          <p className="text-sm font-semibold text-[#D97706] border-b-2 border-[#D97706] inline-block mb-1">
            What We Offer
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
            Exclusive Features
          </h3>
          <span className="text-[#065F46] text-lg md:text-xl">
            Tailored for Nepal
          </span>
          <p className="text-gray-600 mt-2 text-sm">
            We offer the best experiences to explore Nepal’s nature, culture,
            and adventure — comfortably and safely.
          </p>
        </div>

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
            <div
              key={i}
              className="bg-white shadow-md p-6 rounded-xl text-left"
            >
              {item.icon}
              <h4 className="text-base font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Wave Transition */}
<div className="absolute bottom-[-3rem] left-0 z-10 w-full overflow-hidden leading-[0] rotate-180">
  <svg
    className="relative block w-[calc(100%+1.3px)] h-[100px]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
  >
    <path
      d="M0,40 C5,200 360,20 300,100 C600,150 700,0 1200,100 L1200,20 C20,20 Z"
      className="fill-[#fcf6bd]"
    ></path>
  </svg>
</div>
    </section>
  );
};

export default AboutSection;
