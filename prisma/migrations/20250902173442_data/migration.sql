/*
  Warnings:

  - Added the required column `updatedAt` to the `Cafe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Cafe" ADD COLUMN     "contactInfo" JSONB,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "facilities" JSONB,
ADD COLUMN     "menu" JSONB,
ADD COLUMN     "nearbyAttractions" JSONB,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "reviews" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
