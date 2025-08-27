/*
  Warnings:

  - The `rituals` column on the `ReligiousSite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `nearbyAttractions` column on the `ReligiousSite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `safetyGuidelines` column on the `ReligiousSite` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."ReligiousSite" ADD COLUMN     "rating" DOUBLE PRECISION,
DROP COLUMN "rituals",
ADD COLUMN     "rituals" JSONB,
DROP COLUMN "nearbyAttractions",
ADD COLUMN     "nearbyAttractions" JSONB,
DROP COLUMN "safetyGuidelines",
ADD COLUMN     "safetyGuidelines" JSONB;
