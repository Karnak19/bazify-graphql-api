/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[title]` on the table `albums`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[name]` on the table `artists`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "albums.title_unique" ON "albums"("title");

-- CreateIndex
CREATE UNIQUE INDEX "artists.name_unique" ON "artists"("name");
