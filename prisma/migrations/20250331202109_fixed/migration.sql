/*
  Warnings:

  - You are about to drop the column `carbsPercentage` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the column `fatsPercentage` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the column `proteinPercentage` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `MealPlan` table. All the data in the column will be lost.
  - The `calories` column on the `MealPlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `meals` column on the `MealPlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `priceINR` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `priceUSD` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `className` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `maxCapacity` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `trainer` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `certifications` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Trainer` table. All the data in the column will be lost.
  - The `experience` column on the `Trainer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MealPlanWithImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `MealPlan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,day]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Trainer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `MealPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trainer" DROP CONSTRAINT "Trainer_userId_fkey";

-- DropIndex
DROP INDEX "Trainer_userId_key";

-- AlterTable
ALTER TABLE "MealPlan" DROP COLUMN "carbsPercentage",
DROP COLUMN "createdAt",
DROP COLUMN "fatsPercentage",
DROP COLUMN "proteinPercentage",
DROP COLUMN "updatedAt",
ADD COLUMN     "carbs" INTEGER,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fat" INTEGER,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "protein" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "calories",
ADD COLUMN     "calories" INTEGER,
DROP COLUMN "meals",
ADD COLUMN     "meals" TEXT[];

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "createdAt",
DROP COLUMN "priceINR",
DROP COLUMN "priceUSD",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_popular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "duration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "className",
DROP COLUMN "createdAt",
DROP COLUMN "endTime",
DROP COLUMN "level",
DROP COLUMN "maxCapacity",
DROP COLUMN "startTime",
DROP COLUMN "trainer",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "max_participants" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "trainer_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Trainer" DROP COLUMN "certifications",
DROP COLUMN "createdAt",
DROP COLUMN "gender",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "specialization" DROP NOT NULL,
DROP COLUMN "experience",
ADD COLUMN     "experience" INTEGER;

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "MealPlanWithImage";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE UNIQUE INDEX "MealPlan_title_key" ON "MealPlan"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_name_key" ON "Membership"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_name_day_key" ON "Schedule"("name", "day");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_email_key" ON "Trainer"("email");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
