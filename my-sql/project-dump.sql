CREATE DATABASE IF NOT EXISTS `electionsystem`;
USE `electionsystem`;

DROP TABLE IF EXISTS Semester;
CREATE TABLE Semester (
	`id` int(11) NOT NULL DEFAULT '0',
	`creation_date` DATE,
	`winter_semester`VARCHAR (20) NOT NULL DEFAULT '',
	`submit_projects_end_date` DATE,
	`grading_end_date` DATE,
    PRIMARY KEY(`id`));

