import HeroSection from "@/components/landingpage/hero";
import Navbar from "@/components/landingpage/navbar";
import RecommendationSection from "@/components/landingpage/recommend";

export default function Home() {
  return (
<main className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Sticky navbar for better UX */}
      <header className="absolute w-full z-50 bg-white/10">
        <Navbar />
      </header>

      {/* Hero section with full-screen height */}
      <section>
        <HeroSection />
      </section>

      <section>
        <RecommendationSection />
      </section>
    </main>
  );
}
