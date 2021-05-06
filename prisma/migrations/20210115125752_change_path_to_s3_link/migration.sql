/*
  Warnings:

  - You are about to drop the column `path` on the `songs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "songs" DROP COLUMN "path",
ADD COLUMN     "s3_link" TEXT;
