/*
  Warnings:

  - You are about to drop the column `chipNumber` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `shelterId` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `shelterId` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `itemName` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Shelter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chip_number]` on the table `Animal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chip_number` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shelter_id` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shelter_id` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Shelter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Animal` DROP FOREIGN KEY `Animal_shelterId_fkey`;

-- DropForeignKey
ALTER TABLE `Food` DROP FOREIGN KEY `Food_shelterId_fkey`;

-- DropIndex
DROP INDEX `Animal_chipNumber_key` ON `Animal`;

-- DropIndex
DROP INDEX `Animal_shelterId_fkey` ON `Animal`;

-- DropIndex
DROP INDEX `Food_shelterId_fkey` ON `Food`;

-- AlterTable
ALTER TABLE `Animal` DROP COLUMN `chipNumber`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `shelterId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `chip_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `shelter_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Food` DROP COLUMN `createdAt`,
    DROP COLUMN `shelterId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `shelter_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `createdAt`,
    DROP COLUMN `itemName`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `item_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Shelter` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Animal_chip_number_key` ON `Animal`(`chip_number`);

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_shelter_id_fkey` FOREIGN KEY (`shelter_id`) REFERENCES `Shelter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food` ADD CONSTRAINT `Food_shelter_id_fkey` FOREIGN KEY (`shelter_id`) REFERENCES `Shelter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
