-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "MealPlanWithImage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "calories" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "proteinPercentage" TEXT NOT NULL,
    "carbsPercentage" TEXT NOT NULL,
    "fatsPercentage" TEXT NOT NULL,
    "meals" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealPlanWithImage_pkey" PRIMARY KEY ("id")
);
