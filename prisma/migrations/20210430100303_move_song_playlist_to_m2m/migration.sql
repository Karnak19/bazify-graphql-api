/*
  Warnings:

  - You are about to drop the column `playlistId` on the `songs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_playlistId_fkey";

-- AlterTable
ALTER TABLE "songs" DROP COLUMN "playlistId";

-- CreateTable
CREATE TABLE "_playlistsTosongs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_playlistsTosongs_AB_unique" ON "_playlistsTosongs"("A", "B");

-- CreateIndex
CREATE INDEX "_playlistsTosongs_B_index" ON "_playlistsTosongs"("B");

-- AddForeignKey
ALTER TABLE "_playlistsTosongs" ADD FOREIGN KEY ("A") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_playlistsTosongs" ADD FOREIGN KEY ("B") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
