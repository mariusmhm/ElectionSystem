CREATE DATABASE IF NOT EXISTS web357_db35;
USE web357_db35;
DROP TABLE IF EXISTS Projecttype;

DROP TABLE IF EXISTS Projecttype;
CREATE TABLE Projecttype (
  `id` int(11) NOT NULL DEFAULT '0',
  ``creation_date` DATE
  `sws` int(11) NOT NULL DEFAULT 0,
  `ects` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);


INSERT INTO Projecttype VALUES (1, 'inter',  '10082020', 4, 5);
INSERT INTO Projecttype VALUES (2, 'inter',  '12-12-2020', 4, 5);
