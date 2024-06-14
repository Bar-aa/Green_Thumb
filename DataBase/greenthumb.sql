-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2024 at 11:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `crops`
--

CREATE TABLE `crops` (
  `crop_id` int(11) NOT NULL,
  `plot_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `planting_date` date DEFAULT NULL,
  `expected_harvest_date` date DEFAULT NULL,
  `activity` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crops`
--

INSERT INTO `crops` (`crop_id`, `plot_id`, `name`, `planting_date`, `expected_harvest_date`, `activity`) VALUES
(1, 1, 'Tomato', '2024-03-01', '2024-06-01', 'active'),
(2, 2, 'Cucumber', '2024-04-15', '2024-07-15', 'active'),
(3, 3, 'Lettuce', '2024-05-10', '2024-08-10', 'active'),
(4, 4, 'Pepper', '2024-03-20', '2024-06-20', 'active'),
(5, 5, 'Carrot', '2024-04-01', '2024-07-01', 'active'),
(6, 6, 'Onion', '2024-05-05', '2024-08-05', 'active'),
(7, 7, 'Potato', '2024-03-25', '2024-06-25', 'active'),
(8, 8, 'Spinach', '2024-04-10', '2024-07-10', 'active'),
(9, 9, 'Broccoli', '2024-05-15', '2024-08-15', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `crop_rotation`
--

CREATE TABLE `crop_rotation` (
  `rotation_id` int(11) NOT NULL,
  `plot_id` int(11) NOT NULL,
  `current_crop_id` int(11) NOT NULL,
  `previous_crop_id` int(11) DEFAULT NULL,
  `rotation_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crop_rotation`
--

INSERT INTO `crop_rotation` (`rotation_id`, `plot_id`, `current_crop_id`, `previous_crop_id`, `rotation_date`) VALUES
(1, 1, 1, NULL, '2024-06-01'),
(2, 2, 2, NULL, '2024-07-15'),
(3, 3, 3, NULL, '2024-08-10'),
(4, 4, 4, NULL, '2024-06-20'),
(5, 5, 5, NULL, '2024-07-01'),
(6, 6, 6, NULL, '2024-08-05'),
(7, 7, 7, NULL, '2024-06-25'),
(8, 8, 8, NULL, '2024-07-10'),
(9, 9, 9, NULL, '2024-08-15');

-- --------------------------------------------------------

--
-- Table structure for table `gardens`
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
-- Dumping data for table `gardens`
--

INSERT INTO `gardens` (`garden_id`, `name`, `location`, `sunlight_conditions`, `soil_type`, `available_plots`, `created_at`, `updated_at`) VALUES
(1, 'Garden Al-Zaytoun', 'Nablus', 'full sun', 'Clay', 10, '2024-06-14 05:06:44', '2024-06-14 05:06:44'),
(2, 'Garden Al-Zuhur', 'Ramallah', 'partial sun', 'Sandy', 5, '2024-06-14 05:06:44', '2024-06-14 05:06:44'),
(3, 'Garden Al-Nakhil', 'Jenin', 'shade', 'Loamy', 8, '2024-06-14 05:06:44', '2024-06-14 05:06:44'),
(4, 'Garden Al-Janna', 'Hebron', 'full sun', 'Clay', 12, '2024-06-14 05:06:44', '2024-06-14 05:06:44'),
(5, 'Garden Al-Salam', 'Jerusalem', 'partial sun', 'Sandy', 7, '2024-06-14 05:06:44', '2024-06-14 05:06:44');

-- --------------------------------------------------------

--
-- Table structure for table `knowledgebase`
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
-- Dumping data for table `knowledgebase`
--

INSERT INTO `knowledgebase` (`article_id`, `title`, `content`, `author_id`, `created_at`, `updated_at`) VALUES
(1, 'How to Grow Tomatoes', 'Tomatoes need full sun and regular watering.', 5, '2024-06-14 06:00:00', '2024-06-14 09:09:33'),
(2, 'Cucumber Growing Tips', 'Cucumbers thrive in warm weather.', 5, '2024-06-14 06:10:00', '2024-06-14 09:09:38'),
(3, 'Lettuce Care Guide', 'Lettuce prefers cool weather.', 5, '2024-06-14 06:20:00', '2024-06-14 09:09:41'),
(4, 'Pepper Growing Tips', 'Peppers need a lot of sunlight.', 13, '2024-06-14 06:30:00', '2024-06-14 09:24:21'),
(5, 'Carrot Cultivation', 'Carrots grow best in loose soil.', 5, '2024-06-14 06:40:00', '2024-06-14 06:40:00'),
(6, 'Onion Growing Guide', 'Onions require well-drained soil.', 14, '2024-06-14 06:50:00', '2024-06-14 09:24:15'),
(7, 'Potato Growing Tips', 'Potatoes need well-drained soil.', 15, '2024-06-14 07:00:00', '2024-06-14 09:23:44'),
(8, 'Spinach Care Guide', 'Spinach prefers cooler temperatures.', 18, '2024-06-14 07:10:00', '2024-06-14 09:15:40'),
(9, 'Broccoli Cultivation', 'Broccoli requires rich, moist soil.', 19, '2024-06-14 07:20:00', '2024-06-14 09:15:33');

-- --------------------------------------------------------

--
-- Table structure for table `localpartnerships`
--

CREATE TABLE `localpartnerships` (
  `partnership_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `localpartnerships`
--

INSERT INTO `localpartnerships` (`partnership_id`, `user_id`, `name`, `description`, `contact_info`, `created_at`, `updated_at`) VALUES
(1, 1, 'Farmers Coop', 'A cooperative of local farmers.', '123-456-7890', '2024-06-14 06:20:00', '2024-06-14 06:20:00'),
(2, 2, 'Organic Supplies', 'Supplier of organic farming materials.', '098-765-4321', '2024-06-14 06:30:00', '2024-06-14 06:30:00'),
(5, 5, 'Healthy Harvest', 'Organization promoting healthy eating.', '777-888-9999', '2024-06-14 06:45:00', '2024-06-14 06:45:00'),
(6, 6, 'Green Thumb', 'Non-profit supporting community gardens.', '000-111-2222', '2024-06-14 06:50:00', '2024-06-14 06:50:00');

-- --------------------------------------------------------

--
-- Table structure for table `plots`
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
-- Dumping data for table `plots`
--

INSERT INTO `plots` (`plot_id`, `garden_id`, `user_id`, `plot_number`, `size`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '10*10', '2024-06-14 05:14:52', '2024-06-14 05:14:52'),
(2, 1, 2, 2, '15*15', '2024-06-14 05:14:52', '2024-06-14 05:14:52'),
(3, 2, 3, 1, '20*20', '2024-06-14 05:14:52', '2024-06-14 05:14:52'),
(4, 2, 4, 2, '25*25', '2024-06-14 05:14:52', '2024-06-14 05:14:52'),
(5, 3, 5, 1, '30*30', '2024-06-14 05:14:52', '2024-06-14 05:14:52'),
(6, 3, 6, 2, '35*35', '2024-06-14 05:14:52', '2024-06-14 05:14:52'),
(7, 4, 7, 1, '40*40', '2024-06-14 05:20:52', '2024-06-14 05:20:52'),
(8, 4, 8, 2, '45*45', '2024-06-14 05:21:52', '2024-06-14 05:21:52'),
(9, 5, 9, 1, '50*50', '2024-06-14 05:22:52', '2024-06-14 05:22:52');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
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
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`resource_id`, `type`, `description`, `owner_id`, `created_at`, `updated_at`) VALUES
(1, 'tool', 'Hoe', 1, '2024-06-14 06:40:00', '2024-06-14 06:40:00'),
(2, 'seed', 'Tomato Seeds', 2, '2024-06-14 06:45:00', '2024-06-14 06:45:00'),
(3, 'compost', 'Organic Compost', 3, '2024-06-14 06:50:00', '2024-06-14 06:50:00'),
(6, 'seed', 'Cucumber Seeds', 6, '2024-06-14 07:05:00', '2024-06-14 07:05:00'),
(7, 'tool', 'Rake', 7, '2024-06-14 07:10:00', '2024-06-14 07:10:00'),
(8, 'produce', 'Fresh Lettuce', 8, '2024-06-14 07:15:00', '2024-06-14 07:15:00');

-- --------------------------------------------------------

--
-- Table structure for table `soildata`
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
-- Dumping data for table `soildata`
--

INSERT INTO `soildata` (`soil_id`, `garden_id`, `sample_date`, `ph_level`, `nutrients`, `created_at`) VALUES
(1, 1, '2024-05-01', 6.5, 'Nitrogen, Phosphorus, Potassium', '2024-06-14 07:00:00'),
(2, 2, '2024-05-15', 7.0, 'Nitrogen, Phosphorus, Potassium', '2024-06-14 07:05:00'),
(4, 4, '2024-05-25', 6.7, 'Nitrogen, Phosphorus, Potassium', '2024-06-14 07:20:00'),
(5, 5, '2024-06-01', 7.2, 'Nitrogen, Phosphorus, Potassium', '2024-06-14 07:25:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `role` enum('admin','member','volunteer','partner','author') DEFAULT 'member',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `message` varchar(255) DEFAULT 'message'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password_hash`, `email`, `first_name`, `last_name`, `role`, `created_at`, `updated_at`, `message`) VALUES
(1, 'ahmad', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'ahmad@example.com', 'Ahmad', 'Mohamed', 'member', '2024-06-14 04:25:31', '2024-06-14 04:44:47', 'message'),
(2, 'Areej', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 's12028958@stu.najah.edu', 'Areej', 'sawalha', 'admin', '2024-06-14 04:32:12', '2024-06-14 08:42:14', 'message'),
(3, 'khaled', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'khaled@example.com', 'Khaled', 'Ali', 'volunteer', '2024-06-14 04:35:12', '2024-06-14 04:35:12', 'message'),
(4, 'fatima', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'fatima@example.com', 'Fatima', 'Hassan', 'partner', '2024-06-14 04:40:12', '2024-06-14 04:40:12', 'message'),
(5, 'omar', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'omar@example.com', 'Omar', 'Saad', 'author', '2024-06-14 04:45:12', '2024-06-14 04:45:12', 'message'),
(6, 'yara', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'yara@example.com', 'Yara', 'Salem', 'member', '2024-06-14 04:50:12', '2024-06-14 04:50:12', 'message'),
(7, 'sara', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'sara@example.com', 'Sara', 'Nabil', 'member', '2024-06-14 04:55:12', '2024-06-14 04:55:12', 'message'),
(8, 'hassan', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'hassan@example.com', 'Hassan', 'Saleh', 'admin', '2024-06-14 05:00:12', '2024-06-14 05:00:12', 'message'),
(9, 'mona', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'mona@example.com', 'Mona', 'Rami', 'volunteer', '2024-06-14 05:05:12', '2024-06-14 05:05:12', 'message'),
(10, 'Samaa', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'Samaa@example.com', 'Samaa', 'Yaseen', 'volunteer', '2024-06-14 05:10:12', '2024-06-14 05:10:12', 'message'),
(11, 'Noor', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'Noor@example.com', 'Noor', 'Shelbaya', 'volunteer', '2024-06-14 05:15:12', '2024-06-14 05:15:12', 'message'),
(13, 'sami', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'sami@example.com', 'Sami', 'Farid', 'author', '2024-06-14 05:25:12', '2024-06-14 05:25:12', 'message'),
(14, 'amal', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'amal@example.com', 'Amal', 'Nasser', 'author', '2024-06-14 05:30:12', '2024-06-14 05:30:12', 'message'),
(15, 'tariq', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'tariq@example.com', 'Tariq', 'Yassin', 'author', '2024-06-14 05:35:12', '2024-06-14 05:35:12', 'message'),
(16, 'Baraa', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'baraacomputer@gmail.com', 'Baraa', 'shel', 'member', '2024-06-14 07:25:31', '2024-06-14 07:44:47', 'message'),
(17, 'baraa_admin', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 's12028169@stu.najah.edu', 'Baraa', 'Shelbaya', 'admin', '2024-06-14 07:32:12', '2024-06-14 07:32:12', 'message'),
(18, 'yasmin', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'yasmin@example.com', 'Yasmin', 'Adel', 'author', '2024-06-14 05:20:12', '2024-06-14 05:20:12', 'message'),
(19, 'reem', '$2a$10$EXhRTk1hBz5DTNyphIMGQOtH54eCHqRocYzi5dD1OfNuliJ2ju/jq', 'reem@example.com', 'Reem', 'Hadi', 'author', '2024-06-14 05:40:12', '2024-06-14 05:40:12', 'message');

-- --------------------------------------------------------

--
-- Table structure for table `volunteers`
--

CREATE TABLE `volunteers` (
  `volunteer_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `garden_id` int(11) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `team` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(15) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteers`
--

INSERT INTO `volunteers` (`volunteer_id`, `user_id`, `garden_id`, `event_date`, `team`, `email`, `name`, `phone_number`) VALUES
(1, 3, 1, '2024-06-20', 'Team A', 'khaled_vol@example.com', 'khaled', '123-456-7890'),
(2, 9, 2, '2024-06-21', 'Team B', 'mona_vol@example.com', 'mona', '098-765-4321'),
(3, 10, 4, '2024-06-24', 'Team E', 'Samaa_vol@example.com', 'Samaa', '555-666-7777'),
(4, 11, 5, '2024-06-25', 'Team F', 'Noor_vol@example.com', 'Noor', '888-999-0000');

-- --------------------------------------------------------

--
-- Table structure for table `weatherdata`
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
-- Dumping data for table `weatherdata`
--

INSERT INTO `weatherdata` (`weather_id`, `garden_id`, `date`, `temperature`, `humidity`, `precipitation`, `created_at`) VALUES
(1, 1, '2024-06-01', 25.50, 60.00, 5.00, '2024-06-14 07:15:00'),
(2, 2, '2024-06-02', 22.00, 55.00, 10.00, '2024-06-14 07:20:00'),
(4, 4, '2024-06-04', 26.00, 65.00, 6.00, '2024-06-14 07:30:00'),
(5, 5, '2024-06-05', 23.00, 60.00, 12.00, '2024-06-14 07:35:00');

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
-- Indexes for table `crop_rotation`
--
ALTER TABLE `crop_rotation`
  ADD PRIMARY KEY (`rotation_id`),
  ADD KEY `fk_plot_id` (`plot_id`),
  ADD KEY `fk_previous_crop_id` (`previous_crop_id`),
  ADD KEY `fk_current_crop_id` (`current_crop_id`);

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
  ADD PRIMARY KEY (`partnership_id`),
  ADD KEY `user_id` (`user_id`);

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
  MODIFY `crop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `crop_rotation`
--
ALTER TABLE `crop_rotation`
  MODIFY `rotation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gardens`
--
ALTER TABLE `gardens`
  MODIFY `garden_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `knowledgebase`
--
ALTER TABLE `knowledgebase`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `localpartnerships`
--
ALTER TABLE `localpartnerships`
  MODIFY `partnership_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `plots`
--
ALTER TABLE `plots`
  MODIFY `plot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `resource_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `soildata`
--
ALTER TABLE `soildata`
  MODIFY `soil_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `volunteers`
--
ALTER TABLE `volunteers`
  MODIFY `volunteer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `weatherdata`
--
ALTER TABLE `weatherdata`
  MODIFY `weather_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `crops`
--
ALTER TABLE `crops`
  ADD CONSTRAINT `crops_ibfk_1` FOREIGN KEY (`plot_id`) REFERENCES `plots` (`plot_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crop_rotation`
--
ALTER TABLE `crop_rotation`
  ADD CONSTRAINT `fk_current_crop_id` FOREIGN KEY (`current_crop_id`) REFERENCES `crops` (`crop_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_plot_id` FOREIGN KEY (`plot_id`) REFERENCES `plots` (`plot_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_previous_crop_id` FOREIGN KEY (`previous_crop_id`) REFERENCES `crops` (`crop_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `knowledgebase`
--
ALTER TABLE `knowledgebase`
  ADD CONSTRAINT `knowledgebase_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `localpartnerships`
--
ALTER TABLE `localpartnerships`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plots`
--
ALTER TABLE `plots`
  ADD CONSTRAINT `plots_ibfk_1` FOREIGN KEY (`garden_id`) REFERENCES `gardens` (`garden_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plots_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `soildata`
--
ALTER TABLE `soildata`
  ADD CONSTRAINT `soildata_ibfk_1` FOREIGN KEY (`garden_id`) REFERENCES `gardens` (`garden_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD CONSTRAINT `volunteers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `volunteers_ibfk_2` FOREIGN KEY (`garden_id`) REFERENCES `gardens` (`garden_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `weatherdata`
--
ALTER TABLE `weatherdata`
  ADD CONSTRAINT `weatherdata_ibfk_1` FOREIGN KEY (`garden_id`) REFERENCES `gardens` (`garden_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
