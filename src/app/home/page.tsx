"use client";
import BlogsSection from "@/components/homepage/blogs";
import TrendingCafes from "@/components/homepage/cafes";
import FAQs from "@/components/homepage/faq";
import HomeHero from "@/components/homepage/homehero";
import HomeNavbar from "@/components/homepage/homenavbar";
import TrendingItineraries from "@/components/homepage/itineraries";
import TrendingActivities from "@/components/homepage/popularactivities";
import PopularPlaces from "@/components/homepage/popularplaces";
import ReligiousPlaces from "@/components/homepage/religiousplace";
import TopAccommodations from "@/components/homepage/topaccommodation";
import FooterSection from "@/components/landingpage/footer";
import { useState } from "react";


export default function Home() {

    const [isSticky, setIsSticky] = useState(false);

  return (
    <main>
      <HomeNavbar />
      <HomeHero onStickyChange={setIsSticky} />
      <PopularPlaces/>
      <TopAccommodations/>
      <TrendingActivities/>
      <TrendingItineraries/>
      <ReligiousPlaces/>
      <TrendingCafes/>
      <BlogsSection/>
      <FAQs/>
      <FooterSection/>
    </main>
  );
}
