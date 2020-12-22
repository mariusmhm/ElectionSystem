

ALTER TABLE projects (

  FOREIGN KEY (`participation_id`) REFERENCES `Participation`(`id`),
);

