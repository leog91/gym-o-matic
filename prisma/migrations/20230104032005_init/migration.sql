/*
  Warnings:

  - You are about to drop the column `id` on the `Exercise` table. All the data in the column will be lost.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Exercise" (
    "id2" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id2")
);
INSERT INTO "_prisma_new_Exercise" ("createdAt","name","updatedAt") SELECT "createdAt","name","updatedAt" FROM "Exercise";
DROP TABLE "Exercise" CASCADE;
ALTER TABLE "_prisma_new_Exercise" RENAME TO "Exercise";
