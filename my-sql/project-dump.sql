CREATE DATABASE IF NOT EXISTS electionsystem;
USE electionsystem;

DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
  `project_id` int(11) NOT NULL DEFAULT '0',
  `project_name` varchar(128) NOT NULL DEFAULT '',
  `short_description` varchar(128) NOT NULL DEFAULT '',
  `link` varchar(128) NOT NULL DEFAULT '',
  `room_desired` varchar(128) NOT NULL DEFAULT '',
  `grade_average` int(11) NOT NULL DEFAULT '0',
  `num_blockdays_in_exam` int(11) NOT NULL DEFAULT '0',
  `blockdays_in_exam` tinyint(1) NOT NULL DEFAULT '0',
  `special_room` tinyint(1) NOT NULL DEFAULT '0',
  `date_blockdays_during_lecture` int(11) NOT NULL DEFAULT '0',
  `num_blockdays_prior_lecture` int(11) NOT NULL DEFAULT '0',
  `blockdays_prior_lecture` tinyint(1) NOT NULL DEFAULT '0',
  `num_blockdays_during_lecture` int(11) NOT NULL DEFAULT '0',
  `blockdays_during_lecture` tinyint(1) NOT NULL DEFAULT '0',
  `weekly` tinyint(1) NOT NULL DEFAULT '0',
  `num_spots`  int(11) NOT NULL DEFAULT '0',

  PRIMARY KEY (`project_id`)
);

INSERT INTO projects VALUES (1, "Project 1", "That's Description Number 1", "Link 1","Room 1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1");
INSERT INTO projects VALUES (2, "Project 1", "That's Description Number 2", "Link 2","Room 2", "2", "2", "0", "0", "2", "2", "0", "2", "0", "0", "2");
INSERT INTO projects VALUES (3, "Project 1", "That's Description Number 3", "Link 3","Room 3", "3", "3", "0", "0", "3", "3", "0", "3", "0", "0", "3");