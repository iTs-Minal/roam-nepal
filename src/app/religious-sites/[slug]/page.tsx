/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import HeroSlider from "@/components/ui/heroslider";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUserShield,
  FaInfoCircle,
  FaUsers,
  FaCamera,
  FaTshirt,
  FaStar,
  FaPrayingHands,
} from "react-icons/fa";
import FooterSection from "@/components/landingpage/footer";
import HomeNavbar from "@/components/homepage/homenavbar";
import dynamic from "next/dynamic";
import ReviewSection from "@/components/ui/review";
import ReviewsDisplay from "@/components/ui/review-display";

interface Params {
  slug: string;
}

export default async function ReligiousSitePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  // Define the expected type for the religious site object
  type ReligiousSite = {
    name: string;
    id: number;
    slug: string;
    description: string;
    history?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    images?: string[];
    placeId?: number;
    visitingHours?: string | null;
    rituals?: Array<{
      name: string;
      description?: string | null;
      time?: string | null;
      images?: string[];
    }>;
    significance?: string | null;
    bestTimeToVisit?: string | null;
    nearbyAttractions?: string | null;
    openingHours?: string | null;
    entryFee?: { internal?: string; external?: string; notes?: string };
    dressCode?: string | null;
    photography?: string | null;
    facilities?: Record<string, boolean>;
    accessibility?: Record<string, boolean>;
    festivals?: Array<{
      name: string;
      month?: string;
      description?: string;
      images?: string[];
    }>;
    safetyGuidelines?: string[];
    contactInfo?: { 
      phone?: string; 
      email?: string; 
      website?: string;
      address?: string;
    };
  };

  const religiousSite = await prisma.religiousSite.findUnique({
    where: { slug },
  });

  const Map = dynamic(() => import("@/components/ui/map"));

  if (!religiousSite) return notFound();

  return (
    <>
      <HomeNavbar />

      {/* Hero Slider */}
      <div className="w-full relative">
        <HeroSlider
          images={religiousSite.images || []}
          title={religiousSite.name}
          location={religiousSite.location}
        />
      </div>

      <div className="max-w-6xl mx-auto py-12 space-y-12 px-4">
        {/* Overview Section */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-md p-8">
          <h2 className="text-3xl md:text-4xl font-kanit font-bold mb-4 flex items-center gap-3 text-blue-800">
            <FaInfoCircle /> Overview
          </h2>
          <p className="text-lg font-outfit text-gray-700 leading-relaxed">
            {religiousSite.description}
          </p>
        </section>

        {/* Visitor Info Cards */}
        <section>
          <h2 className="text-2xl font-kanit font-bold mb-6">Visitor Info</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {religiousSite.history && (
              <InfoCard
                title="History"
                content={religiousSite.history}
                icon={<FaUsers className="text-blue-600" />}
                bgColor="bg-yellow-50"
              />
            )}
            {religiousSite.significance && (
              <InfoCard
                title="Significance"
                content={religiousSite.significance}
                icon={<FaUsers className="text-purple-600" />}
                bgColor="bg-purple-50"
              />
            )}
            {religiousSite.bestTimeToVisit && (
              <InfoCard
                title="Best Time to Visit"
                content={religiousSite.bestTimeToVisit}
                icon={<FaClock className="text-green-600" />}
                bgColor="bg-green-50"
              />
            )}
            {religiousSite.openingHours && (
              <InfoCard
                title="Opening Hours"
                content={religiousSite.openingHours}
                icon={<FaClock className="text-orange-600" />}
                bgColor="bg-orange-50"
              />
            )}
            {typeof religiousSite.entryFee === "object" &&
              religiousSite.entryFee !== null &&
              !Array.isArray(religiousSite.entryFee) && (
                <InfoCard
                  title="Entry Fee"
                  content={`Internal: ${
                    (religiousSite.entryFee as any).internal || "N/A"
                  } | External: ${
                    (religiousSite.entryFee as any).external || "N/A"
                  } | Notes: ${(religiousSite.entryFee as any).notes || ""}`}
                  icon={<FaMoneyBillWave className="text-teal-600" />}
                  bgColor="bg-teal-50"
                />
              )}
            {religiousSite.dressCode && (
              <InfoCard
                title="Dress Code"
                content={religiousSite.dressCode}
                icon={<FaTshirt className="text-pink-600" />}
                bgColor="bg-pink-50"
              />
            )}
            {religiousSite.photography && (
              <InfoCard
                title="Photography"
                content={religiousSite.photography}
                icon={<FaCamera className="text-gray-600" />}
                bgColor="bg-gray-100"
              />
            )}
          </div>
        </section>

        {/* Rituals */}
        {religiousSite.rituals && religiousSite.rituals.length > 0 && (
          <section>
            <h2 className="text-2xl font-kanit font-bold mb-6 flex items-center gap-2">
              <FaPrayingHands /> Rituals & Ceremonies
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {religiousSite.rituals.map((ritual, idx) => (
                <div
                  key={idx}
                  className="bg-purple-50 rounded-xl shadow p-6 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-lilita text-purple-800 mb-2">
                    {ritual.name}
                  </h3>
                  <p className="text-gray-700 font-exo text-base">
                    {ritual.description}
                  </p>
                  {ritual.time && (
                    <p className="text-sm text-gray-600 mt-2">
                      ⏰ {ritual.time}
                    </p>
                  )}
                  {ritual.images?.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {ritual.images.map((img: string, i: number) => (
                        <div
                          key={i}
                          className="relative w-full h-32 rounded overflow-hidden"
                        >
                          <Image
                            src={img}
                            alt={ritual.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black opacity-20 rounded"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Festivals */}
        {religiousSite.festivals && religiousSite.festivals.length > 0 && (
          <section>
            <h2 className="text-2xl font-kanit font-bold mb-6 flex items-center gap-2">
              <FaStar /> Festivals
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {religiousSite.festivals.map(
                (
                  festival: {
                    name: string;
                    month?: string;
                    description?: string;
                    images?: string[];
                  },
                  idx: number
                ) => (
                  <div
                    key={idx}
                    className="bg-yellow-50 rounded-xl shadow-md p-6 hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-lilita text-yellow-800 mb-2">
                      {festival.name}
                    </h3>
                    <p className="text-gray-700 font-outfit text-base">
                      <span className="font-ovo">{festival.month}</span> –{" "}
                      {festival.description}
                    </p>
                    {festival.images && festival.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {festival.images.map((img, i) => (
                          <div
                            key={i}
                            className="relative w-full h-32 rounded overflow-hidden"
                          >
                            <Image
                              src={img}
                              alt={festival.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-20 rounded"></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {religiousSite.latitude && religiousSite.longitude && (
          <section>
            <h2 className="text-2xl font-kanit font-bold mb-6">Location</h2>
            <Map
              latitude={religiousSite.latitude}
              longitude={religiousSite.longitude}
              title={religiousSite.name}
            />
          </section>
        )}

        {/* Nearby Attractions */}
        {religiousSite.nearbyAttractions && religiousSite.nearbyAttractions.length > 0 && (
          <section>
            <h2 className="text-2xl font-kanit font-bold mb-6">
              Nearby Attractions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {religiousSite.nearbyAttractions?.map(
                (
                  attraction: {
                    name: string;
                    description?: string;
                    distance?: string;
                    images?: string[];
                  },
                  idx: number
                ) => (
                  <div
                    key={idx}
                    className="bg-blue-50 rounded-xl shadow-md p-6 hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-lilita text-blue-800 mb-2">
                      {attraction.name}
                    </h3>
                    <p className="text-gray-700 font-outfit text-base">
                      {attraction.description}
                    </p>
                    {attraction.distance && (
                      <p className="text-sm text-gray-600 mt-1">
                        Distance: {attraction.distance}
                      </p>
                    )}
                    {attraction.images && attraction.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {attraction.images?.map((img, i) => (
                          <div
                            key={i}
                            className="relative w-full h-32 rounded overflow-hidden"
                          >
                            <Image
                              src={img}
                              alt={attraction.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-20 rounded"></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* Facilities & Accessibility */}
        {(religiousSite.facilities || religiousSite.accessibility) && (
          <section className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-kanit font-bold mb-4 flex items-center gap-2">
              <FaUsers /> Facilities & Accessibility
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {religiousSite.facilities && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-lilita mb-2 text-lg">Facilities</h3>
                  <ul className="list-disc list-inside font-exo text-gray-700 space-y-1">
                    {Object.entries(religiousSite.facilities).map(([key, value]) => (
                      <li key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                        {value ? "✅ Yes" : "❌ No"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {religiousSite.accessibility && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-lilita mb-2 text-lg">Accessibility</h3>
                  <ul className="list-disc list-inside font-exo text-gray-700 space-y-1">
                    {Object.entries(religiousSite.accessibility).map(([key, value]) => (
                      <li key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                        {value ? "✅ Yes" : "❌ No"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Safety Guidelines */}
        {religiousSite.safetyGuidelines?.length > 0 && (
          <section className="bg-red-50 rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-kanit font-bold mb-3 flex items-center gap-2">
              <FaUserShield className="text-red-600" /> Safety Guidelines
            </h2>
            <ul className="list-disc list-inside text-gray-700 font-outfit space-y-2">
              {religiousSite.safetyGuidelines?.map(
                (rule: { description: string }, idx: number) => (
                  <li key={idx}>{rule.description}</li>
                )
              )}
            </ul>
          </section>
        )}

        {/* Contact Info */}
        {religiousSite.contactInfo && (
          <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-kanit font-bold mb-3 flex items-center gap-2">
              <FaMapMarkerAlt /> Contact Info
            </h2>
            <ul className="text-gray-700 font-exo list-disc list-inside space-y-1">
              {(religiousSite.contactInfo as any).phone && (
                <li>Phone: {(religiousSite.contactInfo as any).phone}</li>
              )}
              {(religiousSite.contactInfo as any).email && (
                <li>Email: {(religiousSite.contactInfo as any).email}</li>
              )}
              {(religiousSite.contactInfo as any).website && (
                <li>
                  Website:{" "}
                  <Link
                    href={(religiousSite.contactInfo as any).website}
                    className="text-blue-600 underline"
                  >
                    {(religiousSite.contactInfo as any).website}
                  </Link>
                </li>
              )}
              {(religiousSite.contactInfo as any).address && (
                <li>Address: {(religiousSite.contactInfo as any).address}</li>
              )}
            </ul>
          </section>
        )}
      </div>

      <ReviewsDisplay type="religiousSite" itemId={religiousSite.id} />
      <ReviewSection type="religiousSite" itemId={religiousSite.id} />

      <FooterSection />
    </>
  );
}

// InfoCard Component
function InfoCard({
  title,
  content,
  icon,
  bgColor,
}: {
  title: string;
  content: string;
  icon?: ReactNode;
  bgColor?: string;
}) {
  return (
    <div
      className={`${
        bgColor || "bg-white"
      } rounded-xl shadow-md p-6 hover:shadow-lg transition`}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-xl font-lilita">{title}</h3>
      </div>
      <p className="text-gray-700 font-outfit text-base">{content}</p>
    </div>
  );
}
