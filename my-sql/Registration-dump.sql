CREATE DATABASE IF NOT EXISTS electionsystem;
USE electionsystem;

DROP TABLE IF EXISTS `Semester`;
CREATE TABLE `Semester` (
	`id` int(11) NOT NULL DEFAULT 0,
	`creation_date` DATE,
	`winter_semester` tinyint NOT NULL DEFAULT 0,
    `submit_projects` tinyint NOT NULL DEFAULT 0,
    `grading` tinyint NOT NULL DEFAULT 0,
    `election` tinyint NOT NULL DEFAULT 0,
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


DROP TABLE IF EXISTS `Module`;
CREATE TABLE `Module` (
	`id` int(11) NOT NULL DEFAULT '0',
	`creation_date` DATE,
	`name` VARCHAR(30) NOT NULL DEFAULT '',,
	`edv_number` VARCHAR(11) NOT NULL DEFAULT '0',
    PRIMARY KEY(`id`)
);

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
    FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`),
    FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`)
);

DROP TABLE IF EXISTS `Project`;
CREATE TABLE `Project`(
  `id` int(11) NOT NULL DEFAULT '0',
  `creation_date` DATE,
  `name` VARCHAR(128) NOT NULL DEFAULT '',
  `short_description` TEXT NOT NULL DEFAULT '',
  `special_room` tinyint(1) NOT NULL DEFAULT '0',
  `room_desired` varchar(128) DEFAULT '',
  `num_blockdays_prior_lecture` int(11) DEFAULT '0',
  `date_blockdays_during_lecture` DATE,
  `num_blockdays_during_lecture` int(11) DEFAULT '0',
  `num_blockdays_in_exam` int(11) DEFAULT '0',
  `weekly` tinyint(1) NOT NULL DEFAULT '0',
  `num_spots` int(11) NOT NULL DEFAULT '0',
  `language` varchar(128) NOT NULL DEFAULT '',
  `external_partner` varchar(128) DEFAULT '',
  `edv_number` varchar(128) DEFAULT '0',
  `projecttype_id` int(11) DEFAULT '0',
  `module_id` int(11) DEFAULT '0',
  `professor_id` int(11) DEFAULT '0',
  `add_professor_id`int(11) DEFAULT '0',
  `current_state_id` int(11) DEFAULT '0',

  PRIMARY KEY (`id`),
  FOREIGN KEY (`projecttype_id`) REFERENCES `Projecttype`(`id`),
  FOREIGN KEY (`module_id`) REFERENCES `Module`(`id`),
  FOREIGN KEY (`professor_id`) REFERENCES `User`(`id`),
  FOREIGN KEY (`add_professor_id`) REFERENCES `User`(`id`),
  FOREIGN KEY (`current_state_id`) REFERENCES `State`(`id`)
);


DROP TABLE IF EXISTS `State`;
CREATE TABLE `State`(
    `id` int(11) NOT NULL DEFAULT '0',
    `name` VARCHAR(30) NOT NULL DEFAULT '0',

    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Role`;
CREATE TABLE `Role`(
    `id` int(11) NOT NULL DEFAULT '0',
    `name` VARCHAR(30) NOT NULL DEFAULT '0',

    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Student`;
CREATE TABLE `Student`(
    `id` INT(11) NOT NULL DEFAULT '0',
    `name` VARCHAR(128) NOT NULL DEFAULT '',
    `creation_date` DATE,
    `google_user_id` VARCHAR(128) NOT NULL DEFAULT '',
    `firstname` VARCHAR(128) NOT NULL DEFAULT '',
    `mail` VARCHAR(128) NOT NULL DEFAULT '',
    `role_id` int(11) NOT NULL DEFAULT '0',
    `matrikel_nr` int(11) NOT NULL DEFAULT '0',
    `study`VARCHAR(128) NOT NULL DEFAULT '',

    PRIMARY KEY(`id`),
    FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`)
);

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User`(
    `id` INT(11) NOT NULL DEFAULT '0',
    `name` VARCHAR(128) NOT NULL DEFAULT '',
    `creation_date` DATE,
    `google_user_id` VARCHAR(128) NOT NULL DEFAULT '',
    `firstname` VARCHAR(128) NOT NULL DEFAULT '',
    `mail` VARCHAR(128) NOT NULL DEFAULT '',
    `role_id` int(11) NOT NULL DEFAULT '0',

    PRIMARY KEY(`id`),
    FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`)
);
