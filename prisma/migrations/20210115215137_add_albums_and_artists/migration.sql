-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "artistId" TEXT,
ADD COLUMN     "albumId" TEXT;

-- CreateTable
CREATE TABLE "artists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "albums" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "artistId" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "albums" ADD FOREIGN KEY("artistId")REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD FOREIGN KEY("artistId")REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD FOREIGN KEY("albumId")REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE CASCADE;
