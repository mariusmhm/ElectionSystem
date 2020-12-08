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
  `link` varchar(128) NOT NULL DEFAULT '',
  `room_desired` varchar(128) NOT NULL DEFAULT '',
  `grade_average` int(11) NOT NULL DEFAULT '0',
  `num_blockdays_in_Exam` int(11) NOT NULL DEFAULT '0',
  `blockdays_in_exam` tinyint(1) NOT NULL DEFAULT '0',
  `special_room` tinyint(1) NOT NULL DEFAULT '0',
  `date_blockdays_during_lecture` int(11) NOT NULL DEFAULT '0',
  `num_blockdays_prior_lecture` int(11) NOT NULL DEFAULT '0',
  `blockdays_prior_lecturetrue` tinyint(1) NOT NULL DEFAULT '0',
  `num_blockdays_during_lecutre` int(11) NOT NULL DEFAULT '0',
  `blockdays_during_lecture` tinyint(1) NOT NULL DEFAULT '0',
  `weekly` tinyint(1) NOT NULL DEFAULT '0',
  `short_description` varchar(128) NOT NULL DEFAULT '',
  `num_spots`  int(11) NOT NULL DEFAULT '0',

  PRIMARY KEY (`project_id`)
);

INSERT INTO students VALUES (1, '1863-05-23',  'Mustermann', 'Marius', 'mm1@hdm-stuttgart.de', 'Student', 111111, 'Wirtschaftsinformatik');

INSERT INTO projects VALUES (1, 'Project 1', "That's Description Number 1");
INSERT INTO projects VALUES (2, 'Project 1', "That's Description Number 2");
INSERT INTO projects VALUES (3, 'Project 1', "That's Description Number 3");