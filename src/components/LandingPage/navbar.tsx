"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { id: 1, text: "Tour", link: "/tour" },
  { id: 2, text: "Destination", link: "/destination" },
  { id: 5, text: "Places", link: "/places" },
  { id: 3, text: "Contact", link: "/contact" },
  { id: 4, text: "About", link: "#about" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full px-4 py-3 shadow-sm bg-white/20">
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
            <li key={item.id} className="hover:translate-y-[-2px] transition">
              <Link
                href={item.link}
                className="hover:text-primary transition hover:bg-amber-50/30 px-2 py-2 rounded-full"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section: Language + Auth + Menu */}
        <div className="flex items-center gap-4">
          {/* Language (hidden on small screens) */}
          <div className="hidden md:flex items-center gap-1 text-sm text-gray-700">
            <span className="p-1 bg-gray-200 rounded-full">
              <Globe size={18} />
            </span>
            <span className="font-bold cursor-point">EN</span>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-2 font-kanit">
            <Button variant="default" size="sm" className="hover:translate-y-[-2px]">
              Log In
            </Button>
          </div>

          {/* Menu Button - only on mobile */}
          <button
            className="md:hidden ml-2 p-2 text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 px-4 py-4 bg-white shadow-md rounded-lg space-y-3">
          <ul className="flex flex-col gap-3 font-outfit text-gray-800">
            {navLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-amber-50"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language selector */}
          <div className="flex items-center gap-2 text-sm text-gray-700 pt-3 border-t">
            <span className="p-1 bg-gray-200 rounded-full">
              <Globe size={18} />
            </span>
            <span className="font-bold">EN</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
