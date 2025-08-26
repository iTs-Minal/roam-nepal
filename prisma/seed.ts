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
  modelName: "activity" | "accommodation" | "religiousSite" | "cafe" | "itinerary",
  dataArray: NestedDataItem[]
) {
  if (dataArray.length === 0) return;

  const modelMap: Record<
    "activity" | "accommodation" | "religiousSite" | "cafe" | "itinerary",
    typeof prisma.activity | typeof prisma.accommodation | typeof prisma.religiousSite | typeof prisma.cafe | typeof prisma.itinerary
  > = {
    activity: prisma.activity,
    accommodation: prisma.accommodation,
    religiousSite: prisma.religiousSite,
    cafe: prisma.cafe,
    itinerary: prisma.itinerary,
  };

  const model = modelMap[modelName];
  if (!model) throw new Error(`Unknown model: ${modelName}`);

   for (const data of dataArray) {
    await model.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    });
  }
}

async function main() {
  // Define places and nested data once
const pokharaData = {
      name: "Pokhara",
      slug: "pokhara",
      description:
        "Pokhara, known as the 'City of Lakes', is one of Nepal’s most scenic cities. Nestled at the foothills of the Annapurna mountain range, it is famous for its pristine lakes, adventure sports, and gateway to the Annapurna trekking region. Pokhara offers a unique blend of natural beauty, cultural heritage, and adventure tourism.",
      history:
        "Pokhara has a rich historical background. Originally, it was part of the Kingdom of Kaski and served as a key stop on the ancient trade route between India and Tibet. Over the centuries, Pokhara evolved from a small riverside settlement into a thriving town. It gained popularity among tourists in the 1960s as a gateway to trekking in the Annapurna region. The city also played a role during the Anglo-Nepalese War as a strategic point. Today, Pokhara balances modernization with the preservation of its lakes, traditional villages, and cultural landmarks.",
      bestTime: "September to November and March to May (clear skies and pleasant weather)",
      location: "Kaski District, Gandaki Province, Nepal",
      latitude: 28.2096,
      longitude: 83.9856,
      highlights: [
        "Phewa Lake and boating experiences",
        "Sarangkot sunrise view of Annapurna range",
        "Paragliding over the Pokhara valley",
        "World Peace Pagoda with panoramic views",
        "Devi's Falls and Gupteshwor Cave",
        "Old bazaar and local handicraft shopping"
      ],
      tips:
        "Book adventure activities like paragliding and trekking in advance. Carry light rain gear, as Pokhara can experience sudden showers. Explore the local markets to try Nepali street food. For photography, early morning and late afternoon provide the best light.",
      howToReach:
        "Pokhara is accessible via a 25-minute flight from Kathmandu to Pokhara Airport or a 6–7 hour drive by tourist bus/private vehicle. From the airport, taxis or local buses can take you to the city center and Lakeside area.",
  images: ["/pokhara/pokhara1.jpg", "/pokhara/pokhara2.webp", "/pokhara/pokhara3.webp", "/pokhara/pokhara4.jpeg", "/pokhara/pokhara5.webp"],

};

const pokharaActivities = [
  {
    name: "Paragliding",
    slug: "paragliding",
    description: "Tandem paragliding above Phewa Lake with Annapurna views.",
    images: ["/pokhara/activities/paragliding1.jpg", "/pokhara/activities/paragliding2.webp", "/pokhara/activities/paragliding3.webp", "/pokhara/activities/paragliding4.webp", "/pokhara/activities/paragliding5.webp", "/pokhara/activities/paragliding6.jpeg"],
    latitude: 28.2345,
    longitude: 83.9821,
    difficulty: "Medium",
    duration: "30–60 mins",
    highlights: ["Aerial view of Phewa Lake", "Sunset flights available", "Certified instructors"],
    bookingInfo: "Booking available on-site and online",
    placeId: null,
  },
  {
    name: "Boating on Phewa Lake",
    slug: "phewa-lake-boating",
    description: "Relaxing wooden boat ride across the scenic Phewa Lake.",
    images: ["/pokhara/activities/boating-phewa1.webp", "/pokhara/activities/boating-phewa2.webp","/pokhara/activities/boating-phewa3.webp","/pokhara/activities/boating-phewa4.jpeg", "/pokhara/activities/boating-phewa5.jpeg"],
    latitude: 28.2085,
    longitude: 83.9640,
    difficulty: "Easy",
    duration: "1–2 hours",
    highlights: ["Island views", "Barahi Temple access", "Sunset boating"],
    bookingInfo: "Ticket counter at lakeside",
    placeId: null,
  },
  {
    name: "Ultra-light Flight",
    slug: "ultra-light-flight",
    description: "Soar high above Pokhara Valley and see panoramic Himalayan views.",
    images: [""],
    latitude: 28.22,
    longitude: 83.97,
    difficulty: "Medium",
    duration: "20–40 mins",
    highlights: ["Himalayan panorama", "Flight safety briefing", "Photography allowed"],
    bookingInfo: "Pre-booking recommended",
    placeId: null,
  },
  {
    name: "Sarangkot Sunrise Hike",
    slug: "sarangkot-sunrise-hike",
    description: "Early morning hike to Sarangkot for a stunning sunrise over the Annapurna range.",
    images: [""],
    latitude: 28.223,
    longitude: 83.94,
    difficulty: "Medium",
    duration: "2–3 hours",
    highlights: ["Sunrise view", "Photography spots", "Local village experience"],
    bookingInfo: "Guided tours available",
    placeId: null,
  },
  {
    name: "Gupteshwor Cave Exploration",
    slug: "gupteshwor-cave",
    description: "Explore the sacred cave temple and underground waterfall.",
    images: [""],
    latitude: 28.218,
    longitude: 83.967,
    difficulty: "Easy",
    duration: "1 hour",
    highlights: ["Shiva Lingam", "Waterfall inside cave", "Spiritual experience"],
    bookingInfo: "Free entry, donations accepted",
    placeId: null,
  },
  {
    name: "Trekking around Annapurna Base",
    slug: "annapurna-base-trek",
    description: "Start point for Annapurna Base Camp trekking with scenic landscapes.",
    images: [""],
    latitude: 28.213,
    longitude: 83.981,
    difficulty: "Hard",
    duration: "Multiple days",
    highlights: ["Mountain views", "Local culture", "Adventure experience"],
    bookingInfo: "Trekking agencies available",
    placeId: null,
  },
];


const pokharaAccommodations = [
  {
    name: "Temple Tree Resort",
    slug: "temple-tree-resort",
    description: "Lakeside boutique resort with spa and garden views.",
    images: ["/pokhara/accommodations/temple-tree-resort1.jpg", "/pokhara/accommodations/temple-tree-resort2.webp", "/pokhara/accommodations/temple-tree-resort3.webp", "/pokhara/accommodations/temple-tree-resort4.webp"],
    price: 120.0,
    latitude: 28.209,
    longitude: 83.985,
    amenities: ["Spa", "Pool", "Free WiFi", "Restaurant", "Garden View"],
    roomTypes: ["Standard", "Deluxe", "Suite"],
    rating: 4.8,
    placeId: null,
  },
  {
    name: "Hotel Middle Path",
    slug: "hotel-middle-path",
    description: "Affordable hotel with rooftop restaurant and mountain views.",
    images: [""],
    price: 45.0,
    latitude: 28.207,
    longitude: 83.97,
    amenities: ["Rooftop restaurant", "Free WiFi", "Breakfast included"],
    roomTypes: ["Standard", "Family Room"],
    rating: 4.2,
    placeId: null,
  },
  {
    name: "Fishtail Lodge",
    slug: "fishtail-lodge",
    description: "Cozy lakeside lodge ideal for budget travelers.",
    images: [""],
    price: 25.0,
    latitude: 28.208,
    longitude: 83.964,
    amenities: ["Lakeside view", "Free breakfast", "Shared lounge"],
    roomTypes: ["Dorm", "Private Room"],
    rating: 4.0,
    placeId: null,
  },
  {
    name: "Waterfront Resort",
    slug: "waterfront-resort",
    description: "Luxury resort directly on the lake with stunning sunset views.",
    images: [""],
    price: 180.0,
    latitude: 28.210,
    longitude: 83.986,
    amenities: ["Pool", "Spa", "Restaurant", "Lakeside terrace"],
    roomTypes: ["Deluxe", "Suite", "Villa"],
    rating: 4.9,
    placeId: null,
  },
  {
    name: "Pokhara Inn",
    slug: "pokhara-inn",
    description: "Comfortable mid-range hotel with easy access to lakeside attractions.",
    images: [""],
    price: 60.0,
    latitude: 28.206,
    longitude: 83.965,
    amenities: ["Free WiFi", "Breakfast included", "Parking"],
    roomTypes: ["Single", "Double", "Family Room"],
    rating: 4.3,
    placeId: null,
  },
];


const pokharaReligiousSites = [
  {
      name: "Barahi Temple",
      slug: "barahi-temple",
      description: "Pagoda temple on an island in Phewa Lake, dedicated to Goddess Barahi.",
      location: "Pokhara, Gandaki Province",
      history: "Built centuries ago on a small island, attracting devotees for daily prayers and festivals.",
      significance: "Important spiritual site for Hindus, especially for women seeking blessings.",
      openingHours: "06:00 AM - 06:00 PM",
      entryFee: { internal: "Free", external: "Rs 200" },
      dressCode: "Modest clothing required. Remove shoes before entering.",
      photography: "Photography allowed outside only.",
      bestTimeToVisit: "Morning or during festivals",
      nearbyAttractions: "Fewa Lake, Lakeside Pokhara",
      facilities: { parking: false, guide: true, restrooms: false, shops: true },
      festivals: [
        {
          name: "Maha Shivaratri",
          month: "February/March",
          description: "Special celebrations and boat rituals for devotees.",
          images: ["/images/festivals/barahi-shivaratri1.jpg"]
        }
      ],
      rituals: ["Maha Shivaratri celebration", "Daily prayer ceremonies", "Special boat pujas"],
      images: [
        "/images/religious/barahi-1.jpg",
        "/images/religious/barahi-2.jpg"
      ],
      contactInfo: { phone: "+977-61-555000", email: "info@barahitemple.np", website: "" },
      accessibility: { wheelchair: false, stairsOnly: true, audioGuide: false },
      safetyGuidelines: [
        "Respect local customs",
        "Remove shoes before entering",
        "Maintain silence inside temple"
      ],
      placeId: null,
    },
    {
      name: "World Peace Pagoda",
      slug: "world-peace-pagoda",
      description: "Buddhist stupa overlooking Pokhara Valley and the Himalayas, promoting peace and harmony.",
      location: "Pokhara, Gandaki Province",
      history: "Built by Japanese Buddhists to promote peace, meditation, and scenic views.",
      significance: "Famous pilgrimage site for Buddhists and tourists seeking panoramic views.",
      openingHours: "05:00 AM - 07:00 PM",
      entryFee: { internal: "Free", external: "Rs 100" },
      dressCode: "Respectful clothing recommended. No restrictions inside.",
      photography: "Photography allowed throughout the site.",
      bestTimeToVisit: "Sunrise or sunset",
      nearbyAttractions: "Sarangkot viewpoint, Phewa Lake",
      facilities: { parking: true, guide: true, restrooms: true, shops: true },
      festivals: [
        {
          name: "Full Moon Meditation",
          month: "Every full moon",
          description: "Meditation sessions and prayers during full moon nights.",
          images: ["/images/festivals/peacepagoda-fullmoon1.jpg"]
        }
      ],
      rituals: ["Meditation sessions", "Full moon prayers", "Peace ceremonies"],
      images: [
        "/images/religious/peacepagoda-1.jpg",
        "/images/religious/peacepagoda-2.jpg"
      ],
      contactInfo: { phone: "+977-61-555111", email: "info@peacepagoda.org", website: "" },
      accessibility: { wheelchair: true, stairsOnly: false, audioGuide: true },
      safetyGuidelines: ["Respect local customs", "Keep noise low", "Do not litter"],
      placeId: null,
    },
    {
      name: "Bindhyabasini Temple",
      slug: "bindhyabasini-temple",
      description: "Ancient Hindu temple dedicated to Goddess Durga, located in the heart of Pokhara.",
      location: "Pokhara, Gandaki Province",
      history: "One of the oldest temples in Pokhara, attracting devotees from across Nepal.",
      significance: "Spiritual center for Durga worship, especially during Navaratri.",
      openingHours: "05:30 AM - 08:00 PM",
      entryFee: { internal: "Free", external: "Rs 50" },
      dressCode: "Modest clothing required. Remove shoes inside temple.",
      photography: "Photography allowed only outside main sanctum.",
      bestTimeToVisit: "During Navaratri or early morning",
      nearbyAttractions: "Pokhara City Center, Lakeside",
      facilities: { parking: false, guide: true, restrooms: true, shops: true },
      festivals: [
        {
          name: "Navaratri",
          month: "September/October",
          description: "Nine-day festival honoring Goddess Durga with rituals and prayers.",
          images: ["/images/festivals/bindhyabasini-navaratri1.jpg"]
        }
      ],
      rituals: ["Navaratri celebrations", "Daily pooja", "Other festivals"],
      images: [
        "/images/religious/bindhyabasini-1.jpg",
        "/images/religious/bindhyabasini-2.jpg"
      ],
      contactInfo: { phone: "+977-61-555222", email: "info@bindhyabasini.org", website: "" },
      accessibility: { wheelchair: false, stairsOnly: true, audioGuide: false },
      safetyGuidelines: ["Respect rituals", "Remove shoes before entering", "No loud noises"],
      placeId: null,
    },
    {
      name: "Gupteshwor Mahadev Cave Temple",
      slug: "gupteshwor-cave-temple",
      description: "Sacred cave temple with waterfall and Shiva Lingam inside, connected to Davis Falls.",
      location: "Pokhara, Gandaki Province",
      history: "A unique temple inside a cave, attracting devotees and tourists alike.",
      significance: "Important pilgrimage site for Lord Shiva devotees.",
      openingHours: "06:00 AM - 06:30 PM",
      entryFee: { internal: "Free", external: "Rs 50" },
      dressCode: "Modest clothing recommended",
      photography: "Photography allowed only outside sanctum",
      bestTimeToVisit: "Morning or festival days",
      nearbyAttractions: "Davis Falls, Phewa Lake",
      facilities: { parking: true, guide: true, restrooms: true, shops: false },
      festivals: [
        {
          name: "Shivaratri Special Puja",
          month: "February/March",
          description: "Special pujas performed for Lord Shiva devotees.",
          images: ["/images/festivals/gupteshwor-shivaratri1.jpg"]
        }
      ],
      rituals: ["Daily worship", "Special Shiva puja", "Festivals"],
      images: [
        "/images/religious/gupteshwor-1.jpg",
        "/images/religious/gupteshwor-2.jpg"
      ],
      contactInfo: { phone: "+977-61-555333", email: "info@gupteshwor.org", website: "" },
      accessibility: { wheelchair: false, stairsOnly: true, audioGuide: false },
      safetyGuidelines: ["Be cautious of slippery areas", "Respect rituals"],
      placeId: null,
    },
    {
      name: "Mahendra Cave",
      slug: "mahendra-cave",
      description: "Limestone cave considered sacred with small shrines inside.",
      location: "Pokhara, Gandaki Province",
      history: "Popular for natural formations and small religious significance.",
      significance: "Tourists visit for exploration and religious offerings.",
      openingHours: "08:00 AM - 05:00 PM",
      entryFee: { internal: "Free", external: "Rs 50" },
      dressCode: "Casual clothing allowed, modesty recommended",
      photography: "Photography allowed",
      bestTimeToVisit: "Morning",
      nearbyAttractions: "Davis Falls, Barahi Temple",
      facilities: { parking: true, guide: false, restrooms: false, shops: false },
      festivals: [
        {
          name: "Local Festivals",
          month: "Varies",
          description: "Local ceremonies and offerings held occasionally.",
          images: ["/images/festivals/mahendra-local1.jpg"]
        }
      ],
      rituals: ["Occasional worship", "Visitor offerings", "Local festivals"],
      images: [
        "/images/religious/mahendra-1.jpg",
        "/images/religious/mahendra-2.jpg"
      ],
      contactInfo: { phone: "+977-61-555444", email: "", website: "" },
      accessibility: { wheelchair: false, stairsOnly: true, audioGuide: false },
      safetyGuidelines: ["Watch your step", "Respect shrines"],
      placeId: null,
    }
];


const pokharaCafes = [
  {
    name: "Moondance Café",
    slug: "moondance-cafe",
    description: "Lakeside café famous for steaks, pastries, and a relaxed vibe.",
    images: [""],
    latitude: 28.21,
    longitude: 83.96,
    openingTime: "08:00 AM",
    closingTime: "10:00 PM",
    specialties: ["Steaks", "Pastries", "Coffee", "Smoothies"],
    ambiance: ["Lakeside", "Outdoor seating", "Cozy"],
    placeId: null,
  },
  {
    name: "OR2K Pokhara",
    slug: "or2k-pokhara",
    description: "Vibrant vegetarian restaurant with Middle Eastern cuisine.",
    images: [""],
    latitude: 28.21,
    longitude: 83.96,
    openingTime: "09:00 AM",
    closingTime: "11:00 PM",
    specialties: ["Falafel", "Hummus", "Shawarma", "Fresh juices"],
    ambiance: ["Rooftop", "Artistic vibe", "Casual dining"],
    placeId: null,
  },
  {
    name: "Little Windows Café",
    slug: "little-windows-cafe",
    description: "Cozy café with lakeside views, perfect for coffee and brunch.",
    images: [""],
    latitude: 28.208,
    longitude: 83.97,
    openingTime: "07:00 AM",
    closingTime: "09:00 PM",
    specialties: ["Coffee", "Sandwiches", "Pastries", "Smoothies"],
    ambiance: ["Lakeside", "Quiet", "Casual"],
    placeId: null,
  },
  {
    name: "Café Concerto",
    slug: "cafe-concerto",
    description: "Modern café with a wide range of beverages and desserts.",
    images: [""],
    latitude: 28.209,
    longitude: 83.965,
    openingTime: "08:00 AM",
    closingTime: "10:00 PM",
    specialties: ["Espresso", "Cakes", "Smoothies", "Pastries"],
    ambiance: ["Indoor seating", "Artistic decor", "Cozy"],
    placeId: null,
  },
  {
    name: "Nyamo Café",
    slug: "nyamo-cafe",
    description: "Small local café serving traditional Nepali snacks and tea.",
    images: [""],
    latitude: 28.207,
    longitude: 83.962,
    openingTime: "06:30 AM",
    closingTime: "08:30 PM",
    specialties: ["Nepali tea", "Momo", "Snacks", "Coffee"],
    ambiance: ["Local vibe", "Cozy", "Casual"],
    placeId: null,
  },
];


const pokharaItineraries = [
  {
    name: "2-Day Scenic Getaway in Pokhara",
    title: "2-Day Scenic Getaway in Pokhara",
    slug: "2-day-scenic-getaway-pokhara",
    description:
      "Perfect for first-time visitors, this 2-day itinerary covers Pokhara’s highlights including Phewa Lake, World Peace Pagoda, and Sarangkot sunrise.",
    images: [],
    duration: 2,
    highlights: [
      "Boating on Phewa Lake",
      "World Peace Pagoda sunset",
      "Sarangkot sunrise view",
      "Local cafes by the lakeside",
    ],
    days: [
      {
        day: 1,
        activities: [
          "Morning: Arrival and boating on Phewa Lake",
          "Afternoon: Visit Davis Falls and Gupteshwor Mahadev Cave",
          "Evening: Enjoy sunset from World Peace Pagoda",
          "Dinner: Local cuisine at Moondance Restaurant",
        ],
      },
      {
        day: 2,
        activities: [
          "Early Morning: Sunrise at Sarangkot",
          "Breakfast: Himalayan Java Café by the lake",
          "Midday: Explore Bindhyabasini Temple",
          "Afternoon: Free time for lakeside shopping and leisure",
        ],
      },
    ],
    placeId: null,
  },
  {
    name: "3-Day Adventure Itinerary in Pokhara",
    title: "3-Day Adventure Itinerary in Pokhara",
    slug: "3-day-adventure-itinerary-pokhara",
    description:
      "For thrill-seekers, this 3-day adventure itinerary combines paragliding, ziplining, and trekking around Pokhara.",
    images: [],
    duration: 3,
    highlights: [
      "Paragliding from Sarangkot",
      "World’s fastest Zipline",
      "Peaceful hike to Australian Camp",
      "Local food exploration",
    ],
    days: [
      {
        day: 1,
        activities: [
          "Morning: Arrive and relax by the Lakeside",
          "Afternoon: Boating on Phewa Lake",
          "Evening: Sunset at World Peace Pagoda",
        ],
      },
      {
        day: 2,
        activities: [
          "Morning: Paragliding from Sarangkot",
          "Afternoon: Ziplining adventure",
          "Evening: Relax in a lakeside café with live music",
        ],
      },
      {
        day: 3,
        activities: [
          "Morning: Hike to Australian Camp",
          "Lunch: Mountain view lunch at the camp",
          "Afternoon: Return to Pokhara and shopping at Lakeside",
        ],
      },
    ],
    placeId: null,
  },
  {
    name: "5-Day Relaxed Family Trip in Pokhara",
    title: "5-Day Relaxed Family Trip in Pokhara",
    slug: "5-day-relaxed-family-trip-pokhara",
    description:
      "A slow-paced 5-day family itinerary covering natural wonders, temples, adventure activities, and relaxed evenings by the lake.",
    images: [],
    duration: 5,
    highlights: [
      "Phewa Lake boating",
      "Sarangkot sunrise",
      "International Mountain Museum",
      "Paragliding option",
      "Cultural temples and caves",
    ],
    days: [
      {
        day: 1,
        activities: [
          "Arrival and evening lakeside walk",
          "Dinner at Temple Tree Resort",
        ],
      },
      {
        day: 2,
        activities: [
          "Morning: Sarangkot sunrise",
          "Midday: Visit Davis Falls and Gupteshwor Mahadev Cave",
          "Evening: Stroll at Lakeside Bazaar",
        ],
      },
      {
        day: 3,
        activities: [
          "Morning: International Mountain Museum visit",
          "Afternoon: Short hike to World Peace Pagoda",
          "Evening: Boating under starlight on Phewa Lake",
        ],
      },
      {
        day: 4,
        activities: [
          "Morning: Optional paragliding or zipline",
          "Afternoon: Relax at Himalayan Java Café",
          "Evening: Cultural dance show and dinner",
        ],
      },
      {
        day: 5,
        activities: [
          "Morning: Bindhyabasini Temple",
          "Brunch: Roadhouse Café",
          "Departure",
        ],
      },
    ],
    placeId: null,
  },
];


  // Upsert Pokhara
  const pokhara = await upsertPlace(pokharaData);

  // Assign placeId for nested data
  pokharaActivities.forEach((item) => (item.placeId = pokhara.id));
  pokharaAccommodations.forEach((item) => (item.placeId = pokhara.id));
  pokharaReligiousSites.forEach((item) => (item.placeId = pokhara.id));
  pokharaCafes.forEach((item) => (item.placeId = pokhara.id));
  pokharaItineraries.forEach((item) => (item.placeId = pokhara.id));

  await createNestedData("activity", pokharaActivities);
  await createNestedData("accommodation", pokharaAccommodations);
  await createNestedData("religiousSite", pokharaReligiousSites);
  await createNestedData("cafe", pokharaCafes);
  await createNestedData("itinerary", pokharaItineraries);

  console.log("✅ Successfully seeded Pokhara!");   
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
