/*
  Warnings:

  - Made the column `title` on table `songs` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `s3_link` on table `songs` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "albums" ALTER COLUMN "picture" DROP NOT NULL;

-- AlterTable
ALTER TABLE "artists" ALTER COLUMN "picture" DROP NOT NULL;

-- AlterTable
ALTER TABLE "songs" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "s3_link" SET NOT NULL;
