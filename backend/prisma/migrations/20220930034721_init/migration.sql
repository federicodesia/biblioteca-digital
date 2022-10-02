-- DropForeignKey
ALTER TABLE `uploadrequest` DROP FOREIGN KEY `UploadRequest_reviewedById_fkey`;

-- AlterTable
ALTER TABLE `uploadrequest` MODIFY `reviewedById` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `UploadRequest` ADD CONSTRAINT `UploadRequest_reviewedById_fkey` FOREIGN KEY (`reviewedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
