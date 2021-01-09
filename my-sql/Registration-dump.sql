CREATE DATABASE IF NOT EXISTS electionsystem;
USE electionsystem;

DROP TABLE IF EXISTS `Semester`;
CREATE TABLE `Semester` (
	`id` int(11) NOT NULL DEFAULT '0',
	`creation_date` DATE,
	`winter_semester` tinyint NOT NULL DEFAULT '0',
	`submit_projects_end_date` DATE,
	`grading_end_date` DATE,
  `election_end_date` DATE,
  `submit_projects_beginn_date` DATE,
  `grading_beginn_date` DATE,
  `election_beginn_date` DATE,
  PRIMARY KEY(`id`)
);


DROP TABLE IF EXISTS `Projecttype`;
CREATE TABLE `Projecttype` (
	`id` int(11) NOT NULL DEFAULT '0',
	`name` VARCHAR(30),
    `creation_date` DATE,
	`sws` int(11) NOT NULL DEFAULT '0',
	`ect` int(11) NOT NULL DEFAULT '0',	
    PRIMARY KEY(`id`)
);
INSERT INTO `Projecttype` VALUES (2, "Interdisziplinär",'2021-01-05', 3,4);

DROP TABLE IF EXISTS `Module`;
CREATE TABLE `Module` (
	`id` int(11) NOT NULL DEFAULT '0',
	`creation_date` DATE,
	`name` VARCHAR(30),
	`edv_number` VARCHAR(11) NOT NULL DEFAULT '0',
    PRIMARY KEY(`id`)
);
INSERT INTO `Module` VALUES (2, '2021-01-05', "Schlüsselkompetenz","324");

DROP TABLE IF EXISTS `Grading`;
CREATE TABLE `Grading`(
    `id` int(11) NOT NULL DEFAULT '0',
    `creation_date` DATE,
    `grade` float NOT NULL DEFAULT '0',

    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Participation`;
CREATE TABLE `Participation`(
    `id` int(11) NOT NULL DEFAULT '0',
    `creation_date` DATE,
    `priority` int(11) DEFAULT '0',
    `grading_id` INT NULL,
    `student_id` int(11) DEFAULT '0',
    `project_id` int(11) DEFAULT '0',

    PRIMARY KEY (`id`),
    FOREIGN KEY (`grading_id`) REFERENCES `Grading`(`id`),
    FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`)
);

DROP TABLE IF EXISTS Project;
CREATE TABLE Project(
  `id` int(11) NOT NULL DEFAULT '0',
  `creation_date` DATE,
  `name` VARCHAR(128) NOT NULL DEFAULT '',
  `short_description` LONGTEXT NOT NULL DEFAULT '',
  `special_room` tinyint(1) NOT NULL DEFAULT '0',
  `room_desired` varchar(128) NOT NULL DEFAULT '',
  `num_blockdays_prior_lecture` int(11) NOT NULL DEFAULT '0',
  `date_blockdays_during_lecture` DATE,
  `num_blockdays_during_lecture` int(11) NOT NULL DEFAULT '0',
  `num_blockdays_in_exam` int(11) NULL DEFAULT '0',
  `weekly` tinyint(1) NOT NULL DEFAULT '0',
  `num_spots` int(11) NOT NULL DEFAULT '0',
  `language` varchar(128) NOT NULL DEFAULT '',
  `external_partner` varchar(128) DEFAULT '',
  `projecttype_id` int(11) DEFAULT 0,
  `module_id` int(11) DEFAULT 0,
  `professor_id` int(11) DEFAULT 0,
  `add_professor_id`int(11) DEFAULT 0,
  `state` varchar(128) DEFAULT 'new',

  PRIMARY KEY (`id`),
  FOREIGN KEY (`projecttype_id`) REFERENCES `Projecttype`(`id`),
  FOREIGN KEY (`module_id`) REFERENCES `Module`(`id`),
  FOREIGN KEY (`professor_id`) REFERENCES `User`(`id`),
  FOREIGN KEY (`add_professor_id`) REFERENCES `User`(`id`)
);