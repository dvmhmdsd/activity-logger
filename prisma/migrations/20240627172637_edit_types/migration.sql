/*
  Warnings:

  - Added the required column `action_object` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `object` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "action_object" TEXT NOT NULL,
ADD COLUMN     "object" TEXT NOT NULL,
ALTER COLUMN "occurred_at" SET DATA TYPE TEXT;
