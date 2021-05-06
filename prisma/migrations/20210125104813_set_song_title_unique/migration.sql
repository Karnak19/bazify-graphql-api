/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[title]` on the table `songs`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "songs.title_unique" ON "songs"("title");
