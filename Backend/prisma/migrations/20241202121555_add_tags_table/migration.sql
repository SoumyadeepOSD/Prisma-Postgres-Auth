/*
  Warnings:

  - You are about to drop the column `dropdown` on the `tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tag" DROP COLUMN "dropdown",
ADD COLUMN     "field_type" TEXT NOT NULL DEFAULT 'text';
