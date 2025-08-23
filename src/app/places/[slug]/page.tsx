// app/places/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function PlacePage({ params }: { params: { slug: string } }) {
  const place = await prisma.place.findUnique({
    where: { slug: params.slug },
    include: {
      activities: true,
      accommodations: true,
      religiousSites: true,
    },
  });

  if (!place) return <div>Place not found</div>;

  return (
    <div className="p-6">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{place.name}</h1>
        <p className="mt-2 text-lg">{place.description}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {place.images.map((img, i) => (
            <Image key={i} src={img} height={400}
                width={300} className="rounded-xl" alt={place.name} />
          ))}
        </div>
      </div>

      {/* Sections */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Top Activities</h2>
        <div className="grid grid-cols-3 gap-4">
          {place.activities.map((act) => (
            <Link key={act.id} href={`/activities/${act.slug}`}>
              <div className="rounded-lg shadow-md p-4 hover:bg-gray-100">
                <Image src={act.images[0]} height={400} alt="image"
                width={300} className="rounded-md h-40 w-full object-cover" />
                <h3 className="mt-2 font-bold">{act.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Accommodations</h2>
        <div className="grid grid-cols-3 gap-4">
          {place.accommodations.map((hotel) => (
            <Link key={hotel.id} href={`/accommodations/${hotel.slug}`}>
              <div className="rounded-lg shadow-md p-4 hover:bg-gray-100">
                <Image src={hotel.images[0]} height={400} alt="image"
                width={300} className="rounded-md h-40 w-full object-cover" />
                <h3 className="mt-2 font-bold">{hotel.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Religious Sites</h2>
        <div className="grid grid-cols-3 gap-4">
          {place.religiousSites.map((site) => (
            <Link key={site.id} href={`/religious-sites/${site.slug}`}>
              <div className="rounded-lg shadow-md p-4 hover:bg-gray-100">
                <Image src={site.images[0]} height={400} alt="image"
                width={300} className="rounded-md h-40 w-full object-cover" />
                <h3 className="mt-2 font-bold">{site.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
