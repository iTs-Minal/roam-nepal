"use client";

import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

const FooterSection = () => {
  return (
    <footer className="bg-gray-400/20 text-gray-800 px-6 md:px-16 pt-12 pb-6 font-outfit border-t">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Branding + Text */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image src="/roam-nepal-black.png" alt="Logo" width={40} height={40} />
            <div className="font-kanit text-lg font-semibold">Travel Destination</div>
          </div>
          <p className="text-sm text-gray-600">
            Certainly! Are you looking for information about a specific travel tour, 
            or would you like some recommendations for travel tours in a particular 
            destination? Let me know how I can assist you further.
          </p>

          <div className="flex gap-4 mt-4 text-cyan-600">
            <Twitter className="w-5 h-5 cursor-pointer" />
            <Facebook className="w-5 h-5 cursor-pointer" />
            <Instagram className="w-5 h-5 cursor-pointer" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 cursor-pointer"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M380.9 97.1c-45.4-45.4-119.1-45.4-164.5 0L62.3 251.2c-9.4 9.4-14.3 21.7-14.3 34.9v116.6c0 18.8 15.2 34 34 34h116.6c13.2 0 25.5-4.9 34.9-14.3l154.1-154.1c45.3-45.5 45.3-119.1-.1-164.6zM238 388.4c-4.5 4.5-10.6 7-17 7H104c-8.8 0-16-7.2-16-16V267c0-6.4 2.5-12.5 7-17l132-132 104 104-132 132z" />
            </svg>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold font-exo mb-3">Service</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>How it Works</li>
            <li>Our Service</li>
            <li>Our Blog</li>
            <li>Listing</li>
          </ul>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="text-lg font-semibold font-exo mb-3">Gallery</h3>
          <div className="grid grid-cols-2 gap-2">
            <Image
              src="/footer1.jpg"
              alt="Gallery 1"
              width={80}
              height={80}
              className="rounded-tl-4xl rounded-br-4xl  object-cover w-full h-auto"
            />
            <Image
              src="/footer2.jpg"
              alt="Gallery 2"
              width={80}
              height={80}
              className="rounded-tr-4xl rounded-bl-4xl object-cover w-full h-auto"
            />
            <Image
              src="/footer3.jpg"
              alt="Gallery 3"
              width={80}
              height={80}
              className="rounded-bl-4xl rounded-tr-4xl object-cover w-full h-auto"
            />
            <Image
              src="/footer4.jpg"
              alt="Gallery 4"
              width={80}
              height={80}
              className="rounded-br-4xl rounded-tl-4xl object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold font-exo mb-3">Contact</h3>
          <ul className="text-sm text-gray-600 space-y-4">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Hetauda, Nepal (NP), 44100
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +977 9878560321
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> roamnepal@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t pt-4 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex gap-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms Of Service</a>
        </div>
        <p>
          ROAM NEPAL @2025 All Reserved <span className="text-cyan-600">By Travel</span>
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
