/*
  Warnings:

  - Added the required column `dropdown` to the `tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "dropdown" BOOLEAN NOT NULL;
