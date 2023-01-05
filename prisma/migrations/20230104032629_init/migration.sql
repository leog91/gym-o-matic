/*
  Warnings:

  - You are about to alter the column `id` on the `Exercise` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Exercise" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Exercise" ("createdAt","id","name","updatedAt") SELECT "createdAt","id","name","updatedAt" FROM "Exercise";
DROP TABLE "Exercise" CASCADE;
ALTER TABLE "_prisma_new_Exercise" RENAME TO "Exercise";
