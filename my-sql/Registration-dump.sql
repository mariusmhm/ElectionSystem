CREATE DATABASE IF NOT EXISTS electionsystem;
USE electionsystem;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  `id` int(11) NOT NULL DEFAULT '0',
  `google_user_id` varchar(128) NOT NULL DEFAULT '',
  `name` varchar(128) NOT NULL DEFAULT '',
  `email` varchar(256) NOT NULL DEFAULT '',
  `role` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
);
	
DROP TABLE IF EXISTS students;
CREATE TABLE students (
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

DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
  `project_id` int(11) NOT NULL DEFAULT '0',
  `project_name` varchar(128) NOT NULL DEFAULT '',
  `project_description` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`project_id`)
);

INSERT INTO students VALUES (1, '1863-05-23',  'Mustermann', 'Marius', 'mm1@hdm-stuttgart.de', 'Student', 111111, 'Wirtschaftsinformatik');

INSERT INTO projects VALUES (1, 'Project 1', "That's Description Number 1");
INSERT INTO projects VALUES (2, 'Project 1', "That's Description Number 2");
INSERT INTO projects VALUES (3, 'Project 1', "That's Description Number 3");