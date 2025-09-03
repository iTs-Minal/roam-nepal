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
      name: "Paragliding",
      slug: "paragliding",
      description: "Tandem paragliding above Phewa Lake with Annapurna views.",
      images: [
        "/pokhara/activities/paragliding1.jpg",
        "/pokhara/activities/paragliding2.webp",
        "/pokhara/activities/paragliding3.webp",
        "/pokhara/activities/paragliding4.webp",
        "/pokhara/activities/paragliding5.webp",
        "/pokhara/activities/paragliding6.jpeg",
      ],
      latitude: 28.2345,
      longitude: 83.9821,
      difficulty: "Medium",
      duration: "30–60 mins",
      highlights: [
        "Aerial view of Phewa Lake",
        "Sunset flights available",
        "Certified instructors",
      ],
      bookingInfo: "Booking available on-site and online",
      placeId: null,
    },
    {
      name: "Boating on Phewa Lake",
      slug: "phewa-lake-boating",
      description: "Relaxing wooden boat ride across the scenic Phewa Lake.",
      images: [
        "/pokhara/activities/boating-phewa1.webp",
        "/pokhara/activities/boating-phewa2.webp",
        "/pokhara/activities/boating-phewa3.webp",
        "/pokhara/activities/boating-phewa4.jpeg",
        "/pokhara/activities/boating-phewa5.jpeg",
      ],
      latitude: 28.2085,
      longitude: 83.964,
      difficulty: "Easy",
      duration: "1–2 hours",
      highlights: ["Island views", "Barahi Temple access", "Sunset boating"],
      bookingInfo: "Ticket counter at lakeside",
      placeId: null,
    },
    {
      name: "Ultra-light Flight",
      slug: "ultra-light-flight",
      description:
        "Soar high above Pokhara Valley and see panoramic Himalayan views.",
      images: [""],
      latitude: 28.22,
      longitude: 83.97,
      difficulty: "Medium",
      duration: "20–40 mins",
      highlights: [
        "Himalayan panorama",
        "Flight safety briefing",
        "Photography allowed",
      ],
      bookingInfo: "Pre-booking recommended",
      placeId: null,
    },
    {
      name: "Sarangkot Sunrise Hike",
      slug: "sarangkot-sunrise-hike",
      description:
        "Early morning hike to Sarangkot for a stunning sunrise over the Annapurna range.",
      images: [""],
      latitude: 28.223,
      longitude: 83.94,
      difficulty: "Medium",
      duration: "2–3 hours",
      highlights: [
        "Sunrise view",
        "Photography spots",
        "Local village experience",
      ],
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
      highlights: [
        "Shiva Lingam",
        "Waterfall inside cave",
        "Spiritual experience",
      ],
      bookingInfo: "Free entry, donations accepted",
      placeId: null,
    },
    {
      name: "Trekking around Annapurna Base",
      slug: "annapurna-base-trek",
      description:
        "Start point for Annapurna Base Camp trekking with scenic landscapes.",
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
      images: [
        "/pokhara/accommodations/temple-tree-resort1.jpg",
        "/pokhara/accommodations/temple-tree-resort2.webp",
        "/pokhara/accommodations/temple-tree-resort3.webp",
        "/pokhara/accommodations/temple-tree-resort4.webp",
      ],
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
      description:
        "Affordable hotel with rooftop restaurant and mountain views.",
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
      description:
        "Luxury resort directly on the lake with stunning sunset views.",
      images: [""],
      price: 180.0,
      latitude: 28.21,
      longitude: 83.986,
      amenities: ["Pool", "Spa", "Restaurant", "Lakeside terrace"],
      roomTypes: ["Deluxe", "Suite", "Villa"],
      rating: 4.9,
      placeId: null,
    },
    {
      name: "Pokhara Inn",
      slug: "pokhara-inn",
      description:
        "Comfortable mid-range hotel with easy access to lakeside attractions.",
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
      reviews: [],
      rating: null,
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
      reviews: [],
      rating: null,
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
      reviews: [],
      rating: null,
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
      reviews: [],
      rating: null,
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
      reviews: [],
      rating: null,
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
      reviews: [],
      rating: null,
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
      reviews: [],
      rating: null,
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
      { name: "Cappuccino", description: "Rich espresso with milk foam", price: 450, category: "Beverage", image: "/pokhara/cafes/foods/cappucino.jpeg"},
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
    reviews: [],
    rating: null,
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
    reviews: [],
    rating: null,
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
    reviews: [],
    rating: null,
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
    reviews: [],
    rating: null,
    placeId: null,
  },
];


