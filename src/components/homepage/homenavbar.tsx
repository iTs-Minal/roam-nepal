"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function HomeNavbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-6 py-4 shadow-sm bg-neutral-200 top-0 left-0 z-50 transition-all">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
        <Image src="/roam-nepal-black.png" alt="Roam Nepal" width={80} height={60} />
      </div>

      {/* Center: Nav Links (hidden on small screens) */}
      {(
        <ul className="hidden md:flex gap-6 text-sm text-gray-700 font-medium">
          <li className="hover:text-black cursor-pointer">Discover</li>
          <li className="hover:text-black cursor-pointer">Trips</li>
          <li className="hover:text-black cursor-pointer">Review</li>
          <li className="hover:text-black cursor-pointer">Blogs</li>
          <li className="hover:text-black cursor-pointer">About</li>
        </ul>
      )}

      {/* Right Side: Lang + Login + Hamburger */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <span>🌐</span>
          <span className="text-sm font-medium">NPR</span>
        </div>
        <Button variant="default" size="sm" className="hidden md:block hover:translate-y-[-2px]">
          Log In
        </Button>

        {/* Hamburger Menu Button for mobile */}
        <button className="md:hidden" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileNavOpen  && (
        <div className="absolute top-full right-0 w-full bg-white border-t mt-2 p-4 flex flex-col gap-3 md:hidden shadow-md">
          <a className="text-gray-700">Discover</a>
          <a className="text-gray-700">Trips</a>
          <a className="text-gray-700">Review</a>
          <a className="text-gray-700">More</a>
          <hr />
          <div className="flex items-center justify-between">
            <span>🌐 NPR</span>
            <Button variant="default" size="sm">Log In</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
