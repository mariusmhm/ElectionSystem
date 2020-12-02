CREATE DATABASE IF NOT EXISTS electionsystem;
USE electionsystem;

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL DEFAULT '0',
  `google_user_id` varchar(128) NOT NULL DEFAULT '',
  `name` varchar(128) NOT NULL DEFAULT '',
  `email` varchar(256) NOT NULL DEFAULT '',
  `role` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS Students;
CREATE TABLE Students (
	`student_id` INTEGER NOT NULL,
	`creation_date` DATE,
    `student_lastname` VARCHAR (80),
    `student_firstname` VARCHAR (80),
    `student_mail` VARCHAR (50),
    `student_role` VARCHAR (20),
    `matrikel_nr` INTEGER,
    `student_study` VARCHAR (50),
    PRIMARY KEY(student_id)
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
