/*
  Warnings:

  - Added the required column `condition` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shelter_name` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Animal` ADD COLUMN `condition` ENUM('HEALTHY', 'SICK', 'INJURED', 'DISABLED') NOT NULL,
    ADD COLUMN `shelter_name` VARCHAR(255) NOT NULL;
