"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

const avatars = [
  { src: "/user1.jpg" },
  { src: "/user2.jpg" },
  { src: "/user3.jpg" },
  { src: "/user4.jpg" },
  { src: "/user5.jpg" },
  { src: "/user6.jpg" },
  { src: "/user7.jpg" },
  { src: "/user8.jpg" },
  { src: "/user9.jpg" },
];

const TestimonialSection = () => {
  return (
    <section className="bg-black text-white py-12 px-4 sm:px-8 md:px-16 relative overflow-hidden">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-4xl font-bold font-kanit mb-4">Testimonials</div>
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-cyan-300 rounded-full"></div>
          <div className="w-4 h-4 bg-cyan-300 rounded-full"></div>
          <div className="w-4 h-4 bg-cyan-300 rounded-full"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">
          320+
          <span className="font-medium text-lg align-middle ml-2">
            Join us on this journey of reflection and anticipation as we mark a
            decade of wanderlust, and here’s to the countless adventures yet to
            unfold!
          </span>
        </h2>
      </div>

      {/* Avatars – placed BELOW heading, ABOVE review */}
      <div className="relative z-10 flex flex-wrap justify-center items-center gap-6 max-w-4xl mx-auto mt-10 mb-4">
        {avatars.map((avatar, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-full overflow-hidden border border-gray-700 
              ${i % 2 === 0 ? "mt-0" : "mt-10"}
            `}
          >
            <Image
              src={avatar.src}
              alt={`User ${i + 1}`}
              width={48}
              height={48}
              className="object-cover w-full h-full opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>

      {/* Main Review Box */}
      <div className="max-w-4xl mx-auto mt-8 bg-[#111111] p-6 md:p-10 rounded-lg shadow-lg flex flex-col md:flex-row gap-6 items-start relative z-10">
        {/* Large user avatar */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
          <Image
            src="/mainuser.jpg"
            alt="Main user"
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Review content */}
        <div className="relative flex-1">
          <Quote className="absolute top-0 left-0 text-cyan-400 w-6 h-6" />
          <p className="text-lg leading-relaxed pl-8 pr-4">
            We’re proud to have partnered with over 320 growing companies who
            have chosen us as their trusted marketing services provider. Our
            track record speaks for itself – our strategies work. We’re proud to
            have partnered with over 320 growing companies who have chosen us as
            their trusted marketing services provider. Our track record speaks
            for itself – our strategies work.
          </p>
          <Quote className="absolute bottom-0 right-0 rotate-180 text-cyan-400 w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
