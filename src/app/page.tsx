import HeroSection from "@/components/landingpage/hero";
import Navbar from "@/components/landingpage/navbar";

export default function Home() {
  return (
<main className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Sticky navbar for better UX */}
      <header className="w-full fixed z-50 bg-white/10">
        <Navbar />
      </header>

      {/* Hero section with full-screen height */}
      <section>
        <HeroSection />
      </section>
    </main>
  );
}
