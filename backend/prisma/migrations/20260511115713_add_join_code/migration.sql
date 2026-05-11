/*
  Warnings:

  - A unique constraint covering the columns `[joinCode]` on the table `StudyGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `joinCode` to the `StudyGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudyGroup" ADD COLUMN     "joinCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StudyGroup_joinCode_key" ON "StudyGroup"("joinCode");
