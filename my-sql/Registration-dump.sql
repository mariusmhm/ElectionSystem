CREATE DATABASE IF NOT EXISTS `electionsystem`;
USE `electionsystem`;


DROP TABLE IF EXISTS `Module`;
CREATE TABLE `Module` (
	`id` int(11) NOT NULL DEFAULT '0',
	`creation_date` DATE,
	`name` VARCHAR(30),
	`edv_number` VARCHAR(11) NOT NULL DEFAULT '0',
    PRIMARY KEY(`id`)
);

INSERT INTO Module VALUES (1, '1863-04-01',  "Schlüsselkompetenz", "1234");



