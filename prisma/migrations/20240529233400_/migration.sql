/*
  Warnings:

  - You are about to drop the column `name` on the `Candidate` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Candidate_name_key";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "name";
