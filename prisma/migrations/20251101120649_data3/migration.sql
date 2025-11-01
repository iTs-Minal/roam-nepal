/*
  Warnings:

  - You are about to drop the column `rating` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `totalReviews` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `reviews` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `reviews` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `reviews` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `ReligiousSite` table. All the data in the column will be lost.
  - You are about to drop the column `reviews` on the `ReligiousSite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Accommodation" DROP COLUMN "rating",
DROP COLUMN "totalReviews";

-- AlterTable
ALTER TABLE "public"."Activity" DROP COLUMN "rating",
DROP COLUMN "reviews";

-- AlterTable
ALTER TABLE "public"."Cafe" DROP COLUMN "rating",
DROP COLUMN "reviews";

-- AlterTable
ALTER TABLE "public"."Itinerary" DROP COLUMN "rating",
DROP COLUMN "reviews";

-- AlterTable
ALTER TABLE "public"."ReligiousSite" DROP COLUMN "rating",
DROP COLUMN "reviews";

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT,
    "userImage" TEXT,
    "placeId" INTEGER,
    "activityId" INTEGER,
    "itineraryId" INTEGER,
    "accommodationId" INTEGER,
    "religiousSiteId" INTEGER,
    "cafeId" INTEGER,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "public"."Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "public"."Itinerary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "public"."Accommodation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_religiousSiteId_fkey" FOREIGN KEY ("religiousSiteId") REFERENCES "public"."ReligiousSite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "public"."Cafe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
