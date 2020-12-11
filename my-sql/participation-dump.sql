DROP TABLE IF EXISTS Grading;
CREATE TABLE Grading(
    `id` int(11) NOT NULL DEFAULT 0,
    `creation_date` DATE,
    `grade` float NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS Participation;
CREATE TABLE Participation(
    `id` int(11) NOT NULL DEFAULT 0,
    `creation_date` DATE,
    `priority` int(11) DEFAULT 0,
    `grading_id` INT NULL,
    `student_id` int(11) DEFAULT 0,
    `project_id` int(11) DEFAULT 0,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`grading_id`) REFERENCES `Grading`(`id`),
    FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`),
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`project_id`)
);

