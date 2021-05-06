-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isOAuth" BOOLEAN DEFAULT false,
ALTER COLUMN "password" DROP NOT NULL;
