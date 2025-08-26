import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
}

export default async function ReligiousSitePage({ params }: { params: Params }) {
  // Fetch site data by slug
  const site = await prisma.religiousSite.findUnique({
    where: { slug: params.slug },
  });

  if (!site) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 relative inline-block">
          {site.name}
          <span className="absolute left-1/2 -bottom-2 w-32 h-1 bg-yellow-400 rounded-full -translate-x-1/2"></span>
        </h1>
        <p className="mt-4 text-gray-600 sm:text-lg max-w-2xl mx-auto">
          {site.description}
        </p>
      </div>

      {/* Image gallery */}
      {site.images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {site.images.map((img, idx) => (
            <div key={idx} className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
              <Image src={img} alt={site.name} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* General Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {site.history && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 pb-1 border-b border-gray-300">
              History
            </h2>
            <p className="mt-2 text-gray-700">{site.history}</p>
          </div>
        )}
        {site.significance && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 pb-1 border-b border-gray-300">
              Significance
            </h2>
            <p className="mt-2 text-gray-700">{site.significance}</p>
          </div>
        )}
        {site.bestTimeToVisit && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 pb-1 border-b border-gray-300">
              Best Time to Visit
            </h2>
            <p className="mt-2 text-gray-700">{site.bestTimeToVisit}</p>
          </div>
        )}
        {site.nearbyAttractions && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 pb-1 border-b border-gray-300">
              Nearby Attractions
            </h2>
            <p className="mt-2 text-gray-700">{site.nearbyAttractions}</p>
          </div>
        )}
        {site.openingHours && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 pb-1 border-b border-gray-300">
              Opening Hours
            </h2>
            <p className="mt-2 text-gray-700">{site.openingHours}</p>
          </div>
        )}
        {site.entryFee && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 pb-1 border-b border-gray-300">
              Entry Fee
            </h2>
            <ul className="mt-2 text-gray-700 list-disc list-inside">
              {site.entryFee.internal && <li>Internal: {site.entryFee.internal}</li>}
              {site.entryFee.external && <li>External: {site.entryFee.external}</li>}
              {site.entryFee.notes && <li>Notes: {site.entryFee.notes}</li>}
            </ul>
          </div>
        )}
        {site.dressCode && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 pb-1 border-b border-gray-300">
              Dress Code
            </h2>
            <p className="mt-2 text-gray-700">{site.dressCode}</p>
          </div>
        )}
        {site.photography && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 pb-1 border-b border-gray-300">
              Photography
            </h2>
            <p className="mt-2 text-gray-700">{site.photography}</p>
          </div>
        )}
      </div>

      {/* Facilities & Accessibility */}
      {(site.facilities || site.accessibility) && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-1">Facilities & Accessibility</h2>
          {site.facilities && (
            <ul className="text-gray-700 list-disc list-inside">
              {Object.entries(site.facilities).map(([key, value]) => (
                <li key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value ? "Yes" : "No"}
                </li>
              ))}
            </ul>
          )}
          {site.accessibility && (
            <ul className="text-gray-700 list-disc list-inside mt-2">
              {Object.entries(site.accessibility).map(([key, value]) => (
                <li key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value ? "Yes" : "No"}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Rituals */}
      {site.rituals?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-1">Rituals & Ceremonies</h2>
          <ul className="mt-2 text-gray-700 list-disc list-inside">
            {site.rituals.map((ritual, idx) => (
              <li key={idx}>{ritual}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Festivals */}
      {site.festivals?.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-1">Festivals</h2>
          {site.festivals.map((festival: any, idx: number) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{festival.name}</h3>
              <p className="text-gray-700">{festival.month} - {festival.description}</p>
              {festival.images?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {festival.images.map((img: string, idy: number) => (
                    <div key={idy} className="relative w-full h-48 rounded-lg overflow-hidden shadow-md">
                      <Image src={img} alt={festival.name} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Safety Guidelines */}
      {site.safetyGuidelines?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-1">Safety Guidelines</h2>
          <ul className="mt-2 text-gray-700 list-disc list-inside">
            {site.safetyGuidelines.map((guide, idx) => (
              <li key={idx}>{guide}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contact Info */}
      {site.contactInfo && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-1">Contact Info</h2>
          <ul className="mt-2 text-gray-700 list-disc list-inside">
            {site.contactInfo.phone && <li>Phone: {site.contactInfo.phone}</li>}
            {site.contactInfo.email && <li>Email: {site.contactInfo.email}</li>}
            {site.contactInfo.website && <li>Website: <Link href={site.contactInfo.website} className="text-blue-600 underline">{site.contactInfo.website}</Link></li>}
          </ul>
        </div>
      )}
    </div>
  );
}
