/*
  Warnings:

  - Added the required column `name` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Accommodation" DROP CONSTRAINT "Accommodation_placeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Activity" DROP CONSTRAINT "Activity_placeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Cafe" DROP CONSTRAINT "Cafe_placeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Itinerary" DROP CONSTRAINT "Itinerary_placeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReligiousSite" DROP CONSTRAINT "ReligiousSite_placeId_fkey";

-- AlterTable
ALTER TABLE "public"."Accommodation" ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "roomTypes" TEXT[],
ALTER COLUMN "placeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Activity" ADD COLUMN     "bookingInfo" TEXT,
ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "highlights" TEXT[],
ALTER COLUMN "placeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Cafe" ADD COLUMN     "ambiance" TEXT[],
ADD COLUMN     "specialties" TEXT[],
ALTER COLUMN "placeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Itinerary" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "placeId" DROP NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "days" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."ReligiousSite" ADD COLUMN     "history" TEXT,
ADD COLUMN     "rituals" TEXT[],
ADD COLUMN     "visitingHours" TEXT,
ALTER COLUMN "placeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Accommodation" ADD CONSTRAINT "Accommodation_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReligiousSite" ADD CONSTRAINT "ReligiousSite_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cafe" ADD CONSTRAINT "Cafe_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Itinerary" ADD CONSTRAINT "Itinerary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
