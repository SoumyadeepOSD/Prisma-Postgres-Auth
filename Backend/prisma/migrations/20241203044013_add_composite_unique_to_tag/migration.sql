/*
  Warnings:

  - A unique constraint covering the columns `[user_id,tag]` on the table `tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tag_user_id_tag_key" ON "tag"("user_id", "tag");
