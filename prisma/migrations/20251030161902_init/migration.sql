-- CreateTable
CREATE TABLE "public"."Place" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "history" TEXT,
    "bestTime" TEXT,
    "location" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "highlights" TEXT[],
    "tips" TEXT,
    "howToReach" TEXT,
    "images" TEXT[],

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortIntro" TEXT,
    "images" TEXT[],
    "gallery" TEXT[],
    "videoUrl" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "difficulty" TEXT,
    "duration" TEXT,
    "bestSeason" TEXT,
    "altitudeRange" TEXT,
    "ageLimit" TEXT,
    "highlights" TEXT[],
    "inclusions" TEXT[],
    "exclusions" TEXT[],
    "safetyNotes" TEXT[],
    "equipment" TEXT[],
    "requirements" TEXT[],
    "faq" JSONB,
    "reviews" JSONB,
    "rating" DOUBLE PRECISION,
    "bookingInfo" TEXT,
    "basePrice" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'NPR',
    "priceTiers" JSONB,
    "cancellationPolicy" TEXT,
    "placeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Itinerary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "gallery" TEXT[],
    "durationDays" INTEGER NOT NULL,
    "durationNights" INTEGER NOT NULL,
    "difficulty" TEXT,
    "languages" TEXT[],
    "highlights" TEXT[],
    "inclusions" TEXT[],
    "exclusions" TEXT[],
    "meetingPoint" TEXT,
    "endPoint" TEXT,
    "pickupIncluded" BOOLEAN NOT NULL DEFAULT false,
    "whatToBring" TEXT[],
    "safetyNotes" TEXT[],
    "basePrice" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NPR',
    "pricingTiers" JSONB,
    "seasonalRates" JSONB,
    "availableMonths" TEXT[],
    "minGroupSize" INTEGER DEFAULT 1,
    "maxGroupSize" INTEGER DEFAULT 24,
    "bookingCutoffHrs" INTEGER DEFAULT 24,
    "cancellationPolicy" TEXT,
    "faq" JSONB,
    "rating" DOUBLE PRECISION,
    "reviews" JSONB,
    "placeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ItineraryDay" (
    "id" SERIAL NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "activities" TEXT[],
    "meals" JSONB,
    "accommodation" TEXT,
    "transport" TEXT,
    "images" TEXT[],
    "mapPoints" JSONB,
    "itineraryId" INTEGER NOT NULL,

    CONSTRAINT "ItineraryDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Departure" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "seatsTotal" INTEGER NOT NULL,
    "seatsAvailable" INTEGER NOT NULL,
    "priceOverride" DOUBLE PRECISION,
    "notes" TEXT,
    "isInstantConfirm" BOOLEAN NOT NULL DEFAULT true,
    "itineraryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Departure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" SERIAL NOT NULL,
    "bookingCode" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPhone" TEXT,
    "travelersCount" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NPR',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentStatus" TEXT NOT NULL DEFAULT 'UNPAID',
    "paymentMethod" TEXT,
    "paymentDetails" JSONB,
    "notes" TEXT,
    "specialRequests" TEXT,
    "cancellationReason" TEXT,
    "departureId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Traveler" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "nationality" TEXT,
    "passportNo" TEXT,
    "dietaryNeeds" TEXT,
    "medicalNotes" TEXT,
    "emergencyContact" JSONB,
    "bookingId" INTEGER NOT NULL,

    CONSTRAINT "Traveler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Accommodation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "price" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "amenities" TEXT[],
    "roomTypes" TEXT[],
    "rating" DOUBLE PRECISION,
    "placeId" INTEGER,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReligiousSite" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "history" TEXT,
    "significance" TEXT,
    "openingHours" TEXT,
    "entryFee" JSONB,
    "dressCode" TEXT,
    "photography" TEXT,
    "bestTimeToVisit" TEXT,
    "nearbyAttractions" JSONB,
    "facilities" JSONB,
    "festivals" JSONB,
    "rituals" JSONB,
    "images" TEXT[],
    "contactInfo" JSONB,
    "accessibility" JSONB,
    "safetyGuidelines" JSONB,
    "reviews" JSONB,
    "rating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "placeId" INTEGER,

    CONSTRAINT "ReligiousSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cafe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "openingTime" TEXT,
    "closingTime" TEXT,
    "specialties" TEXT[],
    "ambiance" TEXT[],
    "menu" JSONB,
    "facilities" JSONB,
    "contactInfo" JSONB,
    "nearbyAttractions" JSONB,
    "placeId" INTEGER,
    "reviews" JSONB,
    "rating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cafe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "images" TEXT[],
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "placeId" INTEGER,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ActivityItineraries" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ActivityItineraries_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_slug_key" ON "public"."Place"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_slug_key" ON "public"."Activity"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Itinerary_slug_key" ON "public"."Itinerary"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingCode_key" ON "public"."Booking"("bookingCode");

-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_slug_key" ON "public"."Accommodation"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ReligiousSite_slug_key" ON "public"."ReligiousSite"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_slug_key" ON "public"."Cafe"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "public"."Blog"("slug");

-- CreateIndex
CREATE INDEX "_ActivityItineraries_B_index" ON "public"."_ActivityItineraries"("B");

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Itinerary" ADD CONSTRAINT "Itinerary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ItineraryDay" ADD CONSTRAINT "ItineraryDay_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "public"."Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Departure" ADD CONSTRAINT "Departure_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "public"."Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "public"."Departure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Traveler" ADD CONSTRAINT "Traveler_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Accommodation" ADD CONSTRAINT "Accommodation_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReligiousSite" ADD CONSTRAINT "ReligiousSite_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cafe" ADD CONSTRAINT "Cafe_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActivityItineraries" ADD CONSTRAINT "_ActivityItineraries_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActivityItineraries" ADD CONSTRAINT "_ActivityItineraries_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
