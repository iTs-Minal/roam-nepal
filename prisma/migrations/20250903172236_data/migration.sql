/*
  Warnings:

  - You are about to drop the column `days` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Itinerary` table. All the data in the column will be lost.
  - Added the required column `basePrice` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationDays` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationNights` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Itinerary" DROP COLUMN "days",
DROP COLUMN "duration",
ADD COLUMN     "availableMonths" TEXT[],
ADD COLUMN     "basePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cancellationPolicy" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'NPR',
ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "durationDays" INTEGER NOT NULL,
ADD COLUMN     "durationNights" INTEGER NOT NULL,
ADD COLUMN     "exclusions" TEXT[],
ADD COLUMN     "faq" JSONB,
ADD COLUMN     "inclusions" TEXT[],
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "pricingTiers" JSONB,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "reviews" JSONB,
ADD COLUMN     "rules" JSONB,
ADD COLUMN     "seasonalRates" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

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
    "mapPoints" JSONB,
    "itineraryId" INTEGER NOT NULL,

    CONSTRAINT "ItineraryDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Departure" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "seatsTotal" INTEGER NOT NULL,
    "seatsAvailable" INTEGER NOT NULL,
    "priceOverride" DOUBLE PRECISION,
    "notes" TEXT,
    "itineraryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Departure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ItineraryDay" ADD CONSTRAINT "ItineraryDay_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "public"."Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Departure" ADD CONSTRAINT "Departure_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "public"."Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
