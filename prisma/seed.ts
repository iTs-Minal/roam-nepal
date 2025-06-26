// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


type PlaceData = {
  name: string;
  slug: string;
  description: string;
  images: string[];
  latitude: number;
  longitude: number;
};

type NestedDataItem = {
  name: string;
  slug: string;
  description: string;
  images: string[];
  latitude?: number;
  longitude?: number;
  price?: number;
  placeId: number | null;
};

// Helper for upserting places
async function upsertPlace(data: PlaceData) {
  return prisma.place.upsert({
    where: { slug: data.slug },
    update: data,
    create: data,
  });
}

async function createNestedData(
  modelName: "activity" | "accommodation" | "religiousSite",
  dataArray: NestedDataItem[]
) {
  if (dataArray.length === 0) return;

  const modelMap: Record<
    "activity" | "accommodation" | "religiousSite",
    typeof prisma.activity | typeof prisma.accommodation | typeof prisma.religiousSite
  > = {
    activity: prisma.activity,
    accommodation: prisma.accommodation,
    religiousSite: prisma.religiousSite,
  };

  const model = modelMap[modelName];
  if (!model) throw new Error(`Unknown model: ${modelName}`);

  await model.createMany({
    data: dataArray,
    skipDuplicates: true,
  });
}

async function main() {
  // Define places and nested data once
  const pokharaData = {
    name: "Pokhara",
    slug: "pokhara",
    description: "Scenic lakeside city in central Nepal, gateway to the Annapurna range.",
    images: [
      "https://images.unsplash.com/photo-1562462181-b228e3cff9ad?q=80&w=1010&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1618083840944-31cc42fcf250?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    latitude: 28.2096,
    longitude: 83.9856,
  };

  const pokharaActivities = [
    {
      name: "Paragliding",
      slug: "paragliding",
      description: "Tandem paragliding flight above Phewa Lake with mountain views.",
      images: ["https://example.com/images/paragliding.jpg"],
      latitude: 28.2345,
      longitude: 83.9821,
      placeId: null, // will set later
    },
    {
      name: "Boating on Phewa Lake",
      slug: "phewa-lake-boating",
      description: "Relaxing boat ride on the scenic Phewa Lake.",
      images: ["https://example.com/images/boating.jpg"],
      latitude: 28.2085,
      longitude: 83.9640,
      placeId: null,
    },
  ];

  const pokharaAccommodations = [
    {
      name: "Temple Tree Resort",
      slug: "temple-tree-resort",
      description: "Lakeside boutique resort with spa and garden views.",
      images: ["https://example.com/images/templetree.jpg"],
      price: 120.0,
      placeId: null,
    },
  ];

  const pokharaReligiousSites = [
    {
      name: "Barahi Temple",
      slug: "barahi-temple",
      description: "Pagoda temple on an island in Phewa Lake.",
      images: ["https://example.com/images/barahi.jpg"],
      latitude: 28.2105,
      longitude: 83.9616,
      placeId: null,
    },
  ];

  // Upsert Pokhara
  const pokhara = await upsertPlace(pokharaData);

  // Assign placeId for nested data
  pokharaActivities.forEach((item) => (item.placeId = pokhara.id));
  pokharaAccommodations.forEach((item) => (item.placeId = pokhara.id));
  pokharaReligiousSites.forEach((item) => (item.placeId = pokhara.id));

  await createNestedData("activity", pokharaActivities);
  await createNestedData("accommodation", pokharaAccommodations);
  await createNestedData("religiousSite", pokharaReligiousSites);

  // Chitwan data
  const chitwanData = {
    name: "Chitwan",
    slug: "chitwan",
    description: "Home of Chitwan National Park, famous for wildlife safaris.",
    images: [
      "https://images.unsplash.com/photo-1647679147029-508c62f35c33?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1632996676096-be89c8184e62?q=80&w=865&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    latitude: 27.5291,
    longitude: 84.3542,
  };

  const chitwanActivities = [
    {
      name: "Jungle Safari",
      slug: "jungle-safari",
      description: "Explore Chitwan National Park on jeep or elephant safari.",
      images: ["https://example.com/images/safari.jpg"],
      latitude: 27.5845,
      longitude: 84.3551,
      placeId: null,
    },
    {
      name: "Canoeing",
      slug: "canoeing",
      description: "Canoe ride in the Rapti River to see crocodiles and birds.",
      images: ["https://example.com/images/canoeing.jpg"],
      latitude: 27.585,
      longitude: 84.36,
      placeId: null,
    },
  ];

  const chitwanAccommodations = [
    {
      name: "Green Park Chitwan",
      slug: "green-park-chitwan",
      description: "Eco-friendly resort near the national park.",
      images: ["https://example.com/images/greenpark.jpg"],
      price: 100.0,
      placeId: null,
    },
  ];

  const chitwanReligiousSites = [
    {
      name: "Bishazari Tal",
      slug: "bishazari-tal",
      description: "Sacred lake known for biodiversity and birdwatching.",
      images: ["https://example.com/images/bishazari.jpg"],
      latitude: 27.5587,
      longitude: 84.4012,
      placeId: null,
    },
  ];

  // Upsert Chitwan
  const chitwan = await upsertPlace(chitwanData);

  chitwanActivities.forEach((item) => (item.placeId = chitwan.id));
  chitwanAccommodations.forEach((item) => (item.placeId = chitwan.id));
  chitwanReligiousSites.forEach((item) => (item.placeId = chitwan.id));

  await createNestedData("activity", chitwanActivities);
  await createNestedData("accommodation", chitwanAccommodations);
  await createNestedData("religiousSite", chitwanReligiousSites);

  console.log("✅ Successfully seeded Pokhara and Chitwan!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
