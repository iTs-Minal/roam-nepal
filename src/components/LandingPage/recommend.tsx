import Image from "next/image";
import { Map, Mountain, Plane } from "lucide-react";

const RecommendationSection = () => {
  return (
    <section id="about" className="w-full px-4 py-16 bg-green-200/70">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Overlapping Images */}
        <div className="relative w-full h-[400px]">
          {/* Image 1 - Bottom Left */}
          <div className="absolute bottom-0 left-0 w-50 h-50 rounded-3xl overflow-hidden shadow-lg z-30">
            <Image src="/reco1.jpg" alt="img1" fill className="object-cover" />
          </div>

          {/* Image 2 - Top Right */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-3xl overflow-hidden shadow-lg z-20">
            <Image src="/reco2.jpg" alt="img2" fill className="object-cover" />
          </div>

          {/* Image 3 - Center */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-100 h-100 rounded-3xl overflow-hidden shadow-lg z-10">
            <Image src="/reco3.jpg" alt="img3" fill className="object-cover" />
          </div>
        </div>

        {/* Right - Text Content */}
        <div className="text-start">
          <p className="text-sm font-semibold text-[#D97706] border-b-2 border-[#D97706] inline-block mb-1">
            About Nepal
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Discover the <br />
            <span className="text-[#065F46]">Wonders of Nepal</span> <br />
            Every Month
          </h2>
          <p className="text-gray-600 mt-4 max-w-md text-sm">
             From the majestic Himalayas to serene lakes and cultural cities,
            explore curated destinations across Nepal — every season, every mood.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-gray-100 px-6 py-4 rounded-xl text-center shadow-sm">
              <p className="text-2xl font-bold text-gray-900">2000+</p>
              <p className="text-sm text-gray-600">Our Explorers</p>
            </div>
            <div className="bg-gray-100 px-6 py-4 rounded-xl text-center shadow-sm">
              <p className="text-2xl font-bold text-gray-900">100+</p>
              <p className="text-sm text-gray-600">Destinations</p>
            </div>
            <div className="bg-gray-100 px-6 py-4 rounded-xl text-center shadow-sm">
              <p className="text-2xl font-bold text-gray-900">20+</p>
              <p className="text-sm text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Section */}
      <div className="mt-20 grid md:grid-cols-[250px_1fr] gap-10 items-start px-10">
        {/* Left - Section Heading */}
        <div className="text-start">
          <p className="text-sm font-semibold text-[#D97706] border-b-2 border-[#D97706] inline-block mb-1">
            What We Offer
          </p>
          <h3 className="text-2xl font-bold text-gray-900 leading-snug">
            Exclusive Features 
          </h3>
          <span className="text-[#065F46] text-xl">Tailored for Nepal</span>
          <p className="text-gray-600 mt-2 text-sm">
             We offer the best experiences to explore Nepal’s nature, culture, and adventure — comfortably and safely.
          </p>
        </div>

        {/* Right - Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white shadow-md p-6 rounded-xl text-left">
            <Mountain size={32} className="text-[#D97706] mb-4" />
            <h4 className="text-base font-semibold">Himalayan Adventures</h4>
            <p className="text-sm text-gray-600 mt-2">
             Trek iconic trails to Everest, Annapurna, and more with expert local guides.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-md p-6 rounded-xl text-left">
            <Map size={32} className="text-[#D97706] mb-4" />
            <h4 className="text-base font-semibold">Curated Itineraries</h4>
            <p className="text-sm text-gray-600 mt-2">
              Personalized travel plans covering culture, wildlife, and hidden gems.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-md p-6 rounded-xl text-left">
            <Plane size={32} className="text-[#D97706] mb-4" />
            <h4 className="text-base font-semibold">Seamless Booking</h4>
            <p className="text-sm text-gray-600 mt-2">
              Hassle-free booking for transport, stays, and activities — all in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
