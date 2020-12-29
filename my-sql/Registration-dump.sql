CREATE DATABASE IF NOT EXISTS `electionsystem`;
USE `electionsystem`;


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

INSERT INTO semester VALUES (1, '1863-05-23',  True,
'2021-07-21', '2021-05-09', '2020-9-20', '2020-10-08');



