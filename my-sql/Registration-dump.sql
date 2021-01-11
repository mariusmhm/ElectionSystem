CREATE DATABASE IF NOT EXISTS electionsystem;
USE electionsystem;

DROP TABLE IF EXISTS `Module`;
CREATE TABLE `Module` (
	`id` int(11) NOT NULL DEFAULT '0',
	`creation_date` DATE,
	`name` VARCHAR(30),
	`edv_number` VARCHAR(11) NOT NULL DEFAULT '0',
    PRIMARY KEY(`id`)
);




DROP TABLE IF EXISTS `Grading`;
CREATE TABLE `Grading`(
    `id` int(11) NOT NULL DEFAULT 0,
    `creation_date` DATE,
    `grade` float NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
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

DROP TABLE IF EXISTS `Project`;
CREATE TABLE `Project`(
  `id` int(11) ,
  `creation_date` DATE,
  `name` VARCHAR(128),
  `short_description` TEXT,
  `special_room` tinyint(1) ,
  `room_desired` varchar(128) ,
  `num_blockdays_prior_lecture` int(11) ,
  `date_blockdays_during_lecture` DATE,
  `num_blockdays_during_lecture` int(11) ,
  `num_blockdays_in_exam` int(11) ,
  `weekly` tinyint(1) ,
  `num_spots` int(11) ,
  `language` varchar(128) ,
  `external_partner` varchar(128) ,
  `projecttype_id` int(11) ,
  `module_id` int(11) DEFAULT 0,
  `professor_id` int(11) DEFAULT 0,
  `add_professor_id`int(11) DEFAULT 0,
  `state` varchar(128) DEFAULT 'new',

  PRIMARY KEY (`id`),
  FOREIGN KEY (`projecttype_id`) REFERENCES `Projecttype`(`id`),
  FOREIGN KEY (`module_id`) REFERENCES `Module`(`id`)
);








