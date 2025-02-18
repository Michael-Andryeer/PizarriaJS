/*
  Warnings:

  - You are about to drop the column `stauts` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "stauts",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;
