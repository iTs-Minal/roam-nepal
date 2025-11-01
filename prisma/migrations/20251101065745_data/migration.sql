-- AlterTable
ALTER TABLE "public"."Accommodation" ADD COLUMN     "accessibility" TEXT[],
ADD COLUMN     "address" TEXT,
ADD COLUMN     "cancellationPolicy" TEXT,
ADD COLUMN     "checkInTime" TEXT DEFAULT '14:00',
ADD COLUMN     "checkOutTime" TEXT DEFAULT '12:00',
ADD COLUMN     "childPolicy" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "currency" TEXT DEFAULT 'USD',
ADD COLUMN     "discountPrice" DOUBLE PRECISION,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "mapLink" TEXT,
ADD COLUMN     "nearbyAttractions" TEXT[],
ADD COLUMN     "petPolicy" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "services" TEXT[],
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "starCategory" INTEGER,
ADD COLUMN     "totalReviews" INTEGER DEFAULT 0,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateTable
CREATE TABLE "public"."Room" (
    "id" SERIAL NOT NULL,
    "accommodationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[],
    "pricePerNight" DOUBLE PRECISION NOT NULL,
    "maxGuests" INTEGER,
    "bedType" TEXT,
    "amenities" TEXT[],
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AccommodationReview" (
    "id" SERIAL NOT NULL,
    "accommodationId" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccommodationReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "public"."Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AccommodationReview" ADD CONSTRAINT "AccommodationReview_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "public"."Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
