-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'asked', 'accepted', 'answered', 'rejected');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';
