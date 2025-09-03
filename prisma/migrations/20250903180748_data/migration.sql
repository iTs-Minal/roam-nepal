/*
  Warnings:

  - You are about to drop the column `rules` on the `Itinerary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Departure" ADD COLUMN     "isInstantConfirm" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "startTime" TEXT;

-- AlterTable
ALTER TABLE "public"."Itinerary" DROP COLUMN "rules",
ADD COLUMN     "bookingCutoffHrs" INTEGER DEFAULT 24,
ADD COLUMN     "endPoint" TEXT,
ADD COLUMN     "gallery" TEXT[],
ADD COLUMN     "maxGroupSize" INTEGER DEFAULT 24,
ADD COLUMN     "meetingPoint" TEXT,
ADD COLUMN     "minGroupSize" INTEGER DEFAULT 1,
ADD COLUMN     "pickupIncluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "safetyNotes" TEXT[],
ADD COLUMN     "tagline" TEXT,
ADD COLUMN     "whatToBring" TEXT[];

-- AlterTable
ALTER TABLE "public"."ItineraryDay" ADD COLUMN     "images" TEXT[];
