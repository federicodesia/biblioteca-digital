/*
  Warnings:

  - You are about to drop the `documentcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `documentcategory` DROP FOREIGN KEY `DocumentCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `documentcategory` DROP FOREIGN KEY `DocumentCategory_documentId_fkey`;

-- DropTable
DROP TABLE `documentcategory`;

-- CreateTable
CREATE TABLE `_CategoryToDocument` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToDocument_AB_unique`(`A`, `B`),
    INDEX `_CategoryToDocument_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryToDocument` ADD CONSTRAINT `_CategoryToDocument_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToDocument` ADD CONSTRAINT `_CategoryToDocument_B_fkey` FOREIGN KEY (`B`) REFERENCES `Document`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
