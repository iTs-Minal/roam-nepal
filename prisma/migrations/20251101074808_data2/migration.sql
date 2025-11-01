/*
  Warnings:

  - You are about to drop the `AccommodationReview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AccommodationReview" DROP CONSTRAINT "AccommodationReview_accommodationId_fkey";

-- DropTable
DROP TABLE "public"."AccommodationReview";
