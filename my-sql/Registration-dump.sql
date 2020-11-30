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
	StudentID INTEGER NOT NULL,
	CreationDate DATE,
    StudentName VARCHAR (80),
    StudentMail VARCHAR (50),
    StudentPW VARCHAR (20),
    StudentRole VARCHAR (20),
    MatrikelNR INTEGER,
    StudentStudy VARCHAR (50),
    PRIMARY KEY(StudentID)   
);

DROP TABLE IF EXISTS USER;
CREATE TABLE USER (
	UserID INTEGER NOT NULL,
	CreationDate DATE,
    UserName VARCHAR (80),
    UserMail VARCHAR (50),
    UserPW VARCHAR (20),
    UserRole VARCHAR (20),
    MatrikelNR INTEGER,
    PRIMARY KEY(UserID)
);

INSERT INTO Students VALUES (1, '1863-05-23', 'Max Mustermann', 'mm1@hdm-stuttgart.de', 'EinPasswort', 'Student', 111111, 'Wirtschaftsinformatik');
