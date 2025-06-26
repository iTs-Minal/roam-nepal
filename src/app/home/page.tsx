"use client";
import HomeHero from "@/components/homepage/homehero";
import HomeNavbar from "@/components/homepage/homenavbar";
import PopularPlaces from "@/components/homepage/popularplaces";
import { useState } from "react";


export default function Home() {

    const [isSticky, setIsSticky] = useState(false);

  return (
    <main>
      <HomeNavbar isSearchSticky={isSticky} />
      <HomeHero onStickyChange={setIsSticky} />
      <PopularPlaces/>
    </main>
  );
}
