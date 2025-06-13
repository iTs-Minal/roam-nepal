import HeroSection from "@/components/landingpage/hero";
import Navbar from "@/components/landingpage/navbar";
import AboutSection from "@/components/landingpage/about";
import DestinationSection from "@/components/landingpage/destination";
import InspirationSection from "@/components/landingpage/inspiration";

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
        <AboutSection />
      </section>

      <section>
        <DestinationSection />
      </section>

      <section>
        <InspirationSection />
      </section>
    </main>
  );
}
