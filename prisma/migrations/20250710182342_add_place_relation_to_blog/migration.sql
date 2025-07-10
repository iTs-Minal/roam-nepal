-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "placeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
