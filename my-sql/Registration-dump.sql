CREATE DATABASE IF NOT EXISTS electionsystem;
USE electionsystem;

DROP TABLE IF EXISTS `Semester`;
CREATE TABLE `Semester` (
	`id` int(11) NOT NULL DEFAULT '0',
	`creation_date` DATE,
	`winter_semester` tinyint NOT NULL DEFAULT '0',
	`submit_projects_end_date` DATE,
	`grading_end_date` DATE,
  `submit_projects_beginn_date` DATE,
  `grading_beginn_date` DATE,
    PRIMARY KEY(`id`)
);

DROP TABLE IF EXISTS `Module`;
CREATE TABLE `Module` (
	`id` int(11) NOT NULL DEFAULT '0',
	`creation_date` DATE,
	`name` VARCHAR(30),
	`edv_number` VARCHAR(11) NOT NULL DEFAULT '0',
    PRIMARY KEY(`id`)
);

DROP TABLE IF EXISTS Grading;
CREATE TABLE Grading(
    `id` int(11) NOT NULL DEFAULT 0,
    `creation_date` DATE,
    `grade` float NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS Participation;
CREATE TABLE Participation(
    `id` int(11) NOT NULL DEFAULT 0,
    `creation_date` DATE,
    `priority` int(11) DEFAULT 0,
    `grading_id` INT NULL,
    `student_id` int(11) DEFAULT 0,
    `project_id` int(11) DEFAULT 0,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`grading_id`) REFERENCES `Grading`(`id`),
    FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`),
    FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`)
);
