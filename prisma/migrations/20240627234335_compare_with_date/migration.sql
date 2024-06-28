/*
  Warnings:

  - The `occurred_at` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "occurred_at",
ADD COLUMN     "occurred_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
