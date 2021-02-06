CREATE DATABASE IF NOT EXISTS electionsystem;
USE electionsystem;

-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Erstellungszeit: 06. Feb 2021 um 12:08
-- Server-Version: 8.0.21
-- PHP-Version: 7.1.33-25+0~20210112.45+debian9~1.gbp1a89bf

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;



-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Grading`
--

CREATE TABLE `Grading` (
  `id` int NOT NULL DEFAULT '0',
  `creation_date` date DEFAULT NULL,
  `grade` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Grading`
--

INSERT INTO `Grading` (`id`, `creation_date`, `grade`) VALUES
(0, '2020-12-12', 1),
(1, '2020-12-12', 1.3),
(2, '2020-12-12', 1.7),
(3, '2020-12-12', 2),
(5, '2020-12-12', 2.3),
(6, '2020-12-12', 2.7),
(7, '2020-12-12', 3),
(8, '2020-12-12', 3.3),
(9, '2020-12-12', 3.7),
(10, '2020-12-12', 4),
(11, '2020-12-12', 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Module`
--

CREATE TABLE `Module` (
  `id` int NOT NULL DEFAULT '0',
  `creation_date` date DEFAULT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `edv_number` varchar(11) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Module`
--

INSERT INTO `Module` (`id`, `creation_date`, `name`, `edv_number`) VALUES
(15, '2021-02-06', 'Programmieren', '245674'),
(17, '2021-02-06', 'Schlüsselkompetenz', '243391'),
(18, '2021-02-06', 'Webtechnologie', '241131'),
(19, '2021-02-06', 'SW Praktikum', '98231'),
(20, '2021-02-06', 'User Experience', '782351'),
(21, '2021-02-06', 'Ways of Working', '452351'),
(22, '2021-02-06', 'Data Science', '993827');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Participation`
--

CREATE TABLE `Participation` (
  `id` int NOT NULL DEFAULT '0',
  `creation_date` date DEFAULT NULL,
  `priority` int DEFAULT '0',
  `grading_id` int DEFAULT NULL,
  `student_id` int DEFAULT '0',
  `project_id` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Participation`
--

INSERT INTO `Participation` (`id`, `creation_date`, `priority`, `grading_id`, `student_id`, `project_id`) VALUES
(1, '2021-02-02', 1, NULL, 30, 21),
(2, '2021-02-02', 2, NULL, 28, 22),
(3, '2021-02-02', 3, NULL, 26, 24),
(4, '2021-02-02', 4, NULL, 26, 23),
(5, '2021-02-02', 1, NULL, 26, 22),
(6, '2021-02-02', 3, NULL, 25, 21),
(7, '2021-02-02', 3, NULL, 24, 23),
(8, '2021-02-02', 1, NULL, 24, 24),
(9, '2021-02-02', 2, NULL, 24, 26);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Project`
--

CREATE TABLE `Project` (
  `id` int NOT NULL DEFAULT '0',
  `creation_date` date DEFAULT NULL,
  `name` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `short_description` text COLLATE utf8mb4_general_ci NOT NULL,
  `special_room` tinyint(1) NOT NULL DEFAULT '0',
  `room_desired` varchar(128) COLLATE utf8mb4_general_ci DEFAULT '',
  `num_blockdays_prior_lecture` int DEFAULT '0',
  `date_blockdays_during_lecture` date DEFAULT NULL,
  `num_blockdays_during_lecture` int DEFAULT '0',
  `num_blockdays_in_exam` int DEFAULT '0',
  `weekly` tinyint(1) NOT NULL DEFAULT '0',
  `num_spots` int NOT NULL DEFAULT '0',
  `language` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `external_partner` varchar(128) COLLATE utf8mb4_general_ci DEFAULT '',
  `edv_number` varchar(128) COLLATE utf8mb4_general_ci DEFAULT '0',
  `projecttype_id` int DEFAULT '0',
  `module_id` int DEFAULT '0',
  `professor_id` int DEFAULT '0',
  `add_professor_id` int DEFAULT '0',
  `current_state_id` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Project`
--

INSERT INTO `Project` (`id`, `creation_date`, `name`, `short_description`, `special_room`, `room_desired`, `num_blockdays_prior_lecture`, `date_blockdays_during_lecture`, `num_blockdays_during_lecture`, `num_blockdays_in_exam`, `weekly`, `num_spots`, `language`, `external_partner`, `edv_number`, `projecttype_id`, `module_id`, `professor_id`, `add_professor_id`, `current_state_id`) VALUES
(21, '2021-02-06', ' Big Data Scenarios', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 0, '', 0, '0000-00-00', 0, 0, 0, 12, 'english', 'SAP', '928472', 1, 22, 19, 18, 2),
(22, '2021-02-06', ' SW Praktikum Weiterentwicklungen', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 1, 'Aquarium', 0, '0000-00-00', 0, 0, 0, 11, 'german', 'Vector AG', '34567', 1, 15, 21, 20, 2),
(23, '2021-02-06', ' Blockchain', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 0, '', 0, '0000-00-00', 0, 0, 0, 16, 'english', '', '38298', 17, 15, 21, 20, 1),
(24, '2021-02-06', ' Frontend Development', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 1, 'PC Raum', 1, '0000-00-00', 0, 0, 0, 11, 'german', '', '92787', 18, 20, 20, 21, 1),
(25, '2021-02-06', 'Innovationsmanagement ', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 0, '', 0, '0000-00-00', 0, 1, 0, 29, '', '', '34865', 18, 20, 22, 26, 1),
(26, '2021-02-06', ' Web Development', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 0, '', 1, '0000-00-00', 0, 2, 0, 38, 'english', '', '19843', 18, 18, 20, 21, 2),
(27, '2021-02-06', 'Youtube', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 1, 'Aquarium', 1, '0000-00-00', 0, 0, 0, 40, 'english', '', '347336', 21, 21, 24, 23, 3),
(28, '2021-02-06', 'Datenschutz', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 0, '', 1, '0000-00-00', 0, 0, 0, 36, '', '', '553476', 21, 21, 23, 24, 3),
(29, '2021-02-06', 'Marketing und Data Science', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 0, '', 0, '0000-00-00', 0, 0, 0, 21, 'german', '', '753454', 17, 22, 24, 19, 3),
(31, '2021-02-06', 'Informationsmanagement', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 0, '', 0, '0000-00-00', 0, 1, 0, 15, 'english', '', '98728', 17, 15, 22, 20, 4),
(32, '2021-02-06', ' Java Programming', '', 0, '', 0, '0000-00-00', 0, 0, 0, 16, 'german', '', '34734', 21, 15, 21, 19, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Projecttype`
--

CREATE TABLE `Projecttype` (
  `id` int NOT NULL DEFAULT '0',
  `name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `sws` int NOT NULL DEFAULT '0',
  `ect` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Projecttype`
--

INSERT INTO `Projecttype` (`id`, `name`, `creation_date`, `sws`, `ect`) VALUES
(1, 'Fachspezifisches Projekt', '2021-02-06', 3, 5),
(17, 'Interdisziplinär', '2021-02-06', 5, 10),
(18, 'Transdisziplinär', '2021-02-06', 10, 20),
(19, 'Wahlfach', '2021-02-06', 8, 6),
(21, 'Ways of Working', '2021-02-06', 3, 5),
(22, 'Tools of Working', '2021-02-06', 3, 5),
(23, 'Working in a Media World', '2021-02-06', 3, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Role`
--

CREATE TABLE `Role` (
  `id` int NOT NULL DEFAULT '0',
  `name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Role`
--

INSERT INTO `Role` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Student'),
(3, 'Professor');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Semester`
--

CREATE TABLE `Semester` (
  `id` int NOT NULL DEFAULT '0',
  `creation_date` date DEFAULT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `submit_projects` tinyint NOT NULL DEFAULT '0',
  `grading` tinyint NOT NULL DEFAULT '0',
  `election` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Semester`
--

INSERT INTO `Semester` (`id`, `creation_date`, `name`, `submit_projects`, `grading`, `election`) VALUES
(1, '2021-01-23', 'Wintersemester 20/21', 0, 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `State`
--

CREATE TABLE `State` (
  `id` int NOT NULL DEFAULT '0',
  `name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `State`
--

INSERT INTO `State` (`id`, `name`) VALUES
(1, 'new'),
(2, 'approved'),
(3, 'rejected'),
(4, 'archived'),
(5, 'gradingperiod');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Student`
--

CREATE TABLE `Student` (
  `id` int NOT NULL DEFAULT '0',
  `name` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `creation_date` date DEFAULT NULL,
  `google_user_id` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `firstname` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `mail` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `role_id` int NOT NULL DEFAULT '0',
  `matrikel_nr` int NOT NULL DEFAULT '0',
  `study` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Student`
--

INSERT INTO `Student` (`id`, `name`, `creation_date`, `google_user_id`, `firstname`, `mail`, `role_id`, `matrikel_nr`, `study`) VALUES
(15, 'Mustermann', '2021-02-05', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Muster', 'musteremail@hdm-stuttgart.de', 2, 12345, 'WI7'),
(17, 'Sabrina', '2021-02-05', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Schmidt', 'muster@hdm-stuttgart.de', 2, 13335, 'WI7'),
(18, 'Lisa', '2021-02-05', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Lorenz', 'muster@hdm-stuttgart.de', 2, 15535, 'OM'),
(19, 'Franz', '2021-11-11', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Bauer', 'muster@hdm-stuttgart.de', 2, 11535, 'MW'),
(20, 'Enes', '2021-02-06', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Mai', 'muster@hdm-stuttgart.de', 2, 22535, 'MW'),
(21, 'Katrin', '2021-02-06', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Zauber', 'muster@hdm-stuttgart.de', 2, 12995, 'MW'),
(22, 'Tamara', '2021-02-06', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Sieber', 'muster@hdm-stuttgart.de', 2, 12992, 'ID7'),
(24, 'Sarah', '2021-02-06', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Wind', 'muster@hdm-stuttgart.de', 2, 12911, 'ID7'),
(25, 'Stefan', '2021-02-06', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Sommer', 'muster@hdm-stuttgart.de', 2, 33911, 'ID7'),
(26, 'Tina', '2021-02-06', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Albrecht', 'muster@hdm-stuttgart.de', 2, 55911, 'MI7'),
(28, 'Leo', '2021-02-06', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Gruß', 'muster@hdm-stuttgart.de', 2, 67911, 'MI7'),
(30, 'Christina', '2021-02-06', 'XXXXXXXXXXXXXXXXXXXXXXXXX', 'Vogel', 'muster@hdm-stuttgart.de', 2, 51911, 'WI7'),
(31, 'Gojani', '2021-02-06', 'HVSjqY780hQrb0cQkM11beNZ7PD2', 'Saranda', 'g.saranda@yahoo.de', 2, 12345, 'WI');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `User`
--

CREATE TABLE `User` (
  `id` int NOT NULL DEFAULT '0',
  `name` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `creation_date` date DEFAULT NULL,
  `google_user_id` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `firstname` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `mail` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `role_id` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `User`
--

INSERT INTO `User` (`id`, `name`, `creation_date`, `google_user_id`, `firstname`, `mail`, `role_id`) VALUES
(1, 'NA', '2021-12-12', '', 'NA', 'na@hdm-stuttgart.de', 3),
(18, 'Lehmann', '2021-12-12', 'ögijserighq23223454trzehgsbdkvlsja', 'Peter', 'peter.lehman@hdm-stuttgart.de', 3),
(19, 'Meth', '2020-12-12', 'fnghdfhlsjsdlgs9304u5093uqiorjwf', 'Henrick', 'henrick.lehmann@hdm-stuttgart.de', 3),
(20, 'Kunz', '2020-12-12', 'erölizweovasöl9w4svööw93', 'Christoph', 'christoph.kunz@hdm-stuttgart.de', 3),
(21, 'Thies', '2020-12-12', '3uioiwelfkwnweoriwlheroqwkhr', 'Peter', 'peter.thies@hdm-stuttgart.de', 3),
(22, 'Klotz', '2020-12-12', 'ewrtgfbvcowerp9v939245u', 'David', 'david.klotz@hdm-stuttgart.de', 3),
(23, 'Engstler', '2020-12-12', '3ewfdoiuweoiuwepiubpoweruw', 'Martin', 'martin.engstler@hdm-stuttgart.de', 3),
(24, 'Stingel', '2020-12-12', '32093409u0923oirewlfdksn23rew0f9', 'Susanne', 'susanne.stingel@hdm-stuttgart.de', 3),
(25, 'Friedrichsen', '2020-12-12', 'we3456trgdf09uwperg09jb9', 'Mike', 'mike.friedrichsen@hdm-stuttgart.de', 3),
(26, 'Forster', '2020-12-12', '43059u0rhdjfgwkbwejr03', 'XMartin', 'martin.forster@hdm-stuttgart.de', 3),
(27, 'Mujezinovic', '2021-02-06', 'pH2iQo33qdXwRgNBHLsZK3R85Or2', 'Amna-Mia ', 'amnamia.mujezinovic1@gmail.com', 1),
(28, 'Beer', '2021-02-06', '0dUwKqKeSEXRX1viI2SOfGhQ6Pf2', 'Jana', 'jessica_beer@t-online.de', 1),
(29, 'Münstermann', '2021-02-06', 'bE53X1339TSDVLQUXmwV5Wiard72', 'Marius', 'mariusmhm@gmail.com', 3);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Grading`
--
ALTER TABLE `Grading`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Module`
--
ALTER TABLE `Module`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Participation`
--
ALTER TABLE `Participation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grading_id` (`grading_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indizes für die Tabelle `Project`
--
ALTER TABLE `Project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projecttype_id` (`projecttype_id`),
  ADD KEY `module_id` (`module_id`),
  ADD KEY `professor_id` (`professor_id`),
  ADD KEY `add_professor_id` (`add_professor_id`),
  ADD KEY `current_state_id` (`current_state_id`);

--
-- Indizes für die Tabelle `Projecttype`
--
ALTER TABLE `Projecttype`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Semester`
--
ALTER TABLE `Semester`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `State`
--
ALTER TABLE `State`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `Student`
--
ALTER TABLE `Student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indizes für die Tabelle `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Participation`
--
ALTER TABLE `Participation`
  ADD CONSTRAINT `Participation_ibfk_1` FOREIGN KEY (`grading_id`) REFERENCES `Grading` (`id`),
  ADD CONSTRAINT `Participation_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `Student` (`id`),
  ADD CONSTRAINT `Participation_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `Project` (`id`);

--
-- Constraints der Tabelle `Project`
--
ALTER TABLE `Project`
  ADD CONSTRAINT `Project_ibfk_1` FOREIGN KEY (`projecttype_id`) REFERENCES `Projecttype` (`id`),
  ADD CONSTRAINT `Project_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `Module` (`id`),
  ADD CONSTRAINT `Project_ibfk_3` FOREIGN KEY (`professor_id`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `Project_ibfk_4` FOREIGN KEY (`add_professor_id`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `Project_ibfk_5` FOREIGN KEY (`current_state_id`) REFERENCES `State` (`id`);

--
-- Constraints der Tabelle `Student`
--
ALTER TABLE `Student`
  ADD CONSTRAINT `Student_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `Role` (`id`);

--
-- Constraints der Tabelle `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `Role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
