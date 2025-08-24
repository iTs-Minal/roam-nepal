/*
  Warnings:

  - You are about to drop the column `name` on the `Itinerary` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `days` on the `Itinerary` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Itinerary" DROP COLUMN "name",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "days",
ADD COLUMN     "days" JSONB NOT NULL;
