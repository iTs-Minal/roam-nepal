/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ReligiousSite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `ReligiousSite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ReligiousSite" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReligiousSite_slug_key" ON "public"."ReligiousSite"("slug");
