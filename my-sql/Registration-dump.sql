CREATE DATABASE IF NOT EXISTS electionsystem;
USE electionsystem;

CREATE TABLE `users` (
  `id` int(11) NOT NULL DEFAULT '0',
  `google_user_id` varchar(128) NOT NULL DEFAULT '',
  `name` varchar(128) NOT NULL DEFAULT '',
  `email` varchar(256) NOT NULL DEFAULT '',
  `role` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)

	
DROP TABLE IF EXISTS Students;
CREATE TABLE Students (
	`student_id` int(11) NOT NULL DEFAULT '0',
	`creation_date` DATE,
    `student_lastname` VARCHAR (80),
    `student_firstname` VARCHAR (80),
    `student_mail` VARCHAR (50),
    `student_role` VARCHAR (20),
    `matrikel_nr` INTEGER,
    `student_study` VARCHAR (50),
    PRIMARY KEY(student_id)
);



INSERT INTO Students VALUES (1, '1863-05-23',  'Mustermann', 'Marius', 'mm1@hdm-stuttgart.de', 'Student', 111111, 'Wirtschaftsinformatik');
