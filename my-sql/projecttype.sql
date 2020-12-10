CREATE DATABASE IF NOT EXISTS electionsystem;
USE electionsystem;

DROP TABLE IF EXISTS projecttype;
CREATE TABLE projecttype (
  `id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT '',
  ``creation_date` DATE
  `sws` int(11) NOT NULL DEFAULT 0,
  `ects` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);


INSERT INTO projecttype VALUES (1, 'inter',  '10082020', 4, 5);
