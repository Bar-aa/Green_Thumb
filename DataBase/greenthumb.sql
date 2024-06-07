-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 07 يونيو 2024 الساعة 18:18
-- إصدار الخادم: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `greenthumb`
--

-- --------------------------------------------------------

--
-- بنية الجدول `crops`
--

CREATE TABLE `crops` (
  `crop_id` int(11) NOT NULL,
  `plot_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `planting_date` date DEFAULT NULL,
  `expected_harvest_date` date DEFAULT NULL,
  `previous_crop` varchar(100) NOT NULL,
  `activity` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `crops`
--

INSERT INTO `crops` (`crop_id`, `plot_id`, `name`, `planting_date`, `expected_harvest_date`, `previous_crop`, `activity`) VALUES
(1, 1, 'Tomatoes', '2024-04-01', '2024-06-15', '', ''),
(2, 2, 'Carrots', '2024-03-15', '2024-07-01', '', '');

-- --------------------------------------------------------

--
-- بنية الجدول `gardens`
--

CREATE TABLE `gardens` (
  `garden_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `sunlight_conditions` enum('full sun','partial sun','shade') DEFAULT NULL,
  `soil_type` varchar(50) DEFAULT NULL,
  `available_plots` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `gardens`
--

INSERT INTO `gardens` (`garden_id`, `name`, `location`, `sunlight_conditions`, `soil_type`, `available_plots`, `created_at`, `updated_at`) VALUES
(1, 'Central Park Garden', 'Central Park, NY', 'full sun', 'loamy', 10, '2024-06-07 15:08:14', '2024-06-07 15:08:14'),
(2, 'Riverside Garden', 'Riverside Dr, NY', 'partial sun', 'sandy', 5, '2024-06-07 15:08:14', '2024-06-07 15:08:14');

-- --------------------------------------------------------

--
-- بنية الجدول `knowledgebase`
--

CREATE TABLE `knowledgebase` (
  `article_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `knowledgebase`
--

INSERT INTO `knowledgebase` (`article_id`, `title`, `content`, `author_id`, `created_at`, `updated_at`) VALUES
(1, 'How to Grow Tomatoes', 'Tomatoes need full sun and regular watering...', 1, '2024-06-07 15:08:14', '2024-06-07 15:08:14'),
(2, 'Composting Basics', 'Composting is a great way to recycle...', 2, '2024-06-07 15:08:14', '2024-06-07 15:08:14');

-- --------------------------------------------------------

--
-- بنية الجدول `localpartnerships`
--

CREATE TABLE `localpartnerships` (
  `partnership_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `localpartnerships`
--

INSERT INTO `localpartnerships` (`partnership_id`, `name`, `description`, `contact_info`, `created_at`, `updated_at`) VALUES
(1, 'Local Farm Co.', 'Partnering for local produce.', 'contact@localfarmco.com', '2024-06-07 15:08:14', '2024-06-07 15:08:14'),
(2, 'Green Supplies', 'Providing tools and seeds.', 'info@greensupplies.com', '2024-06-07 15:08:14', '2024-06-07 15:08:14');

-- --------------------------------------------------------

--
-- بنية الجدول `plots`
--

CREATE TABLE `plots` (
  `plot_id` int(11) NOT NULL,
  `garden_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `plot_number` int(11) NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `plots`
--

INSERT INTO `plots` (`plot_id`, `garden_id`, `user_id`, `plot_number`, `size`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 101, '10x10', '2024-06-07 15:08:14', '2024-06-07 15:08:14'),
(2, 1, 2, 102, '15x15', '2024-06-07 15:08:14', '2024-06-07 15:08:14'),
(3, 2, 1, 201, '12x12', '2024-06-07 15:08:14', '2024-06-07 15:08:14');

-- --------------------------------------------------------

--
-- بنية الجدول `resources`
--

CREATE TABLE `resources` (
  `resource_id` int(11) NOT NULL,
  `type` enum('tool','seed','compost','produce') NOT NULL,
  `description` text DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `resources`
--

INSERT INTO `resources` (`resource_id`, `type`, `description`, `owner_id`, `created_at`, `updated_at`) VALUES
(1, 'tool', 'Shovel', 1, '2024-06-07 15:08:14', '2024-06-07 15:08:14'),
(2, 'seed', 'Tomato Seeds', 2, '2024-06-07 15:08:14', '2024-06-07 15:08:14'),
(3, 'compost', 'Organic Compost', 1, '2024-06-07 15:08:14', '2024-06-07 15:08:14');

-- --------------------------------------------------------

--
-- بنية الجدول `soildata`
--

CREATE TABLE `soildata` (
  `soil_id` int(11) NOT NULL,
  `garden_id` int(11) DEFAULT NULL,
  `sample_date` date DEFAULT NULL,
  `ph_level` decimal(3,1) DEFAULT NULL,
  `nutrients` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `soildata`
--

INSERT INTO `soildata` (`soil_id`, `garden_id`, `sample_date`, `ph_level`, `nutrients`, `created_at`) VALUES
(1, 1, '2024-05-01', 6.5, 'NPK: 10-10-10', '2024-06-07 15:08:14'),
(2, 2, '2024-05-10', 7.0, 'NPK: 8-8-8', '2024-06-07 15:08:14');

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `role` enum('admin','member') DEFAULT 'member',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `users`
--

INSERT INTO `users` (`user_id`, `username`, `password_hash`, `email`, `first_name`, `last_name`, `role`, `created_at`, `updated_at`) VALUES
(1, 'user1', 'password1', 'user1@example.com', NULL, NULL, 'member', '2024-06-07 15:08:14', '2024-06-07 15:08:14'),
(2, 'user2', 'password2', 'user2@example.com', NULL, NULL, 'member', '2024-06-07 15:08:14', '2024-06-07 15:08:14');

-- --------------------------------------------------------

--
-- بنية الجدول `volunteers`
--

CREATE TABLE `volunteers` (
  `volunteer_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `garden_id` int(11) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(15) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `volunteers`
--

INSERT INTO `volunteers` (`volunteer_id`, `user_id`, `garden_id`, `event_date`, `role`, `email`, `name`, `phone_number`) VALUES
(1, 1, 1, '2024-06-01', 'Planting Coordinator', NULL, NULL, NULL),
(2, 2, 2, '2024-06-05', 'Watering Team', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- بنية الجدول `weatherdata`
--

CREATE TABLE `weatherdata` (
  `weather_id` int(11) NOT NULL,
  `garden_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `temperature` decimal(5,2) DEFAULT NULL,
  `humidity` decimal(5,2) DEFAULT NULL,
  `precipitation` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `weatherdata`
--

INSERT INTO `weatherdata` (`weather_id`, `garden_id`, `date`, `temperature`, `humidity`, `precipitation`, `created_at`) VALUES
(1, 1, '2024-06-01', 75.50, 60.50, 0.20, '2024-06-07 15:08:14'),
(2, 2, '2024-06-01', 80.00, 55.00, 0.00, '2024-06-07 15:08:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crops`
--
ALTER TABLE `crops`
  ADD PRIMARY KEY (`crop_id`),
  ADD KEY `plot_id` (`plot_id`);

--
-- Indexes for table `gardens`
--
ALTER TABLE `gardens`
  ADD PRIMARY KEY (`garden_id`);

--
-- Indexes for table `knowledgebase`
--
ALTER TABLE `knowledgebase`
  ADD PRIMARY KEY (`article_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `localpartnerships`
--
ALTER TABLE `localpartnerships`
  ADD PRIMARY KEY (`partnership_id`);

--
-- Indexes for table `plots`
--
ALTER TABLE `plots`
  ADD PRIMARY KEY (`plot_id`),
  ADD KEY `garden_id` (`garden_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`resource_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `soildata`
--
ALTER TABLE `soildata`
  ADD PRIMARY KEY (`soil_id`),
  ADD KEY `garden_id` (`garden_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD PRIMARY KEY (`volunteer_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `garden_id` (`garden_id`);

--
-- Indexes for table `weatherdata`
--
ALTER TABLE `weatherdata`
  ADD PRIMARY KEY (`weather_id`),
  ADD KEY `garden_id` (`garden_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crops`
--
ALTER TABLE `crops`
  MODIFY `crop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `gardens`
--
ALTER TABLE `gardens`
  MODIFY `garden_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `knowledgebase`
--
ALTER TABLE `knowledgebase`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `localpartnerships`
--
ALTER TABLE `localpartnerships`
  MODIFY `partnership_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `plots`
--
ALTER TABLE `plots`
  MODIFY `plot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `resource_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `soildata`
--
ALTER TABLE `soildata`
  MODIFY `soil_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `volunteers`
--
ALTER TABLE `volunteers`
  MODIFY `volunteer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `weatherdata`
--
ALTER TABLE `weatherdata`
  MODIFY `weather_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `crops`
--
ALTER TABLE `crops`
  ADD CONSTRAINT `crops_ibfk_1` FOREIGN KEY (`plot_id`) REFERENCES `plots` (`plot_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `knowledgebase`
--
ALTER TABLE `knowledgebase`
  ADD CONSTRAINT `knowledgebase_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `plots`
--
ALTER TABLE `plots`
  ADD CONSTRAINT `plots_ibfk_1` FOREIGN KEY (`garden_id`) REFERENCES `gardens` (`garden_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plots_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `soildata`
--
ALTER TABLE `soildata`
  ADD CONSTRAINT `soildata_ibfk_1` FOREIGN KEY (`garden_id`) REFERENCES `gardens` (`garden_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `volunteers`
--
ALTER TABLE `volunteers`
  ADD CONSTRAINT `volunteers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `volunteers_ibfk_2` FOREIGN KEY (`garden_id`) REFERENCES `gardens` (`garden_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `weatherdata`
--
ALTER TABLE `weatherdata`
  ADD CONSTRAINT `weatherdata_ibfk_1` FOREIGN KEY (`garden_id`) REFERENCES `gardens` (`garden_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
