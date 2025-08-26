/*
  Warnings:

  - The primary key for the `ReligiousSite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `latitude` on the `ReligiousSite` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `ReligiousSite` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `ReligiousSite` table. All the data in the column will be lost.
  - You are about to drop the column `visitingHours` on the `ReligiousSite` table. All the data in the column will be lost.
  - Added the required column `location` to the `ReligiousSite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ReligiousSite` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."ReligiousSite_slug_key";

-- AlterTable
ALTER TABLE "public"."Place" ADD COLUMN     "bestTime" TEXT,
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "history" TEXT,
ADD COLUMN     "howToReach" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "tips" TEXT,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."ReligiousSite" DROP CONSTRAINT "ReligiousSite_pkey",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "slug",
DROP COLUMN "visitingHours",
ADD COLUMN     "accessibility" JSONB,
ADD COLUMN     "bestTimeToVisit" TEXT,
ADD COLUMN     "contactInfo" JSONB,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dressCode" TEXT,
ADD COLUMN     "entryFee" JSONB,
ADD COLUMN     "facilities" JSONB,
ADD COLUMN     "festivals" JSONB,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "nearbyAttractions" TEXT,
ADD COLUMN     "openingHours" TEXT,
ADD COLUMN     "photography" TEXT,
ADD COLUMN     "reviews" JSONB,
ADD COLUMN     "safetyGuidelines" TEXT[],
ADD COLUMN     "significance" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ReligiousSite_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ReligiousSite_id_seq";
