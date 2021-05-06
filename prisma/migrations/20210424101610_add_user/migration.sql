-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.pseudo_unique" ON "users"("pseudo");

-- AddForeignKey
ALTER TABLE "songs" ADD FOREIGN KEY("userId")REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
