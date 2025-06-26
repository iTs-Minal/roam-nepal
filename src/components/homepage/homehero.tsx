"use client";

import { useEffect, useState } from "react";
import TabButton from "./TabButton";
import { Home, Bed, Camera, Utensils, Plane, Hotel } from "lucide-react";
import { useSticky } from "../hooks/useSticky";

const tabs = [
  { label: "Search All", icon: <Home size={16} />, placeholder: "Places to go, things to do, hotels...", heading: "Where to?" },
  { label: "Hotels", icon: <Bed size={16} />, placeholder: "Search hotels...", heading: "Where to stay?" },
  { label: "Things to Do", icon: <Camera size={16} />, placeholder: "Search things to do...", heading: "What to do?" },
  { label: "Restaurants", icon: <Utensils size={16} />, placeholder: "Search restaurants...", heading: "Where to eat?" },
  { label: "Flights", icon: <Plane size={16} />, placeholder: "Search flights...", heading: "Where to fly?" },
  { label: "Vacation Rentals", icon: <Hotel size={16} />, placeholder: "Search vacation rentals...", heading: "Your next stay?" },
];

export default function HomeHero({ onStickyChange }: { onStickyChange?: (isSticky: boolean) => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const isSticky = useSticky(200);

  useEffect(() => {
    onStickyChange?.(isSticky);
  }, [isSticky, onStickyChange]);

  const currentTab = tabs[activeTab];

  return (
    <div className="pt-[80px] bg-white">
      {/* Heading */}
      {!isSticky && (
        <div className="text-center py-6 px-4">
          <h1 className="text-3xl md:text-4xl font-bold">{currentTab.heading}</h1>
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-center gap-2 flex-wrap max-w-5xl mx-auto px-2">
        {tabs.map((tab, idx) => (
          <TabButton
            key={idx}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === idx}
            onClick={() => setActiveTab(idx)}
          />
        ))}
      </div>

      {/* Sticky Search Bar */}
      <div className={`w-full mt-6 px-4 ${isSticky ? "sticky top-0 z-50 bg-white shadow-md py-3" : ""}`}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-2 items-center border rounded-full px-4 py-2 shadow-sm">
          <div className="flex items-center w-full">
            <span className="text-gray-400 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z" />
              </svg>
            </span>
            <input
              type="text"
              className="w-full px-2 py-1 focus:outline-none"
              placeholder={currentTab.placeholder}
            />
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-full w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