const pokharaItineraries = [
    {
      name: "Sunrise Peaks & Lakeside Nights",
      title: "Pokhara: Sunrise Peaks & Lakeside Nights",
      tagline: "Sarangkot dawn, Peace Pagoda glow, and Phewa’s mirror lake.",
      slug: "pokhara-sunrise-peaks-lakeside-nights",
      description:
        "A refined two-day escape for travelers who want the essentials done right. Catch the Annapurna range ignite at dawn from Sarangkot, glide across Phewa Lake, and wander the quiet trails to the World Peace Pagoda before a slow-burn evening on Lakeside.",
      images: [
          "/pokhara/itineraries/sunrisepeaks1.jpeg",
          "/pokhara/itineraries/sunrisepeaks2.webp",
          "/pokhara/itineraries/sunrisepeaks3.webp",
          "/pokhara/itineraries/sunrisepeaks4.jpg",
          "/pokhara/itineraries/sunrisepeaks5.webp",
      ],
      gallery: [
        "/pokhara/itineraries/sunrisepeaks/lakeside1.jpeg",
        "/pokhara/itineraries/sunrisepeaks/lakeside2.jpg",
        "/pokhara/itineraries/sunrisepeaks/lakeside3.webp",
        "/pokhara/itineraries/sunrisepeaks/lakeside4.jpg",
        "/pokhara/itineraries/sunrisepeaks/lakeside5.jpg",
        "/pokhara/itineraries/sunrisepeaks/lakeside6.jpg",
      ],
      durationDays: 2,
      durationNights: 1,
      difficulty: "Easy",
      languages: ["English", "Nepali"],
      highlights: [
        "Sarangkot sunrise over Annapurna and Machhapuchhre",
        "Boat glide across Phewa Lake to Tal Barahi",
        "World Peace Pagoda ridge walk",
        "Golden-hour Lakeside promenade"
      ],
      inclusions: [
        "1 night hotel (Lakeside, double/twin)",
        "Breakfast on Day 2",
        "Private in-city transport",
        "Local trip leader/guide"
      ],
      exclusions: [
        "Lunches & Dinners",
        "Entry fees & boating tickets",
        "Travel insurance",
        "Tips & personal expenses"
      ],
      meetingPoint: "Hotel lobby at Lakeside, Pokhara",
      endPoint: "Lakeside, Pokhara",
      pickupIncluded: true,
      whatToBring: ["Comfortable walking shoes", "Light jacket", "Sunscreen", "Camera"],
      safetyNotes: ["Early morning roads can be foggy; follow guide instructions.", "Stay hydrated during walks."],
      basePrice: 6900,
      currency: "NPR",
      pricingTiers: [
        { label: "Adult", price: 6900 },
        { label: "Child (6–11)", price: 4800 }
      ],
      seasonalRates: [
        { start: "2025-10-01", end: "2025-12-15", multiplier: 1.1 }
      ],
      availableMonths: ["Jan","Feb","Mar","Oct","Nov","Dec"],
      minGroupSize: 1,
      maxGroupSize: 20,
      bookingCutoffHrs: 24,
      cancellationPolicy: "Free cancellation up to 48 hours before start.",
      faq: [
        { q: "Is boating included?", a: "Tickets are not included; the guide assists with purchase on-site." },
        { q: "Can we add paragliding?", a: "Yes as an add-on if slots are available; fees apply." }
      ],
      placeId: null,
      days: {
        create: [
          {
            dayNumber: 1,
            title: "Lakeside Welcome & Phewa Calm",
            summary: "Arrive, settle in, and take a gentle boat ride to Tal Barahi before a golden-hour lakeside walk.",
            activities: ["Hotel check-in", "Boat to Tal Barahi Temple", "Lakeside market walk"],
            meals: { breakfast: false, lunch: false, dinner: false },
            accommodation: "3★ Lakeside hotel (private bath)",
            transport: "Private car",
            images: [],
            mapPoints: []
          },
          {
            dayNumber: 2,
            title: "Sarangkot Dawn & Peace Pagoda Ridge",
            summary: "Watch the range ignite at sunrise, then glide to the Peace Pagoda trail for sweeping valley views.",
            activities: ["Pre-dawn drive to Sarangkot", "Sunrise viewpoint", "Breakfast", "Peace Pagoda ridge walk", "Drop-off"],
            meals: { breakfast: true, lunch: false, dinner: false },
            accommodation: null,
            transport: "Private car",
            images: [],
            mapPoints: []
          }
        ]
      },
      departures: {
        create: [
          { date: new Date("2025-10-05T06:00:00+05:45"), startTime: "06:00", status: "OPEN", seatsTotal: 18, seatsAvailable: 18 },
          { date: new Date("2025-11-12T06:00:00+05:45"), startTime: "06:00", status: "OPEN", seatsTotal: 18, seatsAvailable: 13 }
        ]
      }
    },

    {
      name: "Skyglide & Stone Caves",
      title: "Pokhara Skyglide & Stone Caves: Adventure & Culture in Three Days",
      tagline: "Paragliding thermals, zipline rush, and underground river echoes.",
      slug: "pokhara-skyglide-stone-caves",
      description:
        "Three crisp days stitched with altitude and culture. Float with eagles over the valley, rip down a world-class zipline, then step into the cool hush of Gupteshwor Cave and the roar of Davis Falls. Evenings? Soft lights on Lakeside and unhurried food.",
      images: [],
      gallery: [],
      durationDays: 3,
      durationNights: 2,
      difficulty: "Moderate",
      languages: ["English", "Nepali"],
      highlights: [
        "Paragliding from Sarangkot (tandem)",
        "High-speed zipline panorama",
        "Gupteshwor Cave & Davis Falls",
        "International Mountain Museum"
      ],
      inclusions: [
        "2 nights hotel (Lakeside, double/twin)",
        "Daily breakfast",
        "Airport/hotel transfers",
        "Guide for cultural sites"
      ],
      exclusions: [
        "Adventure tickets (paragliding, zipline)",
        "Lunches & dinners",
        "Insurance & personal expenses"
      ],
      meetingPoint: "Pokhara Airport or Lakeside hotel",
      endPoint: "Lakeside, Pokhara",
      pickupIncluded: true,
      whatToBring: ["Sport shoes", "Windbreaker", "Sunglasses"],
      safetyNotes: ["Adventure ops weather-dependent; schedule may shift.", "Respect cave footing; it can be slippery."],
      basePrice: 9800,
      currency: "NPR",
      pricingTiers: [
        { label: "Adult", price: 9800 },
        { label: "Child (6–11)", price: 7200 }
      ],
      seasonalRates: [
        { start: "2025-03-01", end: "2025-05-30", multiplier: 1.2 }
      ],
      availableMonths: ["Mar","Apr","May","Sep","Oct","Nov"],
      minGroupSize: 1,
      maxGroupSize: 15,
      bookingCutoffHrs: 24,
      cancellationPolicy: "50% refund if cancelled 72 hours prior.",
      faq: [
        { q: "Is paragliding included?", a: "No. We pre-arrange slots on request; you pay the operator directly." },
        { q: "Do I need experience?", a: "No. Tandem flights and zipline accept beginners." }
      ],
      placeId: null,
      days: {
        create: [
          {
            dayNumber: 1,
            title: "Lakeside Warm-Up",
            summary: "Touch down, shake off the transit, and ease into Lakeside vibes.",
            activities: ["Airport pickup", "Hotel check-in", "Evening Lakeside walk"],
            meals: { breakfast: false, lunch: false, dinner: false },
            accommodation: "3★ Lakeside hotel",
            transport: "Private car",
            images: []
          },
          {
            dayNumber: 2,
            title: "Sky Day",
            summary: "Paragliding flight and zipline surge with valley-wide views.",
            activities: ["Paragliding from Sarangkot", "Zipline session", "Free time for café crawl"],
            meals: { breakfast: true, lunch: false, dinner: false },
            accommodation: "3★ Lakeside hotel",
            transport: "Private car",
            images: []
          },
          {
            dayNumber: 3,
            title: "Stone & Story",
            summary: "Caves, cascades, and a museum that frames the mountains’ story.",
            activities: ["Gupteshwor Cave", "Davis Falls", "International Mountain Museum", "Departure"],
            meals: { breakfast: true, lunch: false, dinner: false },
            accommodation: null,
            transport: "Private car",
            images: []
          }
        ]
      },
      departures: {
        create: [
          { date: new Date("2025-03-15T08:00:00+05:45"), startTime: "08:00", status: "OPEN", seatsTotal: 14, seatsAvailable: 10 },
          { date: new Date("2025-04-20T08:00:00+05:45"), startTime: "08:00", status: "OPEN", seatsTotal: 14, seatsAvailable: 8 }
        ]
      }
    },

    {
      name: "Ridge Trails & Teahouse Evenings",
      title: "Ridge Trails & Teahouse Evenings: Australian Camp Short Trek",
      tagline: "A gentle ridge walk with wide Himalayan windows.",
      slug: "pokhara-ridge-trails-teahouse-evenings",
      description:
        "Four unhurried days. A soft trek to Australian Camp with terrace views, teahouse warmth, and a cultural night back in Pokhara. Built for first-time trekkers and photo-lovers who want the mountain feel without the grind.",
      images: [],
      gallery: [],
      durationDays: 4,
      durationNights: 3,
      difficulty: "Moderate",
      languages: ["English", "Nepali"],
      highlights: [
        "Short trek Kande → Australian Camp",
        "Teahouse sunset & dawn light",
        "Cultural show back in Pokhara",
        "Easy trails, big views"
      ],
      inclusions: [
        "3 nights (2× hotel, 1× teahouse)",
        "Daily breakfast",
        "Private transfers to/from trailhead",
        "Trekking guide"
      ],
      exclusions: [
        "Lunches & dinners",
        "Permits if applicable",
        "Personal trekking gear"
      ],
      meetingPoint: "Lakeside hotel lobby",
      endPoint: "Lakeside, Pokhara",
      pickupIncluded: true,
      whatToBring: ["Trekking shoes", "Light fleece", "Rain layer (seasonal)"],
      safetyNotes: ["Trail can be slick after rain; use trekking poles if needed."],
      basePrice: 13900,
      currency: "NPR",
      pricingTiers: [
        { label: "Adult", price: 13900 },
        { label: "Child (6–11)", price: 10400 }
      ],
      seasonalRates: [
        { start: "2025-09-01", end: "2025-11-30", multiplier: 1.2 }
      ],
      availableMonths: ["Feb","Mar","Apr","Oct","Nov"],
      minGroupSize: 2,
      maxGroupSize: 12,
      bookingCutoffHrs: 48,
      cancellationPolicy: "Non-refundable within 7 days of departure.",
      faq: [
        { q: "Beginner friendly?", a: "Yes, daily walking 2–4 hours with gentle gradients." }
      ],
      placeId: null,
      days: {
        create: [
          {
            dayNumber: 1,
            title: "Arrive & Unwind",
            summary: "Settle by the lake and prep for the ridge walk.",
            activities: ["Check-in", "Gear check", "Optional boating"],
            meals: { breakfast: false, lunch: false, dinner: false },
            accommodation: "3★ Lakeside hotel",
            transport: "Private car",
            images: []
          },
          {
            dayNumber: 2,
            title: "Kande to Australian Camp",
            summary: "Drive to Kande and walk the ridge to Australian Camp.",
            activities: ["Drive to Kande (1 hr)", "Trek 2–3 hrs", "Teahouse sunset"],
            meals: { breakfast: true, lunch: false, dinner: false },
            accommodation: "Teahouse (private room where available)",
            transport: "Private jeep",
            images: []
          },
          {
            dayNumber: 3,
            title: "Descend & Culture Night",
            summary: "Walk back to Kande, return to Pokhara for a culture show.",
            activities: ["Trek back 2 hrs", "Drive to Pokhara", "Cultural show & dinner (own expense)"],
            meals: { breakfast: true, lunch: false, dinner: false },
            accommodation: "3★ Lakeside hotel",
            transport: "Private jeep",
            images: []
          },
          {
            dayNumber: 4,
            title: "Slow Morning & Depart",
            summary: "Free time for coffee and lake air before check-out.",
            activities: ["Breakfast", "Shopping", "Departure"],
            meals: { breakfast: true, lunch: false, dinner: false },
            accommodation: null,
            transport: "Private car",
            images: []
          }
        ]
      },
      departures: {
        create: [
          { date: new Date("2025-10-10T07:00:00+05:45"), startTime: "07:00", status: "OPEN", seatsTotal: 12, seatsAvailable: 12 },
          { date: new Date("2025-11-15T07:00:00+05:45"), startTime: "07:00", status: "OPEN", seatsTotal: 12, seatsAvailable: 9 }
        ]
      }
    },

    {
      name: "Lakes, Falls & Pagoda Glow",
      title: "Lakes, Falls & Pagoda Glow: Pokhara Essentials in a Day",
      tagline: "A compact day with all-killer-no-filler stops.",
      slug: "pokhara-lakes-falls-pagoda-glow",
      description:
        "Short on time, big on coverage. Glide on Phewa, tap Tal Barahi, feel the spray at Davis Falls, and climb to the Peace Pagoda ridge for that honeyed afternoon light. Perfect as a smart day-tour bolt-on.",
      images: [],
      gallery: [],
      durationDays: 1,
      durationNights: 0,
      difficulty: "Easy",
      languages: ["English", "Nepali"],
      highlights: [
        "Phewa Lake boat ride",
        "Tal Barahi Temple",
        "Davis Falls & Gupteshwor Cave",
        "World Peace Pagoda"
      ],
      inclusions: [
        "Private vehicle & driver",
        "Local guide",
        "Bottled water"
      ],
      exclusions: [
        "Entry & boat tickets",
        "Meals",
        "Insurance"
      ],
      meetingPoint: "Lakeside hotels or designated pickup points",
      endPoint: "Lakeside, Pokhara",
      pickupIncluded: true,
      whatToBring: ["Cap/hat", "Sunscreen", "Comfortable sandals/shoes"],
      safetyNotes: ["Stairs at Pagoda and Temple; take it steady."],
      basePrice: 4200,
      currency: "NPR",
      pricingTiers: [
        { label: "Adult", price: 4200 },
        { label: "Child (6–11)", price: 3000 }
      ],
      seasonalRates: [],
      availableMonths: ["All Year"],
      minGroupSize: 1,
      maxGroupSize: 20,
      bookingCutoffHrs: 12,
      cancellationPolicy: "Free cancellation up to 24 hours before start.",
      faq: [],
      placeId: null,
      days: {
        create: [
          {
            dayNumber: 1,
            title: "Essentials Circuit",
            summary: "Hit the core sights in a single clean loop.",
            activities: ["Pickup", "Phewa boat & Tal Barahi", "Davis Falls", "Gupteshwor Cave", "Peace Pagoda ridge", "Drop-off"],
            meals: { breakfast: false, lunch: false, dinner: false },
            accommodation: null,
            transport: "Private car",
            images: []
          }
        ]
      },
      departures: {
        create: [
          { date: new Date("2025-09-20T08:30:00+05:45"), startTime: "08:30", status: "OPEN", seatsTotal: 20, seatsAvailable: 20, priceOverride: 4500 },
          { date: new Date("2025-10-05T08:30:00+05:45"), startTime: "08:30", status: "OPEN", seatsTotal: 20, seatsAvailable: 16 }
        ]
      }
    }
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
