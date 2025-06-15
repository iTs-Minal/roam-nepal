import HeroSection from "@/components/landingpage/hero";
import Navbar from "@/components/landingpage/navbar";
import AboutSection from "@/components/landingpage/about";
import DestinationSection from "@/components/landingpage/destination";
import InspirationSection from "@/components/landingpage/inspiration";
import TestimonialSection from "@/components/landingpage/testimonial";
import FooterSection from "@/components/landingpage/footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-white text-gray-900">
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

       <section>
        <TestimonialSection />
      </section>

      <section>
        <FooterSection />
      </section>
    </main>
  );
}
