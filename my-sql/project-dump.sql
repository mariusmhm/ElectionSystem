CREATE DATABASE IF NOT EXISTS `electionsystem`;
USE `electionsystem`;

DROP TABLE IF EXISTS `Semester`;
CREATE TABLE `Semester` (
	`id` int(11) NOT NULL DEFAULT '0',
	`creation_date` DATE,
	`winter_semester` tinyint NOT NULL DEFAULT '0',
	`submit_projects_end_date` DATE,
	`grading_end_date` DATE,
    PRIMARY KEY(`id`)
    
);

INSERT INTO `Semester` VALUES (4, '2020-12-09', 0, '2019-05-02', '1990-02-09');