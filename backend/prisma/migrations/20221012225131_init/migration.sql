/*
  Warnings:

  - You are about to drop the column `downloadsCount` on the `document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `document` DROP COLUMN `downloadsCount`,
    ADD COLUMN `downloads` INTEGER NOT NULL DEFAULT 0;
