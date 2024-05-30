/*
  Warnings:

  - A unique constraint covering the columns `[firstName,lastName]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_firstName_lastName_key" ON "Candidate"("firstName", "lastName");
