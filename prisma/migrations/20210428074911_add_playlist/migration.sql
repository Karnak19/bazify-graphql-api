-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "playlistId" TEXT;

-- CreateTable
CREATE TABLE "playlists" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "playlists.title_unique" ON "playlists"("title");

-- AddForeignKey
ALTER TABLE "songs" ADD FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
