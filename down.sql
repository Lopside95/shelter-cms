-- DropForeignKey
ALTER TABLE `Animal` DROP FOREIGN KEY `Animal_shelter_id_fkey`;

-- AlterTable
ALTER TABLE `Animal` ADD COLUMN `shelter_name` VARCHAR(255) NOT NULL,
    MODIFY `species` varchar(255) NOT NULL,
    MODIFY `shelter_id` int NOT NULL;

-- CreateIndex
CREATE INDEX `Animal_shelter_id_fkey` ON `Animal`(`shelter_id` ASC);

-- CreateIndex
CREATE INDEX `Food_shelter_id_fkey` ON `Food`(`shelter_id` ASC);

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_shelter_id_fkey` FOREIGN KEY (`shelter_id`) REFERENCES `Shelter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

