"use client";
import BlogsSection from "@/components/homepage/blogs";
import FAQs from "@/components/homepage/faq";
import HomeHero from "@/components/homepage/homehero";
import HomeNavbar from "@/components/homepage/homenavbar";
import TrendingActivities from "@/components/homepage/popularactivities";
import PopularPlaces from "@/components/homepage/popularplaces";
import ReligiousPlaces from "@/components/homepage/religiousplace";
import TopAccommodations from "@/components/homepage/topaccommodation";
import { useState } from "react";


export default function Home() {

    const [isSticky, setIsSticky] = useState(false);

  return (
    <main>
      <HomeNavbar isSearchSticky={isSticky} />
      <HomeHero onStickyChange={setIsSticky} />
      <PopularPlaces/>
      <TopAccommodations/>
      <TrendingActivities/>
      <ReligiousPlaces/>
      <BlogsSection/>
      <FAQs/>
    </main>
  );
}
