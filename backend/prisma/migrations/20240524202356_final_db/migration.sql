/*
  Warnings:

  - You are about to drop the column `score` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "score",
ADD COLUMN     "isSubmitted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "marksObtained" INTEGER,
ADD COLUMN     "totalScore" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
