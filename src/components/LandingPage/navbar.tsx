import React from "react";
import Image from 'next/image';
import { Button } from "../ui/button";
import { Globe } from 'lucide-react';
import Link from "next/link";


const navLinks = [
  { id: 1, text: "Tour", link: "/tour" },
  { id: 2, text: "Destination", link: "/destination" },
  { id: 5, text: "Places", link: "/places" },
  { id: 3, text: "Contact", link: "/contact" },
  { id: 4, text: "About", link: "/about" },
];


const Navbar = () => {
  return (
  <nav className="w-full px-4 py-3 shadow-sm bg-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/roam-nepal-black.png"
              alt="Roam Nepal"
              width={80}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Center navigation links */}
        <ul className="hidden md:flex gap-6 text-gray-800 font-medium font-outfit">
          {navLinks.map((item) => (
            <li key={item.id}>
              <Link href={item.link} className="hover:text-primary transition hover:bg-amber-50/30 hover:scale-105 px-2 py-2 rounded-full ">
                {item.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Language and Auth buttons on the right */}
        <div className="flex items-center gap-6">
          {/* Language */}
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <span className="p-1 bg-gray-200 rounded-full"><Globe size={18} /></span>
            <span className="font-bold">EN</span>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-3 font-kanit">
            <Button variant="secondary" size="sm">
              Login
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
