-- AlterTable
ALTER TABLE `Animal` DROP COLUMN `image`;

-- CreateIndex
CREATE INDEX `Animal_shelter_id_fkey` ON `Animal`(`shelter_id` ASC);

-- CreateIndex
CREATE INDEX `Food_shelter_id_fkey` ON `Food`(`shelter_id` ASC);

