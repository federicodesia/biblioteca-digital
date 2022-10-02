/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `UploadRequestState` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UploadRequestState_name_key` ON `UploadRequestState`(`name`);
