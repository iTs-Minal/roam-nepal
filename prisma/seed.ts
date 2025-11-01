/* eslint-disable @typescript-eslint/no-explicit-any */
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
  placeId?: number;
};

type RoomSeed = {
  accommodationSlug?: string; // made optional so it can be deleted
  accommodationId?: number;  // optional, assigned dynamically
  name: string;
  description: string;
  images: string[];
  pricePerNight: number;
  maxGuests: number;
  bedType: string;
  amenities: string[];
  available: boolean;
};


type NestedDataItem = {
  name: string;
  slug: string;
  description: string;
  images: string[];
  latitude?: number;
  longitude?: number;
  price?: number;
  placeId?: number | null;
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
  modelName:
    | "activity"
    | "accommodation"
    | "religiousSite"
    | "cafe"
    | "itinerary",
  dataArray: NestedDataItem[]
) {
  if (dataArray.length === 0) return;

  const modelMap: Record<
    "activity" | "accommodation" | "religiousSite" | "cafe" | "itinerary",
    | typeof prisma.activity
    | typeof prisma.accommodation
    | typeof prisma.religiousSite
    | typeof prisma.cafe
    | typeof prisma.itinerary
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
    bestTime:
      "September to November and March to May (clear skies and pleasant weather)",
    location: "Kaski District, Gandaki Province, Nepal",
    latitude: 28.2096,
    longitude: 83.9856,
    highlights: [
      "Phewa Lake and boating experiences",
      "Sarangkot sunrise view of Annapurna range",
      "Paragliding over the Pokhara valley",
      "World Peace Pagoda with panoramic views",
      "Devi's Falls and Gupteshwor Cave",
      "Old bazaar and local handicraft shopping",
    ],
    tips: "Book adventure activities like paragliding and trekking in advance. Carry light rain gear, as Pokhara can experience sudden showers. Explore the local markets to try Nepali street food. For photography, early morning and late afternoon provide the best light.",
    howToReach:
      "Pokhara is accessible via a 25-minute flight from Kathmandu to Pokhara Airport or a 6–7 hour drive by tourist bus/private vehicle. From the airport, taxis or local buses can take you to the city center and Lakeside area.",
    images: [
      "/pokhara/pokhara1.jpg",
      "/pokhara/pokhara2.webp",
      "/pokhara/pokhara3.webp",
      "/pokhara/pokhara4.jpeg",
      "/pokhara/pokhara5.webp",
    ],
  };

  const pokharaActivities = [
    {
      id: 1,
      name: "Paragliding",
      slug: "paragliding",
      description: "Tandem paragliding above Phewa Lake with Annapurna views. Experience thrilling flights with certified pilots and enjoy breathtaking aerial photography opportunities.",
      shortIntro: "Soar above Pokhara’s Phewa Lake for spectacular Himalayan views.",
      images: [
        "/pokhara/activities/paragliding6.jpeg",
      "/pokhara/activities/paragliding2.webp",
      "/pokhara/activities/paragliding3.webp",
      "/pokhara/activities/paragliding4.webp",
      "/pokhara/activities/paragliding5.webp",
      "/pokhara/activities/paragliding1.jpeg",
      ],
      gallery: [
          "/pokhara/activities/paragliding1.jpg",
      "/pokhara/activities/paragliding2.webp",
      "/pokhara/activities/paragliding3.webp",
      "/pokhara/activities/paragliding4.webp",
      "/pokhara/activities/paragliding5.webp",
      "/pokhara/activities/paragliding6.jpeg",
      ],
      videoUrl: "https://www.youtube.com/embed/xyz123",
      latitude: 28.2345,
      longitude: 83.9821,
      difficulty: "Medium",
      duration: "30–60 mins",
      bestSeason: "October–April",
      altitudeRange: "1,400m – 2,100m",
      ageLimit: "10+ years",
      highlights: ["Tandem flight", "Sunset flights", "Aerial views of Phewa Lake"],
      inclusions: ["Tandem flight", "Safety gear", "Insurance"],
      exclusions: ["Meals", "Video/photo package"],
      safetyNotes: ["Weather-dependent", "Follow pilot instructions"],
      equipment: ["Harness", "Helmet", "Reserve parachute"],
      requirements: ["Basic fitness", "Signed waiver", "Minimum age 10"],
      faq: [{ question: "Can I fly solo?", answer: "No, tandem only with pilot." }],
      bookingInfo: "Book online or on-site",
      basePrice: 8500,
      currency: "NPR",
      priceTiers: [{ label: "Standard", price: 8500 }, { label: "Premium (GoPro)", price: 10500 }],
      cancellationPolicy: "Full refund up to 24 hours before the flight.",
      placeId: null,
    },
    {
      id: 2,
      name: "Boating in Phewa Lake",
      slug: "boating-phewa-lake",
      description: "Relaxing boat trips across Pokhara’s serene Phewa Lake with views of the Annapurna range and Tal Barahi temple on the lake island.",
      shortIntro: "Enjoy calm waters and scenic mountain views on a boat ride.",
      images: [
        "/pokhara/activities/boating5.webp",
       "/pokhara/activities/boating4.jpg",
      "/pokhara/activities/boating1.webp",
      "/pokhara/activities/boating2.webp",
      "/pokhara/activities/boating3.webp",
      "/pokhara/activities/boating6.jpg",
      "/pokhara/activities/boating7.webp",
      ],
      gallery: [
        "/pokhara/activities/boating5.webp",
       "/pokhara/activities/boating4.jpg",
      "/pokhara/activities/boating1.webp",
      "/pokhara/activities/boating2.webp",
      "/pokhara/activities/boating3.webp",
      "/pokhara/activities/boating6.jpg",
      "/pokhara/activities/boating7.webp",
      ],
      videoUrl: "https://www.youtube.com/embed/abc456",
      latitude: 28.2096,
      longitude: 83.9558,
      difficulty: "Easy",
      duration: "30 mins – Half-day",
      bestSeason: "September–May",
      highlights: ["Sunset boating", "Photography opportunities", "Temple visit"],
      inclusions: ["Boat rental", "Life jackets"],
      exclusions: ["Meals", "Tips"],
      safetyNotes: ["Follow boat operator instructions", "Life jackets must be worn"],
      equipment: ["Life jacket"],
      requirements: ["Able to swim recommended", "Comfortable clothing"],
      faq: [{ question: "Can I take my camera?", answer: "Yes, waterproof cases recommended." }],
      bookingInfo: "Tickets available on-site or online",
      basePrice: 1200,
      currency: "NPR",
      priceTiers: [{ label: "Adult", price: 1200 }, { label: "Child", price: 800 }],
      cancellationPolicy: "Full refund if canceled 12 hours before departure.",
      placeId: null,
    },
    {
      id: 3,
      name: "Sarangkot Sunrise View",
      slug: "sarangkot-sunrise",
      description: "Experience the magical sunrise over Annapurna and Machhapuchhre peaks from Sarangkot hilltop, with short hikes and photo opportunities.",
      shortIntro: "Witness Pokhara’s most iconic sunrise view.",
      images: [
        "/pokhara/activities/sarangkot2.webp",
       "/pokhara/activities/sarangkot5.webp",
    "/pokhara/activities/sarangkot1.webp",
    "/pokhara/activities/sarangkot3.webp",
    "/pokhara/activities/sarangkot4.webp",
      ],
      gallery: [
        "/pokhara/activities/sarangkot_gallery1.jpg",
        "/pokhara/activities/sarangkot_gallery2.webp"
      ],
      videoUrl: "https://www.youtube.com/embed/sunrise789",
      latitude: 28.2093,
      longitude: 83.9626,
      difficulty: "Easy",
      duration: "2–3 hours",
      bestSeason: "September–March",
      highlights: ["Sunrise over Annapurna", "Short hill hike", "Photography spots"],
      inclusions: ["Guide", "Morning tea/coffee"],
      exclusions: ["Breakfast", "Transport from hotel (unless arranged)"],
      safetyNotes: ["Early morning cold; wear warm clothing", "Steep paths in parts"],
      equipment: ["Hiking shoes", "Warm jacket"],
      requirements: ["Able to walk 2–3 km uphill"],
      faq: [{ question: "Can we drive up?", answer: "Yes, but early morning traffic may delay you." }],
      bookingInfo: "Guided tours available online",
      basePrice: 2000,
      currency: "NPR",
      priceTiers: [{ label: "Adult", price: 2000 }, { label: "Child", price: 1200 }],
      cancellationPolicy: "Full refund if canceled 24 hours prior.",
      placeId: null,
    },
    {
      id: 4,
      name: "Ultra Light Flight",
      slug: "ultralight-flight",
      description: "Fly over Pokhara in an ultralight aircraft for a bird’s-eye view of lakes, hills, and the Annapurna range. Great for photographers and thrill-seekers.",
      shortIntro: "Experience Pokhara from the sky in an ultralight aircraft.",
      images: [
        "/pokhara/activities/lightflight4.webp",
        "/pokhara/activities/lightflight5.webp",
    "/pokhara/activities/lightflight1.webp",
    "/pokhara/activities/lightflight2.webp",
    "/pokhara/activities/lightflight3.webp",
    "/pokhara/activities/lightflight6.webp",
      ],
      gallery: [
         "/pokhara/activities/lightflight4.webp",
        "/pokhara/activities/lightflight5.webp",
    "/pokhara/activities/lightflight1.webp",
    "/pokhara/activities/lightflight2.webp",
    "/pokhara/activities/lightflight3.webp",
    "/pokhara/activities/lightflight6.webp",
      ],
      videoUrl: "https://www.youtube.com/embed/ultra123",
      latitude: 28.2436,
      longitude: 83.9834,
      difficulty: "Medium",
      duration: "20–45 mins",
      bestSeason: "October–April",
      highlights: ["Aerial photography", "View Annapurna", "Experienced pilot"],
      inclusions: ["Flight with pilot", "Safety briefing", "Insurance"],
      exclusions: ["Meals", "Video package"],
      safetyNotes: ["Weather-dependent", "Follow pilot instructions"],
      equipment: ["Helmet", "Safety harness"],
      requirements: ["Minimum age 12", "No fear of heights"],
      faq: [{ question: "Is it safe?", answer: "Yes, ultralight flights are operated by certified pilots." }],
      bookingInfo: "Book online or on-site",
      basePrice: 12000,
      currency: "NPR",
      priceTiers: [{ label: "Standard", price: 12000 }, { label: "Premium (Photos)", price: 15000 }],
      cancellationPolicy: "Full refund if canceled 24 hrs prior.",
      placeId: null,
    },
    {
      id: 5,
      name: "Trekking Around Annapurna Base",
      slug: "trekking-annapurna",
      description: "Moderate trekking trails around the Annapurna base with spectacular mountain views, village visits, and cultural immersion. Options for 2–4 day treks.",
      shortIntro: "Explore the Annapurna foothills and villages on scenic trails.",
      images: [
        "/pokhara/activities/atrekking6.webp",
         "/pokhara/activities/atrekking4.webp",
    "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking7.webp",
      ],
      gallery: [
       "/pokhara/activities/atrekking6.webp",
         "/pokhara/activities/atrekking4.webp",
    "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking7.webp",
      ],
      videoUrl: "https://www.youtube.com/embed/trek123",
      latitude: 28.2300,
      longitude: 83.9870,
      difficulty: "Medium/Hard",
      duration: "2–4 days",
      bestSeason: "September–December, February–April",
      altitudeRange: "800m – 2,700m",
      ageLimit: "12+ years",
      highlights: ["Mountain vistas", "Village visits", "Sunrise at Sarangkot"],
      inclusions: ["Guide", "Accommodation", "Breakfast", "Transport to trailhead"],
      exclusions: ["Lunch & Dinner", "Travel insurance"],
      safetyNotes: ["Moderate fitness required", "Weather can change rapidly"],
      equipment: ["Trekking shoes", "Backpack", "Warm clothes"],
      requirements: ["Good physical health", "Trekking experience recommended"],
      faq: [{ question: "Can beginners do it?", answer: "Yes, with guide support and moderate pace." }],
      bookingInfo: "Book online with departure dates",
      basePrice: 18000,
      currency: "NPR",
      priceTiers: [{ label: "Adult", price: 18000 }, { label: "Child", price: 12000 }],
      cancellationPolicy: "Free cancellation 48 hrs prior.",
      placeId: null
    }
  ];

    const pokharaItineraries = [
 // ---------------- Paragliding Itineraries ----------------
  {
    id: 1,
    name: "Paragliding Short Flight",
    title: "Paragliding Experience over Phewa Lake",
    tagline: "Soar high and capture breathtaking views in 1 hour",
    slug: "paragliding-short-flight",
    description: "Perfect for first-time flyers or those short on time, enjoy a thrilling tandem flight above Phewa Lake with Annapurna vistas. Includes safety briefing and photography opportunities.",
    images: [
      "/pokhara/activities/paragliding1.jpg",
      "/pokhara/activities/paragliding2.webp",
      "/pokhara/activities/paragliding3.webp",
      "/pokhara/activities/paragliding4.webp",
      "/pokhara/activities/paragliding5.webp",
      "/pokhara/activities/paragliding6.jpeg",
    ],
    gallery: [
        "/pokhara/activities/paragliding1.jpg",
      "/pokhara/activities/paragliding2.webp",
      "/pokhara/activities/paragliding3.webp",
      "/pokhara/activities/paragliding4.webp",
      "/pokhara/activities/paragliding5.webp",
      "/pokhara/activities/paragliding6.jpeg",
    ],
    durationDays: 1,
    durationNights: 0,
    difficulty: "Medium",
    languages: ["English", "Nepali"],
    highlights: ["Tandem paragliding", "Sunset flights", "Aerial photography"],
    inclusions: ["Tandem flight", "Safety gear", "Insurance", "Pickup from Lakeside"],
    exclusions: ["Meals", "Video/photo package"],
    meetingPoint: "Lakeside Pokhara pickup",
    endPoint: "Drop-off at Lakeside",
    pickupIncluded: true,
    whatToBring: ["Comfortable clothes", "Closed shoes", "Sunscreen"],
    safetyNotes: ["Flight depends on weather", "Follow pilot instructions"],
    basePrice: 8500,
    currency: "NPR",
    pricingTiers: [
      { label: "Standard", price: 8500 },
      { label: "Premium (with GoPro)", price: 10500 }
    ],
    seasonalRates: [{ start: "2025-10-01", end: "2025-12-15", multiplier: 1.1 }],
    availableMonths: ["Oct","Nov","Dec","Jan","Feb","Mar","Apr"],
    minGroupSize: 1,
    maxGroupSize: 2,
    bookingCutoffHrs: 24,
    cancellationPolicy: "Full refund 24 hrs prior",
    faq: [
      { q: "Can I fly solo?", a: "No, tandem flight only with certified pilot." },
      { q: "Do I need prior experience?", a: "No prior experience needed." }
    ],
    placeId: 1,
    days: {
      create: [
        {
          dayNumber: 1,
          title: "Flight & Photography",
          summary: "Brief safety briefing, flight over Phewa Lake, and optional photos.",
          activities: ["Safety briefing", "Tandem flight", "Photo session"],
          meals: { breakfast: false, lunch: false, dinner: false },
          accommodation: null,
          transport: "Pickup from Lakeside",
          images: ["/pokhara/activities/paragliding3.webp",
      "/pokhara/activities/paragliding4.webp",],
          mapPoints: []
        }
      ]
    },
    departures: {
      create: [
        { date: new Date("2025-10-05T08:00:00+05:45"), startTime: "08:00", status: "OPEN", seatsTotal: 10, seatsAvailable: 10 },
        { date: new Date("2025-10-06T15:30:00+05:45"), startTime: "15:30", status: "OPEN", seatsTotal: 10, seatsAvailable: 8 }
      ]
    }
  },
  {
    id: 2,
    name: "Paragliding Full-Day Adventure",
    title: "Paragliding & Lakeside Exploration",
    tagline: "Combine flight with lakeside fun in one day",
    slug: "paragliding-full-day-adventure",
    description: "Spend a full day in Pokhara combining tandem paragliding with a relaxed Phewa Lake boat ride and local sightseeing around Lakeside.",
    images: [
     "/pokhara/activities/paragliding1.jpg",
      "/pokhara/activities/paragliding2.webp",
      "/pokhara/activities/paragliding3.webp",
      "/pokhara/activities/paragliding4.webp",
      "/pokhara/activities/paragliding5.webp",
      "/pokhara/activities/paragliding6.jpeg",
    ],
    gallery: [
        "/pokhara/activities/paragliding1.jpg",
      "/pokhara/activities/paragliding2.webp",
      "/pokhara/activities/paragliding3.webp",
      "/pokhara/activities/paragliding4.webp",
      "/pokhara/activities/paragliding5.webp",
      "/pokhara/activities/paragliding6.jpeg",
    ],
    durationDays: 1,
    durationNights: 0,
    difficulty: "Medium",
    languages: ["English", "Nepali"],
    highlights: ["Tandem paragliding", "Boat ride on Phewa Lake", "Sightseeing around Lakeside"],
    inclusions: ["Flight", "Boat ride", "Guide", "Insurance"],
    exclusions: ["Lunch", "Video/photos"],
    meetingPoint: "Hotel lobby, Lakeside",
    endPoint: "Hotel drop-off",
    pickupIncluded: true,
    whatToBring: ["Comfortable shoes", "Sunscreen", "Camera"],
    safetyNotes: ["Weather-dependent", "Follow guide instructions"],
    basePrice: 12000,
    currency: "NPR",
    pricingTiers: [
      { label: "Adult", price: 12000 },
      { label: "Child", price: 8500 }
    ],
    seasonalRates: [{ start: "2025-10-01", end: "2025-12-15", multiplier: 1.15 }],
    availableMonths: ["Oct","Nov","Dec","Jan","Feb","Mar","Apr"],
    minGroupSize: 1,
    maxGroupSize: 8,
    bookingCutoffHrs: 24,
    cancellationPolicy: "Full refund 24 hrs prior",
    faq: [
      { q: "Is lunch included?", a: "No, you can have lunch at Lakeside restaurants." },
      { q: "Is the boat ride guided?", a: "Yes, included in the itinerary." }
    ],
    placeId: 1,
    days: {
      create: [
        {
          dayNumber: 1,
          title: "Flight & Lakeside Fun",
          summary: "Morning tandem flight followed by relaxing boat ride on Phewa Lake, ending with Lakeside exploration.",
          activities: ["Flight", "Boat ride", "Lakeside stroll"],
          meals: { breakfast: false, lunch: false, dinner: false },
          accommodation: null,
          transport: "Private vehicle",
          images: ["/pokhara/activities/paragliding3.webp",
      "/pokhara/activities/paragliding4.webp",
      "/pokhara/activities/paragliding5.webp",],
          mapPoints: []
        }
      ]
    },
    departures: {
      create: [
        { date: new Date("2025-10-10T07:30:00+05:45"), startTime: "07:30", status: "OPEN", seatsTotal: 6, seatsAvailable: 6 },
        { date: new Date("2025-10-11T09:00:00+05:45"), startTime: "09:00", status: "OPEN", seatsTotal: 6, seatsAvailable: 4 }
      ]
    }
  },

  // ---------------- Boating in Phewa Lake Itineraries ----------------
  {
    id: 3,
    name: "Phewa Lake Short Boating",
    title: "Serene Phewa Lake Boat Ride",
    tagline: "Relaxing 30-min boat ride with Annapurna views",
    slug: "phewa-lake-short-boating",
    description: "Enjoy a peaceful half-hour ride across Phewa Lake. Perfect for families, couples, or photographers who want quick scenic moments.",
    images: [
      "/pokhara/activities/boating4.jpg",
      "/pokhara/activities/boating1.webp",
      "/pokhara/activities/boating2.webp",
      "/pokhara/activities/boating3.webp",
      "/pokhara/activities/boating5.webp",
      "/pokhara/activities/boating6.jpg",
      "/pokhara/activities/boating7.webp",
    ],
    gallery: [
      "/pokhara/activities/boating4.jpg",
      "/pokhara/activities/boating1.webp",
      "/pokhara/activities/boating2.webp",
      "/pokhara/activities/boating3.webp",
      "/pokhara/activities/boating5.webp",
      "/pokhara/activities/boating6.jpg",
      "/pokhara/activities/boating7.webp",
    ],
    durationDays: 0,
    durationNights: 0,
    difficulty: "Easy",
    languages: ["English", "Nepali"],
    highlights: ["Lake ride", "Tal Barahi Temple", "Photography"],
    inclusions: ["Boat rental", "Life jackets"],
    exclusions: ["Food", "Tips"],
    meetingPoint: "Lakeside Pokhara",
    endPoint: "Lakeside",
    pickupIncluded: false,
    whatToBring: ["Sunscreen", "Hat", "Camera"],
    safetyNotes: ["Wear life jackets", "Follow boatman instructions"],
    basePrice: 1200,
    currency: "NPR",
    pricingTiers: [{ label: "Adult", price: 1200 }, { label: "Child", price: 800 }],
    availableMonths: ["Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"],
    minGroupSize: 1,
    maxGroupSize: 8,
    bookingCutoffHrs: 6,
    cancellationPolicy: "Full refund if canceled 6 hours prior",
    faq: [{ q: "Can I bring my own food?", a: "Yes, but keep the lake clean." }],
    placeId: 1,
    days: {
      create: [
        {
          dayNumber: 1,
          title: "Boat Ride",
          summary: "Short boat ride to Tal Barahi Temple and back.",
          activities: ["Boat ride", "Temple visit", "Photography"],
          meals: { breakfast: false, lunch: false, dinner: false },
          accommodation: null,
          transport: null,
          images: ["/pokhara/activities/boating1.webp",
      "/pokhara/activities/boating2.webp",
      "/pokhara/activities/boating3.webp",
      "/pokhara/activities/boating5.webp",],
          mapPoints: []
        }
      ]
    },
    departures: {
      create: [
        { date: new Date("2025-10-05T09:00:00+05:45"), startTime: "09:00", status: "OPEN", seatsTotal: 12, seatsAvailable: 12 },
        { date: new Date("2025-10-06T15:00:00+05:45"), startTime: "15:00", status: "OPEN", seatsTotal: 12, seatsAvailable: 8 }
      ]
    }
  },

  // ---------------- Sarangkot Sunrise Itineraries ----------------
{
  id: 4,
  name: "Sarangkot Sunrise Short Trip",
  title: "Sunrise at Sarangkot Viewpoint",
  tagline: "Witness the Annapurna range light up at dawn",
  slug: "sarangkot-sunrise-short-trip",
  description: "Early morning drive to Sarangkot to capture the breathtaking sunrise over Annapurna and Machhapuchhre. Ideal for photographers or short-time visitors.",
  images: [
    "/pokhara/activities/sarangkot5.webp",
    "/pokhara/activities/sarangkot1.webp",
    "/pokhara/activities/sarangkot2.webp",
    "/pokhara/activities/sarangkot3.webp",
    "/pokhara/activities/sarangkot4.webp",
  ],
  gallery: [
    "/pokhara/activities/sarangkot1.webp",
    "/pokhara/activities/sarangkot2.webp",
    "/pokhara/activities/sarangkot3.webp",
    "/pokhara/activities/sarangkot4.webp",
    "/pokhara/activities/sarangkot5.webp",
  ],
  durationDays: 1,
  durationNights: 0,
  difficulty: "Easy",
  languages: ["English", "Nepali"],
  highlights: ["Sunrise over Annapurna", "Photography spots", "Tea at viewpoint"],
  inclusions: ["Transport", "Guide", "Refreshments"],
  exclusions: ["Breakfast", "Personal expenses"],
  meetingPoint: "Hotel lobby, Lakeside",
  endPoint: "Hotel drop-off",
  pickupIncluded: true,
  whatToBring: ["Warm clothes", "Camera", "Sunscreen"],
  safetyNotes: ["Foggy roads, follow guide", "Slippery paths"],
  basePrice: 2000,
  currency: "NPR",
  pricingTiers: [{ label: "Adult", price: 2000 }, { label: "Child", price: 1200 }],
  availableMonths: ["Oct","Nov","Dec","Jan","Feb","Mar"],
  minGroupSize: 1,
  maxGroupSize: 10,
  bookingCutoffHrs: 12,
  cancellationPolicy: "Full refund if canceled 12 hours prior",
  faq: [
    { q: "Is it possible to walk up?", a: "Yes, but transport is included for comfort." }
  ],
  placeId: 1,
  days: {
    create: [
      {
        dayNumber: 1,
        title: "Sunrise Experience",
        summary: "Drive to Sarangkot, watch sunrise, tea break, and return to Lakeside.",
        activities: ["Drive to Sarangkot", "Sunrise photography", "Tea break", "Return drive"],
        meals: { breakfast: false, lunch: false, dinner: false },
        accommodation: null,
        transport: "Private vehicle",
        images: [ 
          "/pokhara/activities/sarangkot1.webp",
          "/pokhara/activities/sarangkot3.webp",
          "/pokhara/activities/sarangkot2.webp",
          "/pokhara/activities/sarangkot4.webp",
          "/pokhara/activities/sarangkot5.webp",
        ],
        mapPoints: []
      }
    ]
  },
  departures: {
    create: [
      { date: new Date("2025-10-05T04:30:00+05:45"), startTime: "04:30", status: "OPEN", seatsTotal: 12, seatsAvailable: 12 },
      { date: new Date("2025-10-06T04:30:00+05:45"), startTime: "04:30", status: "OPEN", seatsTotal: 12, seatsAvailable: 8 }
    ]
  }
},
{
  id: 5,
  name: "Sarangkot Sunrise & Peace Pagoda",
  title: "Morning Sarangkot & Lakeside Exploration",
  tagline: "Sunrise + scenic walk to World Peace Pagoda",
  slug: "sarangkot-sunrise-peacepagoda",
  description: "Capture the sunrise at Sarangkot then take a guided walk to the World Peace Pagoda for panoramic views. Ideal half-day adventure for early risers.",
  images: [
    "/pokhara/activities/sarangkot4.webp",
    "/pokhara/activities/sarangkot1.webp",
    "/pokhara/activities/sarangkot2.webp",
    "/pokhara/activities/sarangkot3.webp",
    "/pokhara/activities/sarangkot5.webp",
  ],
  gallery: [
     "/pokhara/activities/sarangkot1.webp",
    "/pokhara/activities/sarangkot2.webp",
    "/pokhara/activities/sarangkot3.webp",
    "/pokhara/activities/sarangkot4.webp",
    "/pokhara/activities/sarangkot5.webp",
  ],
  durationDays: 1,
  durationNights: 0,
  difficulty: "Easy",
  languages: ["English", "Nepali"],
  highlights: ["Sunrise", "Peace Pagoda walk", "Photography"],
  inclusions: ["Guide", "Transport", "Refreshments"],
  exclusions: ["Meals", "Souvenirs"],
  meetingPoint: "Lakeside hotel lobby",
  endPoint: "Lakeside hotel",
  pickupIncluded: true,
  whatToBring: ["Camera", "Warm clothing", "Comfortable shoes"],
  safetyNotes: ["Follow guide instructions", "Slippery paths in early morning"],
  basePrice: 3200,
  currency: "NPR",
  pricingTiers: [{ label: "Adult", price: 3200 }, { label: "Child", price: 2000 }],
  availableMonths: ["Oct","Nov","Dec","Jan","Feb","Mar"],
  minGroupSize: 1,
  maxGroupSize: 15,
  bookingCutoffHrs: 12,
  cancellationPolicy: "Full refund if canceled 12 hours prior",
  faq: [
    { q: "Is walking steep?", a: "Moderate incline, suitable for most fitness levels." }
  ],
  placeId: 1,
  days: {
    create: [
      {
        dayNumber: 1,
        title: "Sunrise & Pagoda Walk",
        summary: "Early drive to Sarangkot, sunrise photography, tea, then walk to Peace Pagoda.",
        activities: ["Drive to Sarangkot", "Sunrise", "Tea break", "Pagoda walk", "Return drive"],
        meals: { breakfast: false, lunch: false, dinner: false },
        accommodation: null,
        transport: "Private vehicle",
        images: [ "/pokhara/activities/sarangkot1.webp",
    "/pokhara/activities/sarangkot2.webp",
    "/pokhara/activities/sarangkot3.webp",
    "/pokhara/activities/sarangkot4.webp",
    "/pokhara/activities/sarangkot5.webp",],
        mapPoints: []
      }
    ]
  },
  departures: {
    create: [
      { date: new Date("2025-10-05T04:30:00+05:45"), startTime: "04:30", status: "OPEN", seatsTotal: 10, seatsAvailable: 10 },
      { date: new Date("2025-10-07T04:30:00+05:45"), startTime: "04:30", status: "OPEN", seatsTotal: 10, seatsAvailable: 6 }
    ]
  }
},

// ---------------- Ultra Light Flight Itineraries ----------------
{
  id: 6,
  name: "Ultra Light Flight Experience",
  title: "Scenic Ultra Light Flight over Pokhara",
  tagline: "Aerial adventure with panoramic views of Annapurna",
  slug: "ultralight-flight-experience",
  description: "Take an ultra light flight over Pokhara valley, providing unique aerial perspectives of Phewa Lake, Sarangkot, and the Annapurna range.",
  images: [
    "/pokhara/activities/lightflight5.webp",
    "/pokhara/activities/lightflight1.webp",
    "/pokhara/activities/lightflight2.webp",
    "/pokhara/activities/lightflight3.webp",
    "/pokhara/activities/lightflight4.webp",
    "/pokhara/activities/lightflight6.webp",
  ],
  gallery: [
     "/pokhara/activities/lightflight1.webp",
    "/pokhara/activities/lightflight2.webp",
    "/pokhara/activities/lightflight3.webp",
    "/pokhara/activities/lightflight4.webp",
    "/pokhara/activities/lightflight5.webp",
    "/pokhara/activities/lightflight6.webp",
  ],
  durationDays: 1,
  durationNights: 0,
  difficulty: "Medium",
  languages: ["English", "Nepali"],
  highlights: ["Panoramic aerial view", "Photography opportunities", "Experienced pilot"],
  inclusions: ["Ultra light flight", "Safety briefing", "Insurance"],
  exclusions: ["Meals", "Video/photo package"],
  meetingPoint: "Airport Hangar, Pokhara",
  endPoint: "Same as meeting point",
  pickupIncluded: false,
  whatToBring: ["Camera", "Sunglasses", "Comfortable clothes"],
  safetyNotes: ["Weather dependent", "Follow pilot instructions"],
  basePrice: 15000,
  currency: "NPR",
  pricingTiers: [{ label: "Adult", price: 15000 }],
  availableMonths: ["Oct","Nov","Dec","Jan","Feb","Mar"],
  minGroupSize: 1,
  maxGroupSize: 2,
  bookingCutoffHrs: 24,
  cancellationPolicy: "Full refund if canceled 24 hrs prior",
  faq: [
    { q: "Do I need a license?", a: "No, pilot handles the flight." }
  ],
  placeId: 1,
  days: {
    create: [
      {
        dayNumber: 1,
        title: "Flight Adventure",
        summary: "Safety briefing followed by ultra light flight over Pokhara valley.",
        activities: ["Safety briefing", "Ultra light flight", "Photo session"],
        meals: { breakfast: false, lunch: false, dinner: false },
        accommodation: null,
        transport: null,
        images: [ "/pokhara/activities/lightflight1.webp",
    "/pokhara/activities/lightflight2.webp",
    "/pokhara/activities/lightflight3.webp",
    "/pokhara/activities/lightflight4.webp",
    "/pokhara/activities/lightflight5.webp",
    "/pokhara/activities/lightflight6.webp",],
        mapPoints: []
      }
    ]
  },
  departures: {
    create: [
      { date: new Date("2025-10-06T09:00:00+05:45"), startTime: "09:00", status: "OPEN", seatsTotal: 2, seatsAvailable: 2 }
    ]
  }
},
{
  id: 7,
  name: "Ultra Light & Lakeside Exploration",
  title: "Aerial Adventure & Lakeside Tour",
  tagline: "Combine flight with relaxed Lakeside sightseeing",
  slug: "ultralight-lakeside-tour",
  description: "Morning ultra light flight followed by a guided stroll and boat ride around Phewa Lake.",
  images: [
    "/pokhara/activities/lightflight4.webp",
     "/pokhara/activities/lightflight1.webp",
    "/pokhara/activities/lightflight2.webp",
    "/pokhara/activities/lightflight3.webp",
    "/pokhara/activities/lightflight5.webp",
    "/pokhara/activities/lightflight6.webp",
  ],
  gallery: [
    "/pokhara/activities/lightflight1.webp",
    "/pokhara/activities/lightflight2.webp",
    "/pokhara/activities/lightflight3.webp",
    "/pokhara/activities/lightflight4.webp",
    "/pokhara/activities/lightflight5.webp",
    "/pokhara/activities/lightflight6.webp",
  ],
  durationDays: 1,
  durationNights: 0,
  difficulty: "Medium",
  languages: ["English", "Nepali"],
  highlights: ["Ultra light flight", "Lakeside boat ride", "Photography"],
  inclusions: ["Flight", "Boat ride", "Guide", "Insurance"],
  exclusions: ["Meals"],
  meetingPoint: "Ultra Light Airport",
  endPoint: "Hotel drop-off",
  pickupIncluded: true,
  whatToBring: ["Camera", "Comfortable shoes", "Sunglasses"],
  safetyNotes: ["Weather dependent", "Follow pilot and guide instructions"],
  basePrice: 18000,
  currency: "NPR",
  pricingTiers: [{ label: "Adult", price: 18000 }],
  availableMonths: ["Oct","Nov","Dec","Jan","Feb","Mar"],
  minGroupSize: 1,
  maxGroupSize: 4,
  bookingCutoffHrs: 24,
  cancellationPolicy: "Full refund 24 hrs prior",
  faq: [{ q: "Can I combine with paragliding?", a: "Yes, based on availability." }],
  placeId: 1,
  days: {
    create: [
      {
        dayNumber: 1,
        title: "Flight & Lakeside",
        summary: "Morning ultra light flight, then guided boat ride on Phewa Lake.",
        activities: ["Ultra light flight", "Boat ride", "Sightseeing walk"],
        meals: { breakfast: false, lunch: false, dinner: false },
        accommodation: null,
        transport: "Private vehicle",
        images: [ 
          "/pokhara/activities/lightflight3.webp",
          "/pokhara/activities/lightflight1.webp",
    "/pokhara/activities/lightflight2.webp",
    "/pokhara/activities/lightflight4.webp",
    "/pokhara/activities/lightflight5.webp",
    "/pokhara/activities/lightflight6.webp",],
        mapPoints: []
      }
    ]
  },
  departures: {
    create: [
      { date: new Date("2025-10-07T08:30:00+05:45"), startTime: "08:30", status: "OPEN", seatsTotal: 4, seatsAvailable: 4 }
    ]
  }
},

// ---------------- Annapurna Trekking Itineraries ----------------
{
  id: 8,
  name: "Annapurna Base Short Trek",
  title: "2-Day Annapurna Base Camp Trek",
  tagline: "Quick trek to enjoy stunning views of Annapurna",
  slug: "annapurna-short-trek",
  description: "Short trek for travelers who want to experience the beauty of the Annapurna range in 2 days, including village walks and panoramic viewpoints.",
  images: [
    "/pokhara/activities/atrekking6.webp",
    "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking4.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking7.webp",
  ],
  gallery: [
     "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking4.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking6.webp",
    "/pokhara/activities/atrekking7.webp",
  ],
  durationDays: 2,
  durationNights: 1,
  difficulty: "Moderate",
  languages: ["English", "Nepali"],
  highlights: ["Mountain views", "Village walks", "Sunrise at ABC viewpoint"],
  inclusions: ["Guide", "Porter", "Accommodation", "Breakfasts"],
  exclusions: ["Lunch", "Dinner", "Permits"],
  meetingPoint: "Pokhara Hotel",
  endPoint: "Pokhara Hotel",
  pickupIncluded: true,
  whatToBring: ["Trekking shoes", "Warm clothes", "Daypack"],
  safetyNotes: ["Altitude sickness risk", "Weather-dependent"],
  basePrice: 25000,
  currency: "NPR",
  pricingTiers: [{ label: "Adult", price: 25000 }],
  availableMonths: ["Oct","Nov","Dec","Jan","Feb","Mar","Apr"],
  minGroupSize: 1,
  maxGroupSize: 10,
  bookingCutoffHrs: 48,
  cancellationPolicy: "Full refund if canceled 48 hrs prior",
  faq: [{ q: "Is this suitable for beginners?", a: "Moderate fitness required." }],
  placeId: 1,
  days: {
    create: [
      {
        dayNumber: 1,
        title: "Pokhara to Base Camp",
        summary: "Drive to trailhead, trek to first campsite, evening view of Annapurna.",
        activities: ["Drive to trailhead", "Trek 5–6 hrs", "Settle at camp"],
        meals: { breakfast: true, lunch: false, dinner: true },
        accommodation: "Teahouse or tent",
        transport: "Private vehicle",
        images: [
          "/pokhara/activities/atrekking4.webp",
           "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking6.webp",
    "/pokhara/activities/atrekking7.webp",],
        mapPoints: []
      },
      {
        dayNumber: 2,
        title: "Return to Pokhara",
        summary: "Sunrise view, breakfast, and trek back to Pokhara.",
        activities: ["Sunrise photography", "Breakfast", "Trek back", "Drive to Pokhara"],
        meals: { breakfast: true, lunch: false, dinner: false },
        accommodation: null,
        transport: "Private vehicle",
        images: [ "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking4.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking6.webp",
    "/pokhara/activities/atrekking7.webp",],
        mapPoints: []
      }
    ]
  },
  departures: {
    create: [
      { date: new Date("2025-10-10T06:00:00+05:45"), startTime: "06:00", status: "OPEN", seatsTotal: 10, seatsAvailable: 10 }
    ]
  }
},
{
  id: 9,
  name: "Annapurna Base Medium Trek",
  title: "4-Day Annapurna Base Camp Trek",
  tagline: "A deeper trekking experience with village stays",
  slug: "annapurna-medium-trek",
  description: "4-day trekking experience covering scenic trails, villages, waterfalls, and sunset viewpoints. Ideal for those with moderate fitness looking to explore more.",
  images: [
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking4.webp",
     "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking6.webp",
    "/pokhara/activities/atrekking7.webp",
  ],
  gallery: [
    "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking4.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking6.webp",
    "/pokhara/activities/atrekking7.webp",
  ],
  durationDays: 4,
  durationNights: 3,
  difficulty: "Moderate",
  languages: ["English", "Nepali"],
  highlights: ["Mountain views", "Local villages", "Waterfalls", "Sunrise/sunset photography"],
  inclusions: ["Guide", "Porter", "Accommodation", "Breakfasts"],
  exclusions: ["Lunch", "Dinner", "Permits", "Personal expenses"],
  meetingPoint: "Pokhara Hotel",
  endPoint: "Pokhara Hotel",
  pickupIncluded: true,
  whatToBring: ["Trekking shoes", "Warm clothes", "Daypack", "Water bottle"],
  safetyNotes: ["Altitude sickness risk", "Weather dependent", "Carry water"],
  basePrice: 45000,
  currency: "NPR",
  pricingTiers: [{ label: "Adult", price: 45000 }],
  availableMonths: ["Oct","Nov","Dec","Jan","Feb","Mar","Apr"],
  minGroupSize: 1,
  maxGroupSize: 8,
  bookingCutoffHrs: 48,
  cancellationPolicy: "Full refund if canceled 48 hrs prior",
  faq: [{ q: "Is porter included?", a: "Yes, one porter per two trekkers." }],
  placeId: 1,
  days: {
    create: [
      {
        dayNumber: 1,
        title: "Drive to Trailhead & Trek",
        summary: "Drive to Nayapul, trek 4–5 hrs to village stay.",
        activities: ["Drive", "Trek 4–5 hrs", "Settle at guesthouse"],
        meals: { breakfast: true, lunch: false, dinner: true },
        accommodation: "Guesthouse",
        transport: "Private vehicle",
        images: [ "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking4.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking6.webp",
    "/pokhara/activities/atrekking7.webp",],
        mapPoints: []
      },
      {
        dayNumber: 2,
        title: "Trek to Base Camp",
        summary: "Trek across villages, rivers, and viewpoints.",
        activities: ["Trek 5–6 hrs", "Photography stops", "Arrive at Base Camp"],
        meals: { breakfast: true, lunch: false, dinner: true },
        accommodation: "Teahouse or camp",
        transport: "On foot",
        images: [ "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking4.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking6.webp",
    "/pokhara/activities/atrekking7.webp",],
        mapPoints: []
      },
      {
        dayNumber: 3,
        title: "Sunrise & Explore",
        summary: "Early sunrise at Base Camp, short hikes nearby, enjoy mountain panorama.",
        activities: ["Sunrise photography", "Short hikes", "Relax at camp"],
        meals: { breakfast: true, lunch: false, dinner: true },
        accommodation: "Teahouse or camp",
        transport: "On foot",
        images: [
          "/pokhara/activities/atrekking3.webp",
           "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking4.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking6.webp",
    "/pokhara/activities/atrekking7.webp",],
        mapPoints: []
      },
      {
        dayNumber: 4,
        title: "Return Trek & Drive to Pokhara",
        summary: "Trek back to Nayapul, then drive to Pokhara.",
        activities: ["Trek back 5 hrs", "Drive to Pokhara", "End of trek"],
        meals: { breakfast: true, lunch: false, dinner: false },
        accommodation: null,
        transport: "Private vehicle",
        images: [
          "/pokhara/activities/atrekking6.webp",
          "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking4.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking7.webp",],
        mapPoints: []
      }
    ]
  },
  departures: {
    create: [
      { date: new Date("2025-10-12T06:00:00+05:45"), startTime: "06:00", status: "OPEN", seatsTotal: 6, seatsAvailable: 6 }
    ]
  }
},
{
  id: 10,
  name: "Annapurna Base Long Trek",
  title: "7-Day Annapurna Base Camp Immersive Trek",
  tagline: "Complete trekking adventure through scenic trails, villages, and peaks",
  slug: "annapurna-long-trek",
  description: "7-day full trek to Annapurna Base Camp covering scenic villages, waterfalls, forests, and the highest viewpoints. Suitable for fit travelers wanting a complete experience.",
  images: [
    "/pokhara/activities/atrekking4.webp",
    "/pokhara/activities/atrekking1.webp",
    "/pokhara/activities/atrekking2.webp",
    "/pokhara/activities/atrekking3.webp",
    "/pokhara/activities/atrekking5.webp",
    "/pokhara/activities/atrekking6.webp",
    "/pokhara/activities/atrekking7.webp",
  ],
  gallery: [
    "/pokhara/itineraries/abc_long_gallery1.jpg",
    "/pokhara/itineraries/abc_long_gallery2.webp"
  ],
  durationDays: 7,
  durationNights: 6,
  difficulty: "Hard",
  languages: ["English", "Nepali"],
  highlights: ["Panoramic mountains", "Rivers & waterfalls", "Sunrise at ABC", "Local villages"],
  inclusions: ["Guide", "Porter", "Accommodation", "Breakfasts"],
  exclusions: ["Lunch", "Dinner", "Permits", "Travel insurance"],
  meetingPoint: "Pokhara Hotel",
  endPoint: "Pokhara Hotel",
  pickupIncluded: true,
  whatToBring: ["Trekking shoes", "Warm clothing", "Daypack", "Water bottle", "Snacks"],
  safetyNotes: ["High altitude risk", "Challenging terrain", "Weather-dependent"],
  basePrice: 90000,
  currency: "NPR",
  pricingTiers: [{ label: "Adult", price: 90000 }],
  availableMonths: ["Oct","Nov","Dec","Jan","Feb","Mar","Apr"],
  minGroupSize: 1,
  maxGroupSize: 6,
  bookingCutoffHrs: 48,
  cancellationPolicy: "Full refund if canceled 48 hrs prior",
  faq: [
    { q: "Is it suitable for beginners?", a: "Requires good fitness; experienced guide provided." }
  ],
  placeId: 1,
  days: {
    create: [
      {
        dayNumber: 1,
        title: "Drive to Nayapul & Trek to Tikhedhunga",
        summary: "Drive to trailhead, trek 3–4 hrs to Tikhedhunga, settle at guesthouse.",
        activities: ["Drive", "Trek", "Guesthouse stay"],
        meals: { breakfast: true, lunch: false, dinner: true },
        accommodation: "Guesthouse",
        transport: "Private vehicle",
        images: [],
        mapPoints: []
      },
      { dayNumber: 2, title: "Trek to Ghorepani", summary: "Trek 5–6 hrs to Ghorepani, scenic views.", activities: ["Trek", "Photography"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "Guesthouse", transport: "On foot", images: [], mapPoints: [] },
      { dayNumber: 3, title: "Poon Hill Sunrise & Trek to Tadapani", summary: "Sunrise at Poon Hill, trek to Tadapani.", activities: ["Sunrise", "Trek"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "Guesthouse", transport: "On foot", images: [], mapPoints: [] },
      { dayNumber: 4, title: "Trek to Chomrong", summary: "Cross villages, waterfalls, and rivers.", activities: ["Trek", "Photography"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "Guesthouse", transport: "On foot", images: [], mapPoints: [] },
      { dayNumber: 5, title: "Trek to Annapurna Base Camp", summary: "Arrive ABC, enjoy panoramic views.", activities: ["Trek 5–6 hrs", "Photography"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "Teahouse", transport: "On foot", images: [], mapPoints: [] },
      { dayNumber: 6, title: "Explore ABC & Return", summary: "Short hikes around ABC, start return trek.", activities: ["Hiking", "Photography"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "Guesthouse", transport: "On foot", images: [], mapPoints: [] },
      { dayNumber: 7, title: "Return Trek & Drive to Pokhara", summary: "Complete trek, drive to Pokhara, end of journey.", activities: ["Trek", "Drive"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: null, transport: "Private vehicle", images: [], mapPoints: [] }
    ]
  },
  departures: {
    create: [
      { date: new Date("2025-10-15T06:00:00+05:45"), startTime: "06:00", status: "OPEN", seatsTotal: 6, seatsAvailable: 6 }
    ]
  }
}

  ];

  const pokharaAccommodations = [
  {
    name: "Temple Tree Resort & Spa",
    slug: "temple-tree-resort",
    description:
      "Temple Tree Resort & Spa blends traditional Nepalese architecture with modern comfort. Located just a short walk from Phewa Lake, it offers a serene garden setting, outdoor pool, and spa treatments with mountain views.",
    shortDescription:
      "Lakeside boutique resort with Himalayan views and a tranquil spa.",
    images: [
      "/pokhara/accommodations/templetree1.jpeg",
"/pokhara/accommodations/templetree2.jpeg",
"/pokhara/accommodations/templetree3.jpeg",
"/pokhara/accommodations/templetree4.jpeg",
      "/okhara/accommodations/templetree5.jpeg",
      "/pokhara/accommodations/templetree6.jpeg",
    ],
    price: 120.0,
    discountPrice: 100.0,
    currency: "USD",
    latitude: 28.209,
    longitude: 83.985,
    type: "Resort",
    starCategory: 4,
    amenities: [
      "Outdoor Pool",
      "Spa",
      "Restaurant & Bar",
      "Free WiFi",
      "Room Service",
      "24-hour Reception",
      "Laundry Service",
      "Garden View",
    ],
    roomTypes: ["Standard Room", "Deluxe Room", "Garden Villa", "Suite"],
    checkInTime: "14:00",
    checkOutTime: "12:00",
    contactNumber: "+977-61-465819",
    email: "info@templetree.com",
    website: "https://templetreenepal.com",
    address: "Gaurighat, Lakeside, Pokhara 33700, Nepal",
    city: "Pokhara",
    postalCode: "33700",
    mapLink: "https://goo.gl/maps/example-templetree",
    cancellationPolicy:
      "Free cancellation up to 48 hours before check-in. Later cancellations will be charged one night’s stay.",
    childPolicy:
      "Children under 5 years stay free with existing bedding. Extra beds available on request.",
    petPolicy: "Pets not allowed.",
    highlights: ["Lakeside view", "Spa & wellness center", "Beautiful gardens"],
    services: [
      "Airport pickup",
      "Laundry",
      "Concierge",
      "Daily housekeeping",
      "Room service",
    ],
    accessibility: ["Wheelchair accessible", "Ground floor rooms available"],
    nearbyAttractions: ["Phewa Lake", "World Peace Pagoda", "Tal Barahi Temple"],
    placeId: 1,
  },
  {
    name: "Hotel Middle Path & Spa",
    slug: "hotel-middle-path",
    description:
      "Hotel Middle Path & Spa is a well-rated mid-range option in Lakeside Pokhara. Featuring a rooftop restaurant, spa, and swimming pool, it’s perfect for budget-conscious travelers looking for comfort and views.",
    shortDescription:
      "Comfortable lakeside stay with rooftop views and spa services.",
    images: [
      "/pokhara/accommodations/middle3.jpeg",
      "/pokhara/accommodations/middle1.jepg",
"/pokhara/accommodations/middle2.jpeg",
"/pokhara/accommodations/middle4.jpeg",
"/pokhara/accommodations/middle5.jpeg",
"/pokhara/accommodations/middle6.jpeg",
    ],
    price: 45.0,
    discountPrice: 40.0,
    currency: "USD",
    latitude: 28.207,
    longitude: 83.97,
    type: "Hotel",
    starCategory: 3,
    amenities: [
      "Rooftop Restaurant",
      "Free WiFi",
      "Spa",
      "Breakfast Included",
      "Air Conditioning",
      "Laundry Service",
      "Airport Shuttle",
    ],
    roomTypes: ["Standard Room", "Family Room", "Deluxe Double"],
    checkInTime: "14:00",
    checkOutTime: "12:00",
    contactNumber: "+977-61-465712",
    email: "booking@hotelmiddlepath.com",
    website: "https://hotelmiddlepath.com",
    address: "Barahi Path, Lakeside, Pokhara 33700, Nepal",
    city: "Pokhara",
    postalCode: "33700",
    mapLink: "https://goo.gl/maps/example-middlepath",
    cancellationPolicy:
      "Free cancellation before 24 hours of arrival. No refund for no-shows.",
    childPolicy: "Children below 6 years old stay free of charge.",
    petPolicy: "Pets are not allowed.",
    highlights: ["Mountain view", "Affordable", "Central lakeside location"],
    services: ["Daily housekeeping", "Massage", "Room service"],
    accessibility: ["Elevator", "Wheelchair accessible entrance"],
    nearbyAttractions: [
      "Phewa Lake",
      "Lakeside Market",
      "Tal Barahi Temple",
      "Sarangkot Viewpoint",
    ],
    placeId: 1,
  },
  {

    name: "Fishtail Lodge",
    slug: "fishtail-lodge",
    description:
      "A heritage lakeside property accessible by a short shuttle boat ride across Phewa Lake. Fishtail Lodge offers panoramic views of Mt. Machhapuchhre, peaceful gardens, and an iconic rustic setting.",
    shortDescription:
      "Iconic lakeside lodge accessible by boat, ideal for peaceful stays.",
    images: [
      "/pokhara/accommodations/fishtail1.jpeg",
       "/pokhara/accommodations/fishtail2.jpeg",
        "/pokhara/accommodations/fishtail3.jpeg",
         "/pokhara/accommodations/fishtail4.jpeg",
          "/pokhara/accommodations/fishtail5.jpeg",
           "/pokhara/accommodations/fishtail6.jpeg",
    ],
    price: 90.0,
    discountPrice: 85.0,
    currency: "USD",
    latitude: 28.208,
    longitude: 83.964,
    type: "Lodge",
    starCategory: 4,
    amenities: [
      "Private Lake Access",
      "Restaurant",
      "Bar",
      "Garden",
      "Free Breakfast",
      "Laundry Service",
    ],
    roomTypes: ["Standard Cottage", "Deluxe Cottage", "Suite Cottage"],
    checkInTime: "13:00",
    checkOutTime: "12:00",
    contactNumber: "+977-61-465046",
    email: "info@fishtaillodge.com",
    website: "https://fishtaillodge.com.np",
    address: "Pardi, Phewa Lake, Pokhara 33700, Nepal",
    city: "Pokhara",
    postalCode: "33700",
    mapLink: "https://goo.gl/maps/example-fishtail",
    cancellationPolicy:
      "Free cancellation up to 3 days before check-in. 50% charge for late cancellations.",
    childPolicy: "Children of all ages are welcome.",
    petPolicy: "Pets are not allowed.",
    highlights: ["Unique island access", "Tranquil setting", "Himalayan views"],
    services: ["Boat transfer", "Laundry", "Restaurant"],
    accessibility: ["Ground floor access", "Boat docking ramp"],
    nearbyAttractions: ["Phewa Lake", "Tal Barahi Temple", "Lakeside Bazaar"],
    placeId: 1,
  },
  {

    name: "Waterfront Resort by KGH",
    slug: "waterfront-resort",
    description:
      "A luxurious lakeside resort under the KGH Group, offering premium rooms with balconies overlooking Phewa Lake. Ideal for honeymooners and travelers seeking modern comfort in Pokhara.",
    shortDescription:
      "Luxury resort on the shores of Phewa Lake with scenic views.",
    images: [
       "/pokhara/accommodations/waterfront1.jpeg",
       "/pokhara/accommodations/waterfront2.jpeg",
       "/pokhara/accommodations/waterfront3.jpeg",
        "/pokhara/accommodations/waterfront4.jpeg",  
         "/pokhara/accommodations/waterfront5.jpeg",
 "/pokhara/accommodations/waterfront6.jpeg",
    ],
    price: 180.0,
    discountPrice: 150.0,
    currency: "USD",
    latitude: 28.21,
    longitude: 83.986,
    type: "Resort",
    starCategory: 5,
    amenities: [
      "Infinity Pool",
      "Spa",
      "Fine Dining Restaurant",
      "Bar",
      "Room Service",
      "Lakeside Terrace",
      "Fitness Center",
      "Conference Hall",
    ],
    roomTypes: ["Deluxe Room", "Executive Suite", "Villa"],
    checkInTime: "14:00",
    checkOutTime: "12:00",
    contactNumber: "+977-61-466670",
    email: "reservations@waterfrontresort.com",
    website: "https://www.kghgroup.com.np/waterfront",
    address: "Sedi Height, Lakeside, Pokhara 33700, Nepal",
    city: "Pokhara",
    postalCode: "33700",
    mapLink: "https://goo.gl/maps/example-waterfront",
    cancellationPolicy:
      "Full refund if cancelled 48 hours before arrival. 1-night charge after that.",
    childPolicy: "Children below 10 years stay free with parents.",
    petPolicy: "Pets allowed on request (extra charges may apply).",
    highlights: [
      "Lakeside sunset views",
      "Luxury spa",
      "Infinity pool with mountain backdrop",
    ],
    services: [
      "Airport transfer",
      "Room service",
      "Concierge",
      "Housekeeping",
      "Spa treatments",
    ],
    accessibility: ["Elevator", "Wheelchair ramps"],
    nearbyAttractions: ["Phewa Lake", "Sarangkot", "Bindhyabasini Temple"],
    placeId: 1,
  },
  {

    name: "Pokhara Inn",
    slug: "pokhara-inn",
    description:
      "A mid-range hotel located near the main Lakeside area. Pokhara Inn offers clean, comfortable rooms and a warm atmosphere suitable for both solo and family travelers.",
    shortDescription:
      "Affordable hotel near Lakeside with breakfast and parking.",
    images: [
       "/pokhara/accommodations/pokharainn1.jpeg",
"/pokhara/accommodations/pokharainn2.jpeg",
"/pokhara/accommodations/pokharainn3.jpeg",
"/pokhara/accommodations/pokharainn4.jpeg",
       "/pokhara/accommodations/pokharainn5.jpeg",
       "/pokhara/accommodations/pokharainn6.jpeg",
    ],
    price: 60.0,
    discountPrice: 55.0,
    currency: "USD",
    latitude: 28.206,
    longitude: 83.965,
    type: "Hotel",
    starCategory: 3,
    amenities: ["Free WiFi", "Breakfast Included", "Parking", "Laundry Service"],
    roomTypes: ["Single", "Double", "Family Room"],
    checkInTime: "13:00",
    checkOutTime: "12:00",
    contactNumber: "+977-61-466590",
    email: "contact@pokharainn.com",
    website: "https://pokharainn.com",
    address: "Lakeside Road, Pokhara 33700, Nepal",
    city: "Pokhara",
    postalCode: "33700",
    mapLink: "https://goo.gl/maps/example-pokharainn",
    cancellationPolicy:
      "Free cancellation up to 24 hours before arrival. No refund for late cancellations.",
    childPolicy: "Children under 8 years stay free with parents.",
    petPolicy: "Pets are not allowed.",
    highlights: ["Central location", "Value for money", "Family-friendly"],
    services: ["Laundry", "Room cleaning", "Breakfast service"],
    accessibility: ["Stairs only", "Wide corridors"],
    nearbyAttractions: ["Phewa Lake", "Lakeside Market", "Devi’s Fall"],
    placeId: 1,
  },
];

const pokharaRooms: RoomSeed[] = [
  // Temple Tree Resort & Spa (Accommodation ID = 1)
  {
   accommodationSlug: "temple-tree-resort",
    name: "Standard Room",
    description:
      "Comfortable standard room featuring wooden interiors, air conditioning, and private balcony overlooking the garden.",
    images: [
      "https://via.placeholder.com/800x600?text=Temple+Tree+Standard+Room",
      "https://via.placeholder.com/800x600?text=Temple+Tree+Standard+Room+2",
    ],
    pricePerNight: 120.0,
    maxGuests: 2,
    bedType: "Queen",
    amenities: [
      "Air Conditioning",
      "Balcony",
      "Private Bathroom",
      "WiFi",
      "Mini Bar",
      "Television",
    ],
    available: true,
  },
  {
    accommodationSlug: "temple-tree-resort",
    name: "Deluxe Room",
    description:
      "Spacious deluxe room with elegant wooden decor, large windows, and poolside or garden views.",
    images: [
      "https://via.placeholder.com/800x600?text=Temple+Tree+Deluxe+Room",
    ],
    pricePerNight: 160.0,
    maxGuests: 3,
    bedType: "King",
    amenities: [
      "Air Conditioning",
      "Mini Bar",
      "Balcony",
      "WiFi",
      "Hair Dryer",
      "TV",
    ],
    available: true,
  },
  {
   accommodationSlug: "temple-tree-resort",
    name: "Garden Villa",
    description:
      "Private villa unit featuring spacious rooms, modern bathrooms, and views of the lush garden. Perfect for couples or small families.",
    images: [
      "https://via.placeholder.com/800x600?text=Temple+Tree+Garden+Villa",
    ],
    pricePerNight: 220.0,
    maxGuests: 4,
    bedType: "King",
    amenities: [
      "Private Garden View",
      "Air Conditioning",
      "Room Service",
      "WiFi",
      "Jacuzzi",
    ],
    available: true,
  },

  // Hotel Middle Path & Spa (Accommodation ID = 2)
  {
    accommodationSlug: "hotel-middle-path",
    name: "Standard Room",
    description:
      "Simple and clean room ideal for budget travelers. Comes with private bathroom, free WiFi, and breakfast included.",
    images: [
      "https://via.placeholder.com/800x600?text=Middle+Path+Standard+Room",
    ],
    pricePerNight: 45.0,
    maxGuests: 2,
    bedType: "Double",
    amenities: [
      "Private Bathroom",
      "WiFi",
      "Breakfast Included",
      "TV",
      "Air Conditioning",
    ],
    available: true,
  },
  {
    accommodationSlug: "hotel-middle-path",
    name: "Family Room",
    description:
      "Spacious family room with two double beds, balcony, and access to rooftop views of the Annapurna range.",
    images: [
      "https://via.placeholder.com/800x600?text=Middle+Path+Family+Room",
    ],
    pricePerNight: 70.0,
    maxGuests: 4,
    bedType: "Double x2",
    amenities: [
      "Balcony",
      "WiFi",
      "Air Conditioning",
      "Breakfast",
      "TV",
      "Hot Shower",
    ],
    available: true,
  },
  {
    accommodationSlug: "hotel-middle-path",
    name: "Deluxe Double",
    description:
      "Modern room with improved furnishings and access to rooftop restaurant and pool area.",
    images: [
      "https://via.placeholder.com/800x600?text=Middle+Path+Deluxe+Room",
    ],
    pricePerNight: 60.0,
    maxGuests: 2,
    bedType: "Queen",
    amenities: [
      "Balcony",
      "Air Conditioning",
      "WiFi",
      "Mini Fridge",
      "TV",
      "Breakfast",
    ],
    available: true,
  },

  // Fishtail Lodge (Accommodation ID = 3)
  {
    accommodationSlug: "fishtail-lodge",
    name: "Standard Cottage",
    description:
      "Classic lakeside cottage surrounded by greenery. Offers quiet comfort with essential amenities.",
    images: [
      "https://via.placeholder.com/800x600?text=Fishtail+Standard+Cottage",
    ],
    pricePerNight: 85.0,
    maxGuests: 2,
    bedType: "Twin",
    amenities: [
      "Lake View",
      "Private Bathroom",
      "Ceiling Fan",
      "WiFi",
      "Breakfast Included",
    ],
    available: true,
  },
  {
    accommodationSlug: "fishtail-lodge",
    name: "Deluxe Cottage",
    description:
      "Deluxe wooden cottage with panoramic lake views, cozy interiors, and upgraded bathrooms.",
    images: [
      "https://via.placeholder.com/800x600?text=Fishtail+Deluxe+Cottage",
    ],
    pricePerNight: 120.0,
    maxGuests: 3,
    bedType: "Queen",
    amenities: [
      "Balcony",
      "Lake View",
      "Mini Bar",
      "WiFi",
      "Breakfast",
      "TV",
    ],
    available: true,
  },
  {
   accommodationSlug: "fishtail-lodge",
    name: "Suite Cottage",
    description:
      "Spacious suite cottage ideal for couples, featuring sitting area, lake view veranda, and premium amenities.",
    images: [
      "https://via.placeholder.com/800x600?text=Fishtail+Suite+Cottage",
    ],
    pricePerNight: 160.0,
    maxGuests: 3,
    bedType: "King",
    amenities: [
      "Private Veranda",
      "Mini Bar",
      "Lake View",
      "Air Conditioning",
      "WiFi",
    ],
    available: true,
  },

  // Waterfront Resort by KGH (Accommodation ID = 4)
  {
    accommodationSlug: "waterfront-resort",
    name: "Deluxe Room",
    description:
      "Spacious modern room with balcony overlooking Phewa Lake. Includes breakfast and access to infinity pool.",
    images: [
      "https://via.placeholder.com/800x600?text=Waterfront+Deluxe+Room",
    ],
    pricePerNight: 180.0,
    maxGuests: 2,
    bedType: "Queen",
    amenities: [
      "Balcony",
      "Lake View",
      "Air Conditioning",
      "WiFi",
      "Breakfast",
    ],
    available: true,
  },
  {
    accommodationSlug: "waterfront-resort",
    name: "Executive Suite",
    description:
      "Luxury suite featuring separate living area, panoramic lake view balcony, and exclusive spa access.",
    images: [
      "https://via.placeholder.com/800x600?text=Waterfront+Executive+Suite",
    ],
    pricePerNight: 250.0,
    maxGuests: 3,
    bedType: "King",
    amenities: [
      "Balcony",
      "Mini Bar",
      "Bathtub",
      "Lake View",
      "Room Service",
      "TV",
    ],
    available: true,
  },
  {
    accommodationSlug: "waterfront-resort",
    name: "Villa",
    description:
      "Private lakeside villa with direct pool access, designed for couples seeking luxury and privacy.",
    images: [
      "https://via.placeholder.com/800x600?text=Waterfront+Villa+Pokhara",
    ],
    pricePerNight: 350.0,
    maxGuests: 4,
    bedType: "King",
    amenities: [
      "Private Pool Access",
      "Jacuzzi",
      "Mini Bar",
      "Lake View",
      "WiFi",
    ],
    available: true,
  },

  // Pokhara Inn (Accommodation ID = 5)
  {
    accommodationSlug: "pokhara-inn",
    name: "Single Room",
    description:
      "Simple, cozy single room for solo travelers with comfortable bedding and attached bathroom.",
    images: ["https://via.placeholder.com/800x600?text=Pokhara+Inn+Single+Room"],
    pricePerNight: 35.0,
    maxGuests: 1,
    bedType: "Single",
    amenities: ["WiFi", "TV", "Private Bathroom", "Breakfast"],
    available: true,
  },
  {
    accommodationSlug: "pokhara-inn",
    name: "Double Room",
    description:
      "Spacious room ideal for couples, includes complimentary breakfast and WiFi.",
    images: ["https://via.placeholder.com/800x600?text=Pokhara+Inn+Double+Room"],
    pricePerNight: 55.0,
    maxGuests: 2,
    bedType: "Double",
    amenities: ["WiFi", "Breakfast", "TV", "Air Conditioning"],
    available: true,
  },
  {
    accommodationSlug: "pokhara-inn",
    name: "Family Room",
    description:
      "Large family room with three beds, perfect for groups or families traveling together.",
    images: ["https://via.placeholder.com/800x600?text=Pokhara+Inn+Family+Room"],
    pricePerNight: 75.0,
    maxGuests: 4,
    bedType: "Double + Single",
    amenities: ["WiFi", "TV", "Breakfast", "Private Bathroom"],
    available: true,
  },
];


  const pokharaReligiousSites = [
    {
      name: "World Peace Pagoda (Shanti Stupa)",
      slug: "world-peace-pagoda",
      description:
        "The World Peace Pagoda, also known as Shanti Stupa, is a stunning white-domed Buddhist monument situated on a hilltop overlooking Phewa Lake and Pokhara city. It symbolizes peace and harmony.",
      location: "Pokhara, Gandaki Province",
      latitude: 28.2295,
      longitude: 83.9486,
      history:
        "Built by Buddhist monks of the Nipponzan-Myōhōji order from Japan, the stupa was constructed in 1999 as part of a global initiative to promote peace.",
      significance:
        "The stupa is a sacred pilgrimage site for Buddhists and a symbol of world peace. It attracts both devotees and tourists seeking tranquility.",
      openingHours: "05:00 AM - 06:00 PM",
      entryFee: {
        internal: "Free",
        external: "Free",
        notes: "No entry fee, but donations are welcome.",
      },
      dressCode: "Respectful attire recommended.",
      photography:
        "Photography allowed everywhere except inside the prayer halls.",
      bestTimeToVisit:
        "Sunrise and sunset for panoramic mountain and lake views.",
      nearbyAttractions: [
        {
          name: "Phewa Lake Viewpoint",
          description:
            "Panoramic viewpoint overlooking the lake and Pokhara city.",
          distance: "0.5 km",
          images: ["/pokhara/phewalakeviewpoint.jpg"],
        },
        {
          name: "Gupteshwor Mahadev Cave",
          description:
            "Famous cave temple with underground shrine of Lord Shiva.",
          distance: "2 km",
          images: ["/pokhara/religious/gupteshwor1.jpg"],
        },
      ],
      facilities: {
        parking: true,
        restrooms: true,
        shops: true,
        teaHouses: true,
        meditationHall: true,
      },
      festivals: [
        {
          name: "Buddha Jayanti",
          month: "April/May",
          description:
            "Celebration of the birth of Lord Buddha with special prayers and offerings.",
          images: ["/pokhara/buddhajayanti.webp"],
        },
      ],
      rituals: [
        {
          name: "Morning Meditation",
          description:
            "Monks and visitors gather for peaceful chanting and meditation.",
          time: "06:00 AM",
          images: ["/pokhara/morningmeditation.webp"],
        },
      ],
      images: [
        "/pokhara/religious/peacepagoda1.jpg",
        "/pokhara/religious/peacepagoda2.jpg",
        "/pokhara/religious/peacepagoda3.jpg",
        "/pokhara/religious/peacepagoda4.jpg",
        "/pokhara/religious/peacepagoda5.jpg",
        "/pokhara/religious/peacepagoda6.jpg",
        "/pokhara/religious/peacepagoda7.jpg",
        "/pokhara/religious/peacepagoda8.jpg",
        "/pokhara/religious/peacepagoda9.jpg",
      ],
      contactInfo: {
        phone: null,
        email: null,
        website: null,
        address: "Anadu Hill, Pokhara, Nepal",
      },
      accessibility: {
        wheelchair: false,
        stairsOnly: true,
        audioGuide: false,
        ramps: false,
      },
      safetyGuidelines: [
        {
          rule: "No Loud Noise",
          description: "Maintain silence for meditation and prayers.",
        },
        {
          rule: "Respect Monks",
          description: "Do not interrupt monks during rituals.",
        },
        {
          rule: "No Shoes",
          description: "Remove shoes before entering prayer halls.",
        },
      ],

      placeId: null,
    },

    {
      name: "Tal Barahi Temple",
      slug: "tal-barahi-temple",
      description:
        "Tal Barahi Temple, located on a small island in Phewa Lake, is one of Pokhara’s most iconic landmarks. Dedicated to Goddess Barahi (a manifestation of Durga), it is a hub for religious rituals and a major tourist attraction.",
      location: "Pokhara, Gandaki Province",
      latitude: 28.2103,
      longitude: 83.9583,
      history:
        "The temple is believed to have been constructed in the 18th century by King Kulmandan Shah. It has been a center of worship and pilgrimage for centuries, with a strong connection to the Malla and Shah dynasties.",
      significance:
        "The temple is a key site of Hindu devotion, especially to Goddess Barahi. It is considered highly auspicious for ceremonies, weddings, and rituals performed by priests.",
      openingHours: "06:00 AM - 07:00 PM",
      entryFee: {
        internal: "Free",
        external: "Rs 50 for boat ride",
        notes: "Temple entry is free; boat fare is separate.",
      },
      dressCode:
        "Decent clothing required. Shoes must be removed before entry.",
      photography: "Allowed outside but restricted inside the sanctum.",
      bestTimeToVisit: "Morning hours and during festivals like Dashain.",
      nearbyAttractions: [
        {
          name: "Phewa Lake Boating",
          description:
            "Traditional wooden boats take visitors around the scenic Phewa Lake.",
          distance: "0 km (on the lake itself)",
          images: ["/pokhara/boating.webp"],
        },
        {
          name: "Lakeside",
          description:
            "Bustling tourist hub with shops, restaurants, and cafes.",
          distance: "500 m",
          images: ["/pokhara/lakeside.webp"],
        },
      ],
      facilities: {
        parking: false,
        restrooms: true,
        guide: true,
        shops: true,
        prasadStalls: true,
      },
      festivals: [
        {
          name: "Dashain",
          month: "September/October",
          description:
            "Major festival when thousands of devotees visit the temple to receive blessings.",
          images: ["/pokhara/dashain.webp"],
        },
      ],
      rituals: [
        {
          name: "Morning Pooja",
          description: "Daily prayers with offerings of flowers and incense.",
          time: "06:00 AM – 07:30 AM",
          images: ["/pokhara/morningpooja.webp"],
        },
        {
          name: "Special Ceremonies",
          description:
            "Priests conduct wedding rituals and special pujas for devotees.",
          time: "On request",
          images: ["/pokhara/specialceremonies.jpg"],
        },
      ],
      images: [
        "/pokhara/religious/talbarahi1.jpg",
        "/pokhara/religious/talbarahi2.jpg",
        "/pokhara/religious/talbarahi3.jpg",
        "/pokhara/religious/talbarahi4.jpg",
        "/pokhara/religious/talbarahi5.jpg",
        "/pokhara/religious/talbarahi6.jpg",
        "/pokhara/religious/talbarahi7.jpg",
        "/pokhara/religious/talbarahi8.jpg",
        "/pokhara/religious/talbarahi9.jpg",
      ],
      contactInfo: {
        phone: "+977-61-555333",
        email: null,
        website: null,
        address: "Tal Barahi Island, Phewa Lake, Pokhara",
      },
      accessibility: {
        wheelchair: false,
        stairsOnly: true,
        audioGuide: false,
        ramps: false,
      },
      safetyGuidelines: [
        {
          rule: "Boat Safety",
          description: "Always wear life jackets while boating to the temple.",
        },
        {
          rule: "Respect Rituals",
          description: "Do not disturb ongoing prayers.",
        },
        {
          rule: "Remove Shoes",
          description: "Shoes must be left outside temple premises.",
        },
      ],

      placeId: null,
    },

    {
      name: "Bindhyabasini Temple",
      slug: "bindhyabasini-temple",
      description:
        "Bindhyabasini Temple is an ancient Hindu temple dedicated to Goddess Durga, located on a hilltop in the heart of Pokhara. It is a prominent spiritual and cultural landmark, offering panoramic views of the city and surrounding mountains.",
      location: "Pokhara, Gandaki Province",
      latitude: 28.2434,
      longitude: 83.9956,
      history:
        "Believed to be one of the oldest temples in Pokhara, Bindhyabasini Temple has been a center of worship for centuries. It has survived numerous renovations and continues to attract devotees and tourists alike.",
      significance:
        "The temple is a major spiritual center for devotees of Goddess Durga. It plays a central role during Navaratri celebrations and other religious ceremonies, making it a hub of cultural and spiritual activities.",
      openingHours: "05:30 AM - 08:00 PM",
      entryFee: {
        internal: "Free",
        external: "Rs 50",
        notes: "Children and elderly (above 70) free",
      },
      dressCode: "Modest clothing required. Remove shoes inside the temple.",
      photography: "Photography allowed only outside the main sanctum.",
      bestTimeToVisit: "Early morning, sunrise, or during Navaratri festival",
      nearbyAttractions: [
        {
          name: "Phewa Lake",
          description:
            "A serene freshwater lake with boating and lakeside activities.",
          distance: "2 km",
          images: ["/pokhara/phewalakeviewpoint.jpg"],
        },
        {
          name: "Tal Barahi Temple",
          description: "Famous lakeside temple dedicated to Goddess Barahi.",
          distance: "2.5 km",
          images: ["/pokhara/religious/talbarahi7.jpg"],
        },
        {
          name: "Pokhara City Center",
          description: "Shopping, cafes, and restaurants in downtown Pokhara.",
          distance: "1 km",
          images: ["/pokhara/pokharacitycenter.webp"],
        },
      ],
      facilities: {
        parking: true,
        restrooms: true,
        guide: true,
        shops: true,
        prasadStalls: true,
        drinkingWater: true,
      },
      festivals: [
        {
          name: "Navaratri",
          month: "September/October",
          description:
            "Nine-day festival honoring Goddess Durga with rituals, prayers, and special offerings. Devotees come from all over Nepal to participate in the celebrations.",
          images: ["/pokhara/navaratri.webp"],
        },
        {
          name: "Dashain",
          month: "September/October",
          description:
            "Major Hindu festival celebrating the victory of good over evil. The temple sees thousands of worshippers during this period.",
          images: ["/pokhara/dashain.webp"],
        },
      ],
      rituals: [
        {
          name: "Morning Pooja",
          description:
            "Daily morning ritual performed by temple priests with offerings of flowers and incense.",
          time: "05:30 AM – 07:00 AM",
          images: ["/pokhara/morningpooja.webp"],
        },
        {
          name: "Special Navaratri Pooja",
          description:
            "Elaborate nine-day rituals with music, offerings, and traditional dances.",
          time: "Navaratri (September/October)",
          images: ["/pokhara/navaratripooja.webp"],
        },
      ],
      images: [
        "/pokhara/religious/bindhyabasini1.jpg",
        "/pokhara/religious/bindhyabasini2.jpg",
        "/pokhara/religious/bindhyabasini3.jpg",
        "/pokhara/religious/bindhyabasini4.jpg",
        "/pokhara/religious/bindhyabasini5.jpg",
        "/pokhara/religious/bindhyabasini6.jpg",
        "/pokhara/religious/bindhyabasini7.jpg",
        "/pokhara/religious/bindhyabasini8.jpg",
        "/pokhara/religious/bindhyabasini9.jpg",
        "/pokhara/religious/bindhyabasini10.jpg",
      ],
      contactInfo: {
        phone: "+977-61-555222",
        email: "info@bindhyabasini.org",
        website: "https://www.bindhyabasini.org",
        address: "Bindhyabasini Temple Road, Pokhara, Nepal",
      },
      accessibility: {
        wheelchair: false,
        stairsOnly: true,
        audioGuide: false,
        ramps: false,
      },
      safetyGuidelines: [
        {
          rule: "Respect temple rituals and customs",
          description: "Follow instructions given by priests.",
        },
        {
          rule: "Remove shoes before entering",
          description: "Leave shoes at designated shoe stand.",
        },
        {
          rule: "Maintain silence inside sanctum",
          description: "Avoid loud conversations or phone use.",
        },
        {
          rule: "Avoid touching sacred objects",
          description: "Do not handle offerings or idols.",
        },
        {
          rule: "Dress modestly",
          description: "Cover shoulders and knees when visiting.",
        },
      ],

      placeId: null,
    },

    {
      name: "Gupteshwor Mahadev Cave Temple",
      slug: "gupteshwor-mahadev-cave",
      description:
        "Gupteshwor Mahadev Cave is a sacred underground cave temple dedicated to Lord Shiva. It is located near Davis Falls and is one of the most mysterious spiritual sites in Pokhara.",
      location: "Pokhara, Gandaki Province",
      latitude: 28.1847,
      longitude: 83.9629,
      history:
        "The cave has been revered for centuries as a hidden shrine of Lord Shiva. The temple was established in the 1990s to allow pilgrims access to the underground sanctum.",
      significance:
        "A powerful pilgrimage site for Shiva devotees. The underground temple’s natural setting enhances its spiritual aura.",
      openingHours: "06:00 AM - 07:00 PM",
      entryFee: {
        internal: "Rs 50",
        external: "Rs 100",
        notes: "Special discounts for students and groups.",
      },
      dressCode: "Modest attire required inside the cave temple.",
      photography: "Photography prohibited inside sanctum, allowed outside.",
      bestTimeToVisit: "Morning or late afternoon to avoid crowds.",
      nearbyAttractions: [
        {
          name: "Davis Falls",
          description:
            "A famous waterfall located right across from the cave entrance.",
          distance: "100 m",
          images: ["/pokhara/davisfall.webp"],
        },
        {
          name: "World Peace Pagoda",
          description: "A stunning Buddhist stupa overlooking Pokhara.",
          distance: "2 km",
          images: ["/pokhara/religious/peacepagoda1.jpg"],
        },
      ],
      facilities: {
        parking: true,
        restrooms: true,
        shops: true,
        lightingInside: true,
        guardRails: true,
      },
      festivals: [
        {
          name: "Maha Shivaratri",
          month: "February/March",
          description:
            "Thousands of devotees gather inside and outside the cave temple to worship Lord Shiva with offerings of milk and bel leaves.",
          images: ["/pokhara/mahashivaratri.jpg"],
        },
      ],
      rituals: [
        {
          name: "Daily Shiva Aarti",
          description:
            "Priests perform daily worship ceremonies with lamps and chants.",
          time: "Morning & Evening",
          images: ["/pokhara/shivaaarati.webp"],
        },
      ],
      images: [
        "/pokhara/religious/gupteshowr1.jpg",
        "/pokhara/religious/gupteshowr2.jpg",
        "/pokhara/religious/gupteshowr3.jpg",
        "/pokhara/religious/gupteshowr4.jpg",
        "/pokhara/religious/gupteshowr5.jpg",
        "/pokhara/religious/gupteshowr6.jpg",
        "/pokhara/religious/gupteshowr7.jpg",
        "/pokhara/religious/gupteshowr8.jpg",
        "/pokhara/religious/gupteshowr9.jpg",
        "/pokhara/religious/gupteshowr10.jpg",
      ],
      contactInfo: {
        phone: "+977-61-555444",
        email: null,
        website: null,
        address: "Chhorepatan, Pokhara, Nepal",
      },
      accessibility: {
        wheelchair: false,
        stairsOnly: true,
        audioGuide: false,
        ramps: false,
      },
      safetyGuidelines: [
        {
          rule: "Mind Your Step",
          description: "Cave floor can be slippery, especially during monsoon.",
        },
        {
          rule: "Low Ceilings",
          description: "Watch your head in narrow passages.",
        },
        {
          rule: "No Flash",
          description:
            "Flash photography disturbs the sanctity and bats inside.",
        },
      ],

      placeId: null,
    },

    {
      name: "Matepani Gumba",
      slug: "matepani-gumba",
      description:
        "Matepani Gumba is a Tibetan-style Buddhist monastery located on a hilltop in Pokhara. It is renowned for its vibrant murals, peaceful surroundings, and panoramic views of the valley.",
      location: "Pokhara, Gandaki Province",
      latitude: 28.2407,
      longitude: 84.0013,
      history:
        "Built in 1960 by Tibetan refugees, Matepani Gumba has been an important center of Mahayana Buddhist teachings and cultural preservation.",
      significance:
        "The monastery is a key spiritual and cultural hub for the Tibetan Buddhist community in Pokhara. It symbolizes compassion and wisdom, attracting devotees and tourists alike.",
      openingHours: "05:30 AM - 05:00 PM",
      entryFee: {
        internal: "Free",
        external: "Free",
        notes: "Donations are welcome.",
      },
      dressCode: "Respectful attire required.",
      photography: "Allowed outside; restricted inside prayer hall.",
      bestTimeToVisit: "Morning for prayers or late afternoon for meditation.",
      nearbyAttractions: [
        {
          name: "Mahendra Cave",
          description: "A popular limestone cave with natural formations.",
          distance: "3 km",
          images: ["/pokhara/religious/mahendra2.jpg"],
        },
        {
          name: "Seti River Gorge",
          description: "A deep gorge carved by the Seti River.",
          distance: "2 km",
          images: ["/pokhara/setiriver.jpg"],
        },
      ],
      facilities: {
        parking: true,
        restrooms: true,
        meditationHall: true,
        shops: false,
      },
      festivals: [
        {
          name: "Losar (Tibetan New Year)",
          month: "February/March",
          description:
            "Celebrated with chanting, dances, and special offerings to mark the Tibetan New Year.",
          images: ["/pokhara/loshar.webp"],
        },
      ],
      rituals: [
        {
          name: "Morning Chanting",
          description: "Monks perform daily prayers and chanting ceremonies.",
          time: "06:00 AM – 07:00 AM",
          images: ["/pokhara/morningpooja.webp"],
        },
        {
          name: "Evening Meditation",
          description:
            "Visitors can join silent meditation sessions with monks.",
          time: "04:30 PM – 05:00 PM",
          images: ["/pokhara/eveningmeditation.jpg"],
        },
      ],
      images: [
        "/pokhara/religious/matepani1.jpg",
        "/pokhara/religious/matepani2.jpg",
        "/pokhara/religious/matepani3.jpg",
        "/pokhara/religious/matepani4.jpg",
        "/pokhara/religious/matepani5.jpg",
        "/pokhara/religious/matepani6.jpg",
        "/pokhara/religious/matepani7.jpg",
        "/pokhara/religious/matepani8.jpg",
      ],
      contactInfo: {
        phone: "+977-61-555555",
        email: null,
        website: null,
        address: "Matepani Hill, Pokhara, Nepal",
      },
      accessibility: {
        wheelchair: false,
        stairsOnly: true,
        audioGuide: false,
        ramps: false,
      },
      safetyGuidelines: [
        {
          rule: "Silence Required",
          description: "Maintain silence in prayer halls.",
        },
        {
          rule: "No Smoking",
          description: "Smoking is prohibited within monastery grounds.",
        },
        {
          rule: "Respect Monks",
          description: "Do not interrupt ongoing chanting.",
        },
      ],

      placeId: null,
    },

    {
      name: "Bhadrakali Temple",
      slug: "bhadrakali-temple",
      description:
        "Bhadrakali Temple is a revered Hindu temple dedicated to Goddess Bhadrakali, located on a small hill in east Pokhara. It offers a tranquil environment and panoramic views of the city.",
      location: "Pokhara, Gandaki Province",
      latitude: 28.2136,
      longitude: 83.9927,
      history:
        "The temple is believed to have been built in the 19th century. It has long been an important site for devotees of Goddess Bhadrakali, symbolizing protection and strength.",
      significance:
        "A key spiritual site for Hindu devotees, particularly during festivals like Navaratri and Dashain. It is also a popular local pilgrimage spot.",
      openingHours: "06:00 AM - 08:00 PM",
      entryFee: {
        internal: "Free",
        external: "Free",
        notes: "Voluntary donations accepted.",
      },
      dressCode: "Traditional or modest attire recommended.",
      photography: "Allowed in the temple compound.",
      bestTimeToVisit: "During Navaratri festival or early mornings.",
      nearbyAttractions: [
        {
          name: "Seti River Gorge",
          description: "Natural gorge with viewpoints around Pokhara.",
          distance: "1 km",
          images: ["/pokhara/setiriver.jpg"],
        },
      ],
      facilities: {
        parking: true,
        restrooms: true,
        shops: true,
        prasadStalls: true,
      },
      festivals: [
        {
          name: "Navaratri",
          month: "September/October",
          description:
            "Nine nights of devotion to Goddess Durga, celebrated with rituals, dances, and offerings.",
          images: ["/pokhara/navaratri.webp"],
        },
      ],
      rituals: [
        {
          name: "Morning Aarti",
          description: "Daily worship with flowers, incense, and chants.",
          time: "06:30 AM",
          images: ["/pokhara/morningpooja.webp"],
        },
        {
          name: "Special Navaratri Pooja",
          description: "Nine-day special prayers and offerings to the goddess.",
          time: "Annual (Navaratri)",
          images: ["/pokhara/navaratripooja.jpg"],
        },
      ],
      images: [
        "/pokhara/religious/bhadrakali1.jpg",
        "/pokhara/religious/bhadrakali2.jpg",
        "/pokhara/religious/bhadrakali3.jpg",
        "/pokhara/religious/bhadrakali4.jpg",
        "/pokhara/religious/bhadrakali5.jpg",
        "/pokhara/religious/bhadrakali6.jpg",
        "/pokhara/religious/bhadrakali7.jpg",
      ],
      contactInfo: {
        phone: "+977-61-555666",
        email: null,
        website: null,
        address: "Bhadrakali Hill, East Pokhara, Nepal",
      },
      accessibility: {
        wheelchair: false,
        stairsOnly: true,
        audioGuide: false,
        ramps: false,
      },
      safetyGuidelines: [
        {
          rule: "No Shoes",
          description: "Leave footwear outside before entering.",
        },
        {
          rule: "Respect Priests",
          description: "Follow instructions of temple priests.",
        },
        {
          rule: "No Loud Noise",
          description: "Maintain silence inside sanctum.",
        },
      ],

      placeId: null,
    },

    {
      name: "Mahendra Gufa",
      slug: "mahendra-gufa",
      description:
        "Mahendra Gufa (Mahendra Cave) is a natural limestone cave in Pokhara, known for its sacred Shivalinga and fascinating rock formations. It is a popular site for both devotees of Lord Shiva and visitors seeking to experience its cool and mystical atmosphere.",
      location: "Batulechaur, Pokhara, Gandaki Province",
      latitude: 28.2771,
      longitude: 84.0040,
      history:
        "The cave was officially discovered in the late 1950s and named after King Mahendra Bir Bikram Shah Dev. It has long been visited by devotees who believe the cave was once a meditation site for sages. Over time, it has also become a popular tourist attraction due to its unique limestone structures and underground sanctum.",
      significance:
        "Mahendra Gufa is spiritually significant because of the naturally formed Shivalinga inside, where daily prayers and offerings are made. The cave also holds cultural importance as one of Pokhara’s most visited natural and religious landmarks.",
      openingHours: "05:00 AM - 07:00 PM",
      entryFee: {
        internal: "Rs. 50",
        external: "Rs. 150",
        student: "Rs. 25 (with ID)",
        child: "Free under 10 years",
        notes: "Discounts may apply during major festivals.",
      },
      dressCode:
        "Respectful, modest clothing recommended. Comfortable, non-slip shoes advised due to wet cave floor.",
      photography:
        "Allowed in outer chambers. Flash photography discouraged near shrines.",
      bestTimeToVisit:
        "October to March, when the cave floor is less slippery. Maha Shivaratri festival attracts the largest gatherings.",
      nearbyAttractions: [
        {
          name: "Bat Cave (Chamere Gufa)",
          description: "Another limestone cave nearby, known for its bats.",
          distance: "1 km",
          images: ["/pokhara/batcave.webp"],
        },
        {
          name: "Gupteshwor Mahadev Cave",
          description:
            "A sacred cave dedicated to Lord Shiva, featuring a waterfall inside.",
          distance: "5 km",
          images: ["/pokhara/religious/gupteshowr1.jpg"],
        },
        {
          name: "Bindhyabasini Temple",
          description:
            "An important Durga temple situated on a hilltop overlooking Pokhara.",
          distance: "3 km",
          images: ["/pokhara/religious/bindhyabasini1.jpg"],
        },
      ],
      facilities: {
        parking: true,
        restrooms: true,
        shops: true,
        guide: true,
        lighting: true,
      },
      festivals: [
        {
          name: "Maha Shivaratri",
          month: "February/March",
          description:
            "Thousands of devotees gather at Mahendra Gufa to worship Lord Shiva with offerings, prayers, and all-night chanting near the Shivalinga.",
          images: ["/pokhara/mahashivaratri.jpg"],
        },
        {
          name: "Teej",
          month: "August/September",
          description:
            "Women celebrate Teej by offering prayers to Lord Shiva, performing rituals, and singing devotional songs inside and near the cave.",
          images: ["/pokhara/teej.webp"],
        },
      ],
      rituals: [
        {
          name: "Daily Shivalinga Worship",
          description:
            "Devotees offer water, bel leaves, incense, and oil lamps to the Shivalinga every morning and evening.",
          time: "05:00 AM – 07:00 AM, 05:00 PM – 07:00 PM",
          images: ["/pokhara/shivaaarati.webp"],
        },
        {
          name: "Festival Pujas",
          description:
            "On special occasions like Maha Shivaratri, priests lead extended rituals with chants, lamp-lighting, and group blessings.",
          time: "Annual (Maha Shivaratri, Teej)",
          images: ["/pokhara/specialceremonies.jpg"],
        },
      ],
      images: [
        "/pokhara/religious/mahendra1.jpg",
        "/pokhara/religious/mahendra2.jpg",
        "/pokhara/religious/mahendra3.jpg",
        "/pokhara/religious/mahendra4.jpg",
        "/pokhara/religious/mahendra5.jpg",
        "/pokhara/religious/mahendra6.jpg",
        "/pokhara/religious/mahendra7.png",
        "/pokhara/religious/mahendra8.jpg",
      ],
      contactInfo: {
        phone: "+977-61-552333",
        email: "info@pokharatourism.org",
        website: "https://www.pokharatourism.org/mahendra-gufa",
        address: "Batulechaur, Pokhara, Nepal",
      },
      accessibility: {
        wheelchair: false,
        stairsOnly: true,
        audioGuide: false,
        ramps: false,
      },
      safetyGuidelines: [
        {
          rule: "Slippery Floors",
          description:
            "The cave floor can be wet and uneven. Wear non-slip shoes and move carefully.",
        },
        {
          rule: "Preserve Formations",
          description:
            "Do not touch or damage limestone structures inside the cave.",
        },
        {
          rule: "Respect Rituals",
          description:
            "Maintain silence and respect during religious ceremonies inside the sanctum.",
        },
        {
          rule: "Use Lighting Carefully",
          description:
            "Carry a flashlight or follow guides for safe passage in darker chambers.",
        },
      ],

      placeId: null,
    },
  ];

  const pokharaCafes = [
    {
      name: "Moondance Café",
      slug: "moondance-cafe",
      description:
        "Lakeside café famous for steaks, pastries, and a relaxed vibe. Perfect for brunch, coffee, and sunset views.",
      images: [
        "/pokhara/cafes/moondance1.jpg",
        "/pokhara/cafes/moondance2.webp",
        "/pokhara/cafes/moondance3.jpg",
        "/pokhara/cafes/moondance4.webp",
        "/pokhara/cafes/moondance5.jpeg",
      ],
      latitude: 28.209,
      longitude: 83.964,
      openingTime: "08:00 AM",
      closingTime: "10:00 PM",
      specialties: ["Steaks", "Pastries", "Coffee", "Smoothies", "Sandwiches"],
      ambiance: ["Lakeside", "Outdoor seating", "Cozy", "Live Music", "Family Friendly"],
      menu: [
        { name: "Cappuccino", description: "Rich espresso with milk foam", price: 450, category: "Beverage", image: "/pokhara/cafes/foods/cappucino.jpeg" },
        { name: "Blueberry Muffin", description: "Freshly baked muffin with real blueberries", price: 300, category: "Dessert", image: "/pokhara/cafes/foods/blueberrymuffins.jpg" },
        { name: "Chocolate Cake Slice", description: "Decadent chocolate cake with ganache", price: 400, category: "Dessert", image: "/pokhara/cafes/foods/chocolatecake.webp" },
        { name: "Steak Sandwich", description: "Grilled steak with vegetables and sauce", price: 900, category: "Snack", image: "/pokhara/cafes/foods/steakswandwich.webp" },
        { name: "Fruit Smoothie", description: "Fresh seasonal fruits blended", price: 450, category: "Beverage", image: "/pokhara/cafes/foods/smoothie.webp" }
      ],
      facilities: [
        { name: "WiFi", available: true },
        { name: "Parking", available: true },
        { name: "Outdoor Seating", available: true },
        { name: "Pet Friendly", available: true },
        { name: "Live Music", available: true },
        { name: "Wheelchair Accessible", available: false },
        { name: "Air Conditioning", available: true },
      ],
      contactInfo: {
        phone: "+977-61-555111",
        email: "moondance@example.com",
        website: "https://moondancecafe.com",
        social: { instagram: "https://instagram.com/moondancecafe", facebook: "https://facebook.com/moondancecafe" },
        address: "Lakeside, Pokhara, Nepal",
      },
      nearbyAttractions: [
        { name: "Phewa Lake", distance: "200m", image: "" },
        { name: "World Peace Pagoda", distance: "2km", image: "" }
      ],

      placeId: null,
    },

    {
      name: "OR2K Pokhara",
      slug: "or2k-pokhara",
      description:
        "Vibrant vegetarian café offering Middle Eastern dishes with a bohemian rooftop vibe.",
      images: [
        "/pokhara/cafes/or2k1.jpg",
        "/pokhara/cafes/or2k2.jpg",
        "/pokhara/cafes/or2k3.webp",
        "/pokhara/cafes/or2k4.webp",
        "/pokhara/cafes/or2k5.jpeg",
      ],
      latitude: 28.210,
      longitude: 83.965,
      openingTime: "09:00 AM",
      closingTime: "11:00 PM",
      specialties: ["Falafel", "Hummus", "Shawarma", "Fresh Juices", "Salads"],
      ambiance: ["Rooftop", "Artistic vibe", "Casual dining", "Colorful decor", "Live music on weekends"],
      menu: [
        { name: "Falafel Plate", description: "Crispy falafel served with tahini", price: 500, category: "Snack", image: "/pokhara/cafes/foods/falafel.webp" },
        { name: "Hummus Trio", description: "Classic, roasted red pepper, and avocado hummus", price: 550, category: "Snack", image: "/pokhara/cafes/foods/humustrio.webp" },
        { name: "Vegetarian Shawarma", description: "Grilled veggie wrap with garlic sauce", price: 600, category: "Snack", image: "/pokhara/cafes/foods/vegeteriansharwma.webp" },
        { name: "Fresh Orange Juice", description: "Cold pressed fresh juice", price: 350, category: "Beverage", image: "/pokhara/cafes/foods/freshorangejuice.webp" },
      ],
      facilities: [
        { name: "WiFi", available: true },
        { name: "Rooftop Seating", available: true },
        { name: "Pet Friendly", available: false },
        { name: "Wheelchair Accessible", available: false },
        { name: "Live Music", available: true },
      ],
      contactInfo: {
        phone: "+977-61-555222",
        email: "or2k@example.com",
        website: "https://or2k.com",
        social: { instagram: "https://instagram.com/or2kpokhara", facebook: "https://facebook.com/or2kpokhara" },
        address: "Lakeside, Pokhara, Nepal",
      },
      nearbyAttractions: [
        { name: "Fewa Lake", distance: "300m", image: "" },
        { name: "Bindhyabasini Temple", distance: "2.5km", image: "" }
      ],
      placeId: null,
    },

    {
      name: "Little Windows Café",
      slug: "little-windows-cafe",
      description:
        "Cozy café with lakeside views. Famous for brunch, coffee, and light meals.",
      images: [
        "/pokhara/cafes/littlewindows.jpg",
        "/pokhara/cafes/littlewindows1.jpg",
        "/pokhara/cafes/littlewindows2.jpg",
        "/pokhara/cafes/littlewindows3.jpg",
        "/pokhara/cafes/littlewindows4.jpg",
      ],
      latitude: 28.208,
      longitude: 83.967,
      openingTime: "07:00 AM",
      closingTime: "09:00 PM",
      specialties: ["Coffee", "Sandwiches", "Pastries", "Smoothies", "Breakfast items"],
      ambiance: ["Lakeside", "Quiet", "Casual", "Family Friendly"],
      menu: [
        { name: "Latte", description: "Smooth espresso with milk", price: 450, category: "Beverage", image: "/pokhara/cafes/foods/latte.webp" },
        { name: "Club Sandwich", description: "Grilled sandwich with fresh veggies", price: 550, category: "Snack", image: "/pokhara/cafes/foods/clubsandwich.webp" },
        { name: "Banana Pancake", description: "Fluffy pancakes with caramelized bananas", price: 500, category: "Dessert", image: "/pokhara/cafes/foods/bananapancakes.jpg" },
      ],
      facilities: [
        { name: "WiFi", available: true },
        { name: "Outdoor Seating", available: true },
        { name: "Wheelchair Accessible", available: false },
      ],
      contactInfo: {
        phone: "+977-61-555333",
        email: "littlewindows@example.com",
        website: null,
        social: { instagram: "" },
        address: "Lakeside, Pokhara, Nepal",
      },
      nearbyAttractions: [
        { name: "Phewa Lake", distance: "150m", image: "" }
      ],

      placeId: null,
    },

    {
      name: "Café Concerto",
      slug: "cafe-concerto",
      description:
        "Modern café with a wide range of beverages and desserts. Great for coffee lovers and students.",
      images: [
        "/pokhara/cafes/cafeconcerto1.webp",
        "/pokhara/cafes/cafeconcerto2.webp",
        "/pokhara/cafes/cafeconcerto3.jpg",
        "/pokhara/cafes/cafeconcerto4.jpg",
        "/pokhara/cafes/cafeconcerto5.jpg",
      ],
      latitude: 28.209,
      longitude: 83.965,
      openingTime: "08:00 AM",
      closingTime: "10:00 PM",
      specialties: ["Espresso", "Cakes", "Smoothies", "Pastries", "Sandwiches"],
      ambiance: ["Indoor seating", "Artistic decor", "Cozy", "Quiet"],
      menu: [
        { name: "Espresso", description: "Strong coffee shot", price: 400, category: "Beverage", image: "/pokhara/cafes/foods/espresso.webp" },
        { name: "Chocolate Brownie", description: "Rich chocolate brownie", price: 350, category: "Dessert", image: "/pokhara/cafes/foods/chocolatebrownie.webp" },
        { name: "Smoothie Bowl", description: "Fresh fruit bowl with smoothie base", price: 500, category: "Beverage", image: "/pokhara/cafes/foods/smoothiebowl.webp" },
      ],
      facilities: [
        { name: "WiFi", available: true },
        { name: "Air Conditioning", available: true },
        { name: "Quiet Space", available: true },
        { name: "Wheelchair Accessible", available: false },
      ],
      contactInfo: {
        phone: "+977-61-555444",
        email: "concerto@example.com",
        website: "https://cafeconcerto.com",
        social: { instagram: "https://instagram.com/cafeconcerto" },
        address: "New Road, Pokhara, Nepal",
      },
      nearbyAttractions: [
        { name: "Davis Falls", distance: "500m", image: "" }
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

const createdAccommodations: any[] = [];

for (const acc of pokharaAccommodations) {
  const createdAcc = await prisma.accommodation.upsert({
    where: { slug: acc.slug }, // unique field
    update: {},                // do nothing if exists
    create: acc,
  });
  createdAccommodations.push(createdAcc);
}


for (const room of pokharaRooms) {
  const acc = createdAccommodations.find(a => a.slug === room.accommodationSlug);
  if (!acc) throw new Error(`Accommodation not found for room ${room.name}`);
  room.accommodationId = acc.id; // ✅ now allowed by TypeScript
  delete room.accommodationSlug; // ✅ optional, now TypeScript is happy
}



await prisma.room.createMany({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data: pokharaRooms.map(({ accommodationSlug, ...r }) => r) // ensure slug is removed
});
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
