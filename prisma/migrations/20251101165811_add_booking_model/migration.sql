/*
  Warnings:

  - You are about to drop the column `bookingCode` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `cancellationReason` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `departureId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDetails` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `specialRequests` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `travelersCount` on the `Booking` table. All the data in the column will be lost.
  - The `status` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `bookingId` on the `Traveler` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,placeId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,activityId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,religiousSiteId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,cafeId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,itineraryId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,accommodationId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accommodationId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkInDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkOutDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guests` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('pending', 'approved', 'rejected');

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_departureId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Traveler" DROP CONSTRAINT "Traveler_bookingId_fkey";

-- DropIndex
DROP INDEX "public"."Booking_bookingCode_key";

-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "bookingCode",
DROP COLUMN "cancellationReason",
DROP COLUMN "currency",
DROP COLUMN "departureId",
DROP COLUMN "notes",
DROP COLUMN "paymentDetails",
DROP COLUMN "paymentMethod",
DROP COLUMN "paymentStatus",
DROP COLUMN "specialRequests",
DROP COLUMN "totalPrice",
DROP COLUMN "travelersCount",
ADD COLUMN     "accommodationId" INTEGER NOT NULL,
ADD COLUMN     "checkInDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkOutDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "guests" INTEGER NOT NULL,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "roomId" INTEGER,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."BookingStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "public"."Traveler" DROP COLUMN "bookingId";

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_placeId_key" ON "public"."Review"("userId", "placeId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_activityId_key" ON "public"."Review"("userId", "activityId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_religiousSiteId_key" ON "public"."Review"("userId", "religiousSiteId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_cafeId_key" ON "public"."Review"("userId", "cafeId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_itineraryId_key" ON "public"."Review"("userId", "itineraryId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_accommodationId_key" ON "public"."Review"("userId", "accommodationId");

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "public"."Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
