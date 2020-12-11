CREATE DATABASE IF NOT EXISTS web357_db35;
USE web357_db35;

DROP TABLE IF EXISTS Projecttype;
CREATE TABLE Projecttype(
    `id` INT(11) NOT NULL DEFAULT 0,
    `name` VARCHAR(128) NOT NULL DEFAULT '',
    `creation_date` DATE,
    `ect` INT(11) NOT NULL DEFAULT 0,
    `sws` INT(11) NOT NULL DEFAULT 0,
    PRIMARY KEY(`id`)
);


INSERT INTO Projecttype VALUES (1, 'inter',  '10082020', 4, 5);
INSERT INTO Projecttype VALUES (2, 'inter',  '12-12-2020', 4, 5);
