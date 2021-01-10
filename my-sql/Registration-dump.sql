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


DROP TABLE IF EXISTS `Project`;
CREATE TABLE `Project`(
  `id` int(11),
  `creation_date` DATE,
  `name` VARCHAR(128),
  `short_description` TEXT,
  `special_room` tinyint(1),
  `room_desired` varchar(128),
  `num_blockdays_prior_lecture` int(11),
  `date_blockdays_during_lecture` DATE,
  `num_blockdays_during_lecture` int(11),
  `num_blockdays_in_exam` int(11) ,
  `weekly` tinyint(1),
  `num_spots` int(11),
  `language` varchar(128),
  `external_partner` varchar(128) DEFAULT '',
  `projecttype_id` int(11) DEFAULT 0,
  `module_id` int(11) DEFAULT 0,
  `professor_id` int(11) DEFAULT 0,
  `add_professor_id`int(11) DEFAULT 0,
  `state` varchar(128) DEFAULT 'new',

  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Projecttype`;
CREATE TABLE `Projecttype` (
	`id` int(11),
	`creation_date` DATE,
	`name` VARCHAR(30),
	`sws` int(11),
	`ect` int(11),
    PRIMARY KEY(`id`)
);



DROP TABLE IF EXISTS `Grading`;
CREATE TABLE `Grading`(
    `id` int(11) NOT NULL DEFAULT 0,
    `creation_date` DATE,
    `grade` float NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
);



DROP TABLE IF EXISTS `Participation`;
CREATE TABLE `Participation`(
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

DROP TABLE IF EXISTS `Module`;
CREATE TABLE `Module`(
	`id` int(11),
	`creation_date` DATE,
	`name` VARCHAR(30),
	`edv_number` VARCHAR(11),
    PRIMARY KEY(`id`)
);

INSERT INTO `Projecttype` VALUES (1,'2020-0-02',"interdisziplinär",12, 8);
INSERT INTO `Module` VALUES (1, '2020-0-02',"Recht",123);
