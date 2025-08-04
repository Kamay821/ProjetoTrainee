-- CreateTable
CREATE TABLE `Game` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,

    UNIQUE INDEX `Game_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
