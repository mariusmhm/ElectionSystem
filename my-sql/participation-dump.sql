DROP TABLE IF EXISTS Grading;
CREATE TABLE Grading(
    `id` int(11) NOT NULL DEFAULT 0,
    `grade` int(11) DEFAULT 0,

    PRIMARY KEY (`id`)
);

INSERT INTO Grading VALUES (1, 1);
INSERT INTO Grading VALUES (2, 2);
INSERT INTO Grading VALUES (3, 3);

DROP TABLE IF EXISTS Participation;
CREATE TABLE Participation(
    `id` int(11) NOT NULL DEFAULT 0,
    `priority` int(11) DEFAULT 0,
    `grading_id` int(11) DEFAULT 0,
    `student_id` int(11) DEFAULT 0,
    `project_id` int(11) DEFAULT 0,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`grading_id`) REFERENCES `Grading`(`id`),
    FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`),
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`project_id`)
);

INSERT INTO Participation VALUES (1, 1, 1, 1, 1);
INSERT INTO Participation VALUES (2, 2, 2, 2, 2);
INSERT INTO Participation VALUES (3, 3, 3, 3, 3);
INSERT INTO Participation VALUES (4, 3, 4, 2, 3);
