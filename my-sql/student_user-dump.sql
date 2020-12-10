DROP TABLE IF EXISTS Student;
CREATE TABLE Student(
    `id` INT(11) NOT NULL DEFAULT 0,
    `name` VARCHAR(128) NOT NULL DEFAULT '',
    `creation_date` DATE,
    `firstname` VARCHAR(128) NOT NULL DEFAULT '',
    `mail` VARCHAR(128) NOT NULL DEFAULT '',
    `role` VARCHAR(128) NOT NULL DEFAULT '',
    `matrikel_nr`INT(11) NOT NULL DEFAULT 0,
    `study`VARCHAR(128) NOT NULL DEFAULT '',

    PRIMARY KEY(`id`)
);

DROP TABLE IF EXISTS User;
CREATE TABLE User(
    `id` INT(11) NOT NULL DEFAULT 0,
    `name` VARCHAR(128) NOT NULL DEFAULT '',
    `creation_date` DATE,
    `firstname` VARCHAR(128) NOT NULL DEFAULT '',
    `mail` VARCHAR(128) NOT NULL DEFAULT '',
    `role` VARCHAR(128) NOT NULL DEFAULT '',

    PRIMARY KEY(`id`)
)
