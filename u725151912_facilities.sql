-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 29, 2024 at 05:08 AM
-- Server version: 10.11.7-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:05";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u725151912_facilities`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `description` text DEFAULT NULL,
  `phone` text DEFAULT NULL,
  `fullName` text DEFAULT NULL,
  `label` text DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDefault` int(1) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `userId`, `latitude`, `longitude`, `description`, `phone`, `fullName`, `label`, `createAt`, `updateAt`, `isDefault`) VALUES
(1, 6, 30.8109497, 73.4318212, '', NULL, 'Ali', 'Home', '2023-10-31 19:33:18', '2024-01-15 14:54:14', 1),
(2, 6, 30.793036423910625, 73.4218655526638, '', NULL, 'Usman', 'Office', '2023-10-31 19:33:18', '2023-10-31 17:37:33', 0),
(6, 8, 25.7154472, 55.8566737, '', '', '', '', '2023-11-26 08:07:31', '2024-01-28 20:01:16', 0),
(16, 7, 25.6748883, 55.7782301, '', NULL, NULL, NULL, '2024-01-17 05:11:15', NULL, 0),
(5, 6, 24.033483178732276, 54.16720770299435, '', NULL, NULL, NULL, '2023-11-08 14:29:25', '2023-11-08 14:29:42', 0),
(7, 9, 25.6748615, 55.7781652, '', NULL, NULL, NULL, '2023-12-11 07:04:29', NULL, 1),
(17, 11, 25.6748572, 55.7782004, '', NULL, NULL, NULL, '2024-01-18 06:15:53', NULL, 1),
(13, 3, 25.69499196050626, 55.82131393253803, '', NULL, NULL, NULL, '2024-01-15 05:34:59', NULL, 0),
(15, 10, 25.1670584, 55.4981914, '', NULL, NULL, NULL, '2024-01-16 05:17:53', NULL, 1),
(18, 3, 25.715105565341954, 55.84129672497511, 'mina al Arab', NULL, NULL, NULL, '2024-01-18 06:23:08', NULL, 0),
(19, 3, 25.700551183557135, 55.79057313501835, 'Bayti 1085', '', '', '', '2024-01-22 06:45:15', NULL, 0),
(20, 8, 25.7154472, 55.8566737, 'RB5 -616', '', '', '', '2024-01-28 20:01:13', NULL, 0),
(21, 12, 25.7180328, 55.8311822, '', '', '', '', '2024-02-11 17:20:21', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `bookingId` int(11) NOT NULL,
  `bookingCode` text NOT NULL,
  `userId` int(11) NOT NULL,
  `addressId` int(11) NOT NULL DEFAULT 1,
  `instructions` text DEFAULT NULL,
  `frequency` varchar(45) NOT NULL,
  `hours` int(11) NOT NULL DEFAULT 2,
  `professionals` int(11) NOT NULL DEFAULT 1,
  `includeMaterial` int(1) NOT NULL DEFAULT 0,
  `voucherCode` varchar(45) DEFAULT NULL,
  `subTotal` double NOT NULL DEFAULT 0,
  `tax` double NOT NULL DEFAULT 0,
  `voucherPrice` double NOT NULL DEFAULT 0,
  `serviceFee` double NOT NULL DEFAULT 0,
  `materialCost` double NOT NULL DEFAULT 0,
  `creditPoints` int(11) DEFAULT 0,
  `discount` double DEFAULT 0,
  `netTotal` double NOT NULL DEFAULT 0,
  `discountDescription` text DEFAULT NULL,
  `paymentMethod` varchar(45) DEFAULT NULL,
  `userMethodId` int(11) DEFAULT NULL,
  `paymentRemarks` text DEFAULT NULL,
  `serviceDate` datetime NOT NULL,
  `status` varchar(45) DEFAULT 'Confirmed',
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL,
  `cancelReason` text DEFAULT NULL,
  `cancelledAt` datetime DEFAULT NULL,
  `paymentReceived` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`bookingId`, `bookingCode`, `userId`, `addressId`, `instructions`, `frequency`, `hours`, `professionals`, `includeMaterial`, `voucherCode`, `subTotal`, `tax`, `voucherPrice`, `serviceFee`, `materialCost`, `creditPoints`, `discount`, `netTotal`, `discountDescription`, `paymentMethod`, `userMethodId`, `paymentRemarks`, `serviceDate`, `status`, `createAt`, `updateAt`, `cancelReason`, `cancelledAt`, `paymentReceived`) VALUES
(1, 'TUW3JB3K', 6, 1, '', 'One Time', 1, 1, 0, '', 35, 0, 0, 0, 0, 0, 0, 35, '', 'cos', 0, '', '2024-01-20 12:00:00', 'Confirmed', '2024-01-20 11:40:17', '2024-01-20 06:40:18', NULL, NULL, 0),
(2, 'OZPO1DKV', 7, 16, '', 'One Time', 2, 1, 0, '', 70, 0, 0, 0, 0, 0, 0, 70, '', 'cos', 0, '', '2024-01-22 12:00:00', 'Confirmed', '2024-01-22 09:13:33', '2024-01-22 05:13:34', NULL, NULL, 0),
(3, 'LDZUY3MK', 3, 19, '*Booking Confirmation*\n\nDear *Ahdel*,\n\nYour booking is confirmed. Here are the details:\n\n- Name: Ahdel\n- Phone:  +971504772569\nLocation: Bayti 1085, Al hamra village \n- Date: 22 Jan 2024\n- Time: 11:30 am to  1:30 pm  \n2 cleaner \n\nPlease verify the details. If you need any changes, contact us at *+971 56 718 0111*. \n\nSee you on *22 Jan, 2024* at *11:30 am*!\n\nBest regards,\n\n*The 1 Cleaning*', 'One Time', 2, 2, 0, '', 140, 0, 0, 0, 0, 0, 0, 140, '', 'cos', 0, '', '2024-01-22 11:30:00', 'Confirmed', '2024-01-22 10:45:43', '2024-01-22 06:45:44', NULL, NULL, 0),
(4, 'NCTS5ENP', 7, 16, '', 'One Time', 2, 1, 0, '', 70, 0, 0, 0, 0, 0, 0, 70, '', 'cos', 0, '', '2024-01-22 14:00:00', 'In-Progress', '2024-01-22 10:51:28', '2024-01-23 08:56:37', NULL, NULL, 1),
(5, 'WRL77TYJ', 7, 16, '', 'One Time', 2, 2, 0, '', 140, 0, 0, 0, 0, 0, 0, 140, '', 'cos', 0, '', '2024-01-26 12:00:00', 'Confirmed', '2024-01-25 09:23:57', '2024-01-25 11:52:45', NULL, NULL, 1),
(6, '5T2NKUIN', 3, 19, '*Booking Confirmation*\n\nDear *Sana*,\n\nYour booking is confirmed. Here are the details:\n\n- Name: Sana \n- Phone: +97150134 5241\nLocation:  Al Hamra villa - Marina Mc 401\n- Date: 27 Jan 2024\n- Time: 10.00am to  1:00 pm  \n1 cleaner \n\nPlease verify the details. If you need any changes, contact us at *+971 56 718 0111*. \n\nSee you on *27 Jan, 2024* at *10:00 am*!\n\nBest regards,\n\n*The 1 Cleaning*', 'One Time', 3, 1, 0, '', 105, 0, 0, 0, 0, 0, 0, 105, '', 'cos', 0, '', '2024-01-27 10:00:00', 'Confirmed', '2024-01-26 14:10:07', '2024-01-26 10:10:09', NULL, NULL, 0),
(7, 'R1GNGY7Y', 8, 20, '*Booking Confirmation*\n\nDear *Louiza*,\n\nYour booking is confirmed. Here are the details:\n\n- Name: Louiza\n- Phone:  0562588102\n- Email: \nLocation: Royal Breeze 5 unit 616\n- Date: 29 Jan, 2024\n- Time: 6:30 pm - 8:30 pm\n\nPlease verify the details. If you need any changes, contact us at *+971 56 718 0111*. \n\nSee you on *29 Jan, 2024* at *6:30 pm*!\n\nBest regards,\n\n*The 1 Cleaning*', 'One Time', 2, 1, 0, '', 70, 0, 0, 0, 0, 0, 0, 70, '', 'cos', 0, '', '2024-01-29 18:30:00', 'Confirmed', '2024-01-29 00:01:45', '2024-01-28 20:28:30', NULL, NULL, 0),
(8, 'DM260XGF', 6, 1, '', 'Monthly', 1, 2, 0, '', 70, 0, 0, 0, 0, 0, 0, 70, '', 'cos', 0, '', '2024-02-03 15:00:00', 'Cancelled', '2024-02-03 14:33:45', '2024-02-03 09:33:48', 'I am not available at that time anymore', '2024-02-03 02:42:00', 0),
(9, 'Q3HUMQL2', 8, 6, '', 'One Time', 3, 1, 1, '', 105, 0, 0, 0, 0, 0, 0, 105, '', 'cos', 0, '', '2024-02-05 10:00:00', 'Confirmed', '2024-02-04 22:42:08', '2024-02-04 18:42:09', NULL, NULL, 0),
(10, 'REAT1TH0', 8, 6, '', 'One Time', 3, 1, 1, '', 105, 0, 0, 0, 0, 0, 0, 105, '', 'cos', 0, '', '2024-02-05 12:00:00', 'Confirmed', '2024-02-04 22:43:08', '2024-02-04 18:43:10', NULL, NULL, 0),
(11, 'MNX0ZLLX', 6, 1, '', 'One Time', 1, 1, 0, '', 35, 0, 0, 0, 0, 0, 0, 35, '', 'cos', 0, '', '2024-02-05 15:00:00', 'Confirmed', '2024-02-05 12:31:24', '2024-02-05 07:31:27', NULL, NULL, 0),
(12, 'APMJATYL', 6, 5, 'clean up with machine', 'Weekly', 1, 1, 0, '', 35, 0, 0, 0, 0, 0, 3.5, 31.5, '', 'cos', 0, '', '2024-02-16 16:51:00', 'Cancelled', '2024-02-16 15:52:31', '2024-02-16 10:52:34', 'I am not available at that time anymore', '2024-02-16 03:57:37', 0),
(13, 'KZ0XH31V', 6, 1, 'test instructions', 'Weekly', 1, 1, 0, '', 35, 0, 0, 0, 0, 0, 3.5, 31.5, '', 'cos', 0, '', '2024-02-21 14:00:00', 'Confirmed', '2024-02-21 12:07:46', '2024-02-21 07:07:49', NULL, NULL, 0),
(14, 'WV62R9SB', 6, 1, 'test', 'One Time', 1, 1, 0, '', 35, 0, 0, 0, 0, 0, 0, 35, '', 'cos', 0, '', '2024-02-21 20:00:00', 'Confirmed', '2024-02-21 18:00:30', '2024-02-21 12:30:33', NULL, NULL, 0),
(15, '1CICC34C', 6, 1, 'fgdhfgj', 'One Time', 1, 1, 0, '', 35, 0, 0, 0, 0, 0, 0, 35, '', 'cos', 0, '', '2024-03-18 20:24:00', 'Confirmed', '2024-03-18 20:13:36', '2024-03-19 03:13:38', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `booking_items`
--

CREATE TABLE `booking_items` (
  `id` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 1,
  `price` double DEFAULT 0,
  `isSubService` int(1) NOT NULL DEFAULT 0,
  `bookingDate` datetime NOT NULL,
  `serviceDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking_items`
--

INSERT INTO `booking_items` (`id`, `bookingId`, `serviceId`, `userId`, `qty`, `price`, `isSubService`, `bookingDate`, `serviceDate`) VALUES
(1, 1, 1, 6, 1, 35, 0, '2024-01-20 11:40:17', '2024-01-20 12:00:00'),
(2, 2, 1, 7, 1, 35, 0, '2024-01-22 09:13:33', '2024-01-22 12:00:00'),
(3, 3, 1, 3, 1, 35, 0, '2024-01-22 10:45:43', '2024-01-22 11:30:00'),
(4, 4, 1, 7, 1, 35, 0, '2024-01-22 10:51:28', '2024-01-22 02:00:00'),
(5, 5, 1, 7, 1, 35, 0, '2024-01-25 09:23:57', '2024-01-26 12:00:00'),
(6, 6, 1, 3, 1, 35, 0, '2024-01-26 02:10:07', '2024-01-27 10:00:00'),
(7, 7, 1, 8, 1, 35, 0, '2024-01-29 12:01:45', '2024-01-29 06:30:00'),
(8, 8, 1, 6, 1, 35, 0, '2024-02-03 02:33:45', '2024-02-03 03:00:00'),
(9, 9, 1, 8, 1, 35, 0, '2024-02-04 10:42:08', '2024-02-05 10:00:00'),
(10, 10, 1, 8, 1, 35, 0, '2024-02-04 10:43:08', '2024-02-05 12:00:00'),
(11, 11, 2, 6, 1, 35, 0, '2024-02-05 12:31:24', '2024-02-05 03:00:00'),
(12, 12, 1, 6, 1, 35, 0, '2024-02-16 03:52:31', '2024-02-16 04:51:00'),
(13, 13, 1, 6, 1, 35, 0, '2024-02-21 12:07:46', '2024-02-21 02:00:00'),
(14, 14, 1, 6, 1, 35, 0, '2024-02-21 06:00:30', '2024-02-21 08:00:00'),
(15, 15, 3, 6, 1, 35, 0, '2024-03-18 08:13:36', '2024-03-18 08:24:00');

-- --------------------------------------------------------

--
-- Table structure for table `booking_professionals`
--

CREATE TABLE `booking_professionals` (
  `id` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `professionalId` int(11) NOT NULL,
  `assignDate` date NOT NULL,
  `modifiedAt` datetime NOT NULL,
  `serviceDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking_professionals`
--

INSERT INTO `booking_professionals` (`id`, `bookingId`, `professionalId`, `assignDate`, `modifiedAt`, `serviceDate`) VALUES
(1, 1, 3, '2024-01-20', '2024-01-20 11:40:17', '0000-00-00 00:00:00'),
(2, 2, 3, '2024-01-22', '2024-01-22 09:13:33', '0000-00-00 00:00:00'),
(3, 3, 10, '2024-01-22', '2024-01-22 10:45:43', '0000-00-00 00:00:00'),
(4, 3, 9, '2024-01-22', '2024-01-22 10:45:43', '0000-00-00 00:00:00'),
(5, 4, 4, '2024-01-22', '2024-01-22 10:51:28', '0000-00-00 00:00:00'),
(6, 5, 8, '2024-01-25', '2024-01-25 09:23:57', '0000-00-00 00:00:00'),
(7, 5, 9, '2024-01-25', '2024-01-25 09:23:57', '0000-00-00 00:00:00'),
(8, 6, 9, '2024-01-26', '2024-01-26 14:10:07', '0000-00-00 00:00:00'),
(9, 7, 8, '2024-01-29', '2024-01-29 00:01:45', '0000-00-00 00:00:00'),
(10, 8, 5, '2024-02-03', '2024-02-03 14:33:45', '0000-00-00 00:00:00'),
(11, 8, 8, '2024-02-03', '2024-02-03 14:33:45', '0000-00-00 00:00:00'),
(12, 9, 9, '2024-02-04', '2024-02-04 22:42:08', '0000-00-00 00:00:00'),
(13, 10, 10, '2024-02-04', '2024-02-04 22:43:08', '0000-00-00 00:00:00'),
(14, 11, 5, '2024-02-05', '2024-02-05 12:31:24', '0000-00-00 00:00:00'),
(15, 12, 8, '2024-02-16', '2024-02-16 15:52:31', '0000-00-00 00:00:00'),
(16, 13, 8, '2024-02-21', '2024-02-21 12:07:46', '0000-00-00 00:00:00'),
(17, 14, 5, '2024-02-21', '2024-02-21 18:00:30', '0000-00-00 00:00:00'),
(18, 15, 8, '2024-03-18', '2024-03-18 20:13:36', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `userType` varchar(45) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `dateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `one_off_services`
--

CREATE TABLE `one_off_services` (
  `serviceId` int(11) NOT NULL,
  `serviceCategoryId` int(11) NOT NULL,
  `serviceTitle` text NOT NULL,
  `serviceSubtitle` text NOT NULL,
  `serviceDescription` text NOT NULL,
  `serviceCoverImageUrl` text NOT NULL,
  `price` double NOT NULL DEFAULT 35,
  `duration` int(11) NOT NULL DEFAULT 60,
  `maxQuantity` int(11) NOT NULL DEFAULT 1,
  `serviceCreateAt` datetime DEFAULT NULL,
  `serviceUpdateAt` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `one_off_services`
--

INSERT INTO `one_off_services` (`serviceId`, `serviceCategoryId`, `serviceTitle`, `serviceSubtitle`, `serviceDescription`, `serviceCoverImageUrl`, `price`, `duration`, `maxQuantity`, `serviceCreateAt`, `serviceUpdateAt`) VALUES
(1, 1, 'General Cleaning', '', '', 'https://facilitate-api.glitch.me/files/Portrait-of-young-latin-man-sw-1-scaled-1.jpg', 35, 120, 1, '2023-10-21 08:08:12', '2023-12-25 11:50:31'),
(2, 1, 'Deep Cleaning', 'Kitchen  Cleaning', '', 'https://facilitate-api.glitch.me/files/download.jpg', 35, 120, 1, '2023-10-21 09:12:31', '2023-12-25 11:48:44'),
(3, 1, 'Kitchen Cleaning', 'Garden Cleaning', '', 'https://facilitate-api.glitch.me/files/images.jpg', 35, 120, 1, '2023-10-23 10:04:15', '2023-12-25 11:49:06'),
(15, 1, 'Sofa Cleaning', '', '<p>Sofa Cleaning starts from 25AED per seat&nbsp;</p>', 'https://facilitate-api.glitch.me/files/9-1.jpg', 25, 2, 1, '2024-01-31 05:54:10', NULL),
(10, 1, 'Carpet Cleaning', '', '<p>Professional car cleaning service starting from 40AED&nbsp;</p>', 'https://facilitate-api.glitch.me/files/Carpet-Cleaning-Companies-in-RAK-_-Cover-19-8-22-420x230.jpg', 40, 2, 1, '2024-01-19 11:12:36', '2024-01-19 11:14:04'),
(11, 1, 'Office Cleaning', '', '<p>Office Cleaning starts from 35AED&nbsp;</p>', 'https://facilitate-api.glitch.me/files/download.jpeg', 35, 2, 1, '2024-01-19 11:23:14', NULL),
(12, 2, 'Electrical works', '', '<p>We offer all types of electrical works. Service charges starts 75AED per hour&nbsp;</p>', 'https://facilitate-api.glitch.me/files/Types-of-Electrical-Repair.jpg', 75, 2, 1, '2024-01-19 11:31:38', NULL),
(13, 2, 'AC services', '', '<p>AC Cleaning, servicing , gas filling .</p><p>Service charges start from 76AED</p>', 'https://facilitate-api.glitch.me/files/AC-Repair-Services.jpg', 75, 2, 1, '2024-01-19 11:35:09', NULL),
(14, 2, 'Plumbing works', '', '<p>Plumbing services starts from 75AED per hour&nbsp;</p>', 'https://facilitate-api.glitch.me/files/download (1).jpeg', 75, 2, 1, '2024-01-22 06:08:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `service_categories`
--

CREATE TABLE `service_categories` (
  `categoryId` int(11) NOT NULL,
  `categoryTitle` varchar(45) NOT NULL,
  `categoryImageUrl` text NOT NULL,
  `categoryDescription` text NOT NULL,
  `categorySr` int(11) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_categories`
--

INSERT INTO `service_categories` (`categoryId`, `categoryTitle`, `categoryImageUrl`, `categoryDescription`, `categorySr`) VALUES
(1, 'Cleaning', 'https://facilitate-api.glitch.me/files/cleaning.svg', '', NULL),
(2, 'Maintenance', 'https://facilitate-api.glitch.me/files/furniture-cleaning.svg', '', NULL),
(3, 'Handman Services', 'https://facilitate-api.glitch.me/files/tools.svg', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `service_sub_categories`
--

CREATE TABLE `service_sub_categories` (
  `subCategoryId` int(11) NOT NULL,
  `subCategoryServiceId` int(11) NOT NULL,
  `subCategoryTitle` text NOT NULL,
  `subCategoryDescription` text DEFAULT NULL,
  `subCategoryUrl` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staffId` int(11) NOT NULL,
  `name` text NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `gender` varchar(45) NOT NULL,
  `imageUrl` text DEFAULT NULL,
  `fcmToken` text NOT NULL,
  `role` varchar(45) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staffId`, `name`, `phone`, `email`, `password`, `gender`, `imageUrl`, `fcmToken`, `role`, `createAt`, `updateAt`) VALUES
(2, 'Abdul Rehman', '+923089098067', 'admin@gmail.com', '123456', 'Male', 'https://facilitate-api.glitch.me/files/WhatsApp Image 2023-10-25 at 4.18.40 PM (1).jpeg', 'e0fWHxNTRJKTNuvXjRRWz5:APA91bE2L3ZNfQsHlxoKjN3uaO4QZv1Yia0z1NKo_iIU2qqoL7HvNb-FczJY0D5MY2SmW_EP9WIVkNtnYfLtWTEHofiUrqrjoGFJXpPMKimrCfR-pi3vFo_XI5XNJ31vuyPSdFymz91a', 'Admin', '2023-11-10 11:39:25', '2023-11-10 16:09:52'),
(5, 'Adeel', '+923186042789', 'adeel@gmail.com', '123456', 'Male', 'https://facilitate-api.glitch.me/files/aro59p.jpg', 'cHjIul9_QWaNxzw62ldhai:APA91bHUA_7mXJSUInTfb4VDuqdya7GjGnehmbpms_p_luC00KAh5PrFbwfTs6fROSa6KdXnjwT-TMTN6sxmFeB-aEdVZq7AkXqhrrjsRwDQUZiyuNCCFOgrGH2cPrlVupgpJTuIUGCJ', 'Cleaner', '2023-11-10 14:50:28', '2024-01-13 07:02:51'),
(8, 'Sheila', '+971547900369', 'shiela@the1bm.com', '12345678', 'Female', 'https://facilitate-api.glitch.me/files/Screenshot_20240122_101355_Gallery.jpg', 'eaC-Bu2vSl2KGAasmE7CRK:APA91bHm2__-bQj6eHg6us5CZATqKy-TxF86X5dSJk2WmnxHh9Tlwk4yXjrLdoY20hC44uA1XQPJirWGfduL12ctNvAnJmG2LpyQuspRMzvosP_NeNwU9mLKTNW_3GUgt1Gwv6DRLiUC', 'Cleaner', '2024-01-22 06:33:32', NULL),
(9, 'Jerry', '+971588343061', 'jerry@the1bm.com', '12345678', 'Male', 'https://facilitate-api.glitch.me/files/Screenshot_20240122_101406_Gallery.jpg', 'cuozX8XGQiyGQ0tqqXVOIW:APA91bHvU8Y7JDz4fWCw8_1ducJLaCC1aWGm23HeF2-1-K_gfgVjvINYpo3BLTXmnv7ymYPADmRZqy6rziXF2cI__iSuc2gHDF9gWCgP7-juf3JMPUUeZZHEqi3Fv-TAlN19XEnJR59w', 'Cleaner', '2024-01-22 06:37:47', NULL),
(10, 'Annalyn', '+971567180111', 'annalyn@the1bm.com', '12345678', 'Female', 'https://facilitate-api.glitch.me/files/Screenshot_20240122_101348_Gallery.jpg', 'eaC-Bu2vSl2KGAasmE7CRK:APA91bHm2__-bQj6eHg6us5CZATqKy-TxF86X5dSJk2WmnxHh9Tlwk4yXjrLdoY20hC44uA1XQPJirWGfduL12ctNvAnJmG2LpyQuspRMzvosP_NeNwU9mLKTNW_3GUgt1Gwv6DRLiUC', 'Cleaner', '2024-01-22 06:39:06', NULL),
(11, 'Letty', '+971567180111', 'letty@the1bm.com', '12345678', 'Female', 'https://facilitate-api.glitch.me/files/Screenshot_20240122_101400_Gallery.jpg', 'eaC-Bu2vSl2KGAasmE7CRK:APA91bHm2__-bQj6eHg6us5CZATqKy-TxF86X5dSJk2WmnxHh9Tlwk4yXjrLdoY20hC44uA1XQPJirWGfduL12ctNvAnJmG2LpyQuspRMzvosP_NeNwU9mLKTNW_3GUgt1Gwv6DRLiUC', 'Cleaner', '2024-01-22 06:40:15', NULL),
(12, 'Muhammad Shanik', '+970567180111', 'shanik@the1bm.com', 'The1@123', 'Male', 'https://facilitate-api.glitch.me/files/IMG-20240111-WA0064.jpg', 'e0fWHxNTRJKTNuvXjRRWz5:APA91bE2L3ZNfQsHlxoKjN3uaO4QZv1Yia0z1NKo_iIU2qqoL7HvNb-FczJY0D5MY2SmW_EP9WIVkNtnYfLtWTEHofiUrqrjoGFJXpPMKimrCfR-pi3vFo_XI5XNJ31vuyPSdFymz91a', 'Admin', '2024-01-25 11:36:38', '2024-01-25 11:40:42'),
(13, 'Muhammad Faizan', '+971056202330', 'marketing@the1properties.com', 'The1@123', 'Male', 'https://facilitate-api.glitch.me/files/IMG-20240111-WA0041.jpg', 'e0fWHxNTRJKTNuvXjRRWz5:APA91bE2L3ZNfQsHlxoKjN3uaO4QZv1Yia0z1NKo_iIU2qqoL7HvNb-FczJY0D5MY2SmW_EP9WIVkNtnYfLtWTEHofiUrqrjoGFJXpPMKimrCfR-pi3vFo_XI5XNJ31vuyPSdFymz91a', 'Admin', '2024-01-25 11:41:26', NULL),
(14, 'Reslan', '+971553200155', 'reslan@the1bm.com', '12345678', 'Male', 'https://facilitate-api.glitch.me/files/20240125_154953.jpg', 'cnuSqHfESPC6jA7qnEdjGK:APA91bEEzyp0YTlVnNe_I_E_GeyHEVlBnvVyTODr8zOh--E06WJUeNZJI78rd0aIVVSvnltELf-irb2--0hOcFBdmyNLNJZIRLJXF8xjgKPEVhFG0TceDFGZwW28WuvuBJknleQ5PBfr', 'Supervisor', '2024-01-25 11:50:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `staff_check_activities`
--

CREATE TABLE `staff_check_activities` (
  `id` int(11) NOT NULL,
  `staffId` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `checkedIn` datetime NOT NULL,
  `checkedInLocation` text NOT NULL,
  `checkedOut` datetime DEFAULT NULL,
  `checkedOutLocation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff_check_activities`
--

INSERT INTO `staff_check_activities` (`id`, `staffId`, `bookingId`, `checkedIn`, `checkedInLocation`, `checkedOut`, `checkedOutLocation`) VALUES
(1, 4, 22, '2023-12-13 13:27:24', '30.8192243 73.4320037', '2023-12-13 13:46:34', '30.8192236 73.4320032'),
(2, 4, 4, '2024-01-23 12:30:35', '30.8107702 73.4318634', '2024-01-23 12:51:13', '30.8107725 73.4318591');

-- --------------------------------------------------------

--
-- Table structure for table `sub_services`
--

CREATE TABLE `sub_services` (
  `subServiceId` int(11) NOT NULL,
  `subServiceSubCategoryId` int(11) NOT NULL,
  `subServiceTitle` text NOT NULL,
  `subServiceSubtitle` text NOT NULL,
  `subServiceDescription` text NOT NULL,
  `subServiceImageUrl` text NOT NULL,
  `subServiceDuration` int(11) NOT NULL DEFAULT 120,
  `subServicePrice` double NOT NULL DEFAULT 35,
  `maxQuantity` int(11) NOT NULL DEFAULT 1,
  `subServiceCreateAt` datetime DEFAULT NULL,
  `subServiceUpdateAt` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `staffId` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) DEFAULT 0,
  `createAt` datetime NOT NULL,
  `completeAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `bookingId`, `staffId`, `title`, `description`, `status`, `createAt`, `completeAt`) VALUES
(2, 4, 0, 'clean backside of freezer', 'completely clean from behind the freezer. there are too much waste and dust there', 1, '2024-01-23 06:46:27', '2024-01-23 12:49:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `gender` text NOT NULL,
  `country` text DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `imageUrl` text DEFAULT NULL,
  `fcmToken` text DEFAULT NULL,
  `creditPoints` int(11) NOT NULL DEFAULT 0,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `phone`, `name`, `email`, `gender`, `country`, `latitude`, `longitude`, `imageUrl`, `fcmToken`, `creditPoints`, `createAt`, `updateAt`) VALUES
(6, '+923015560112', 'Abdul Rahman', 'mr.abdulrehman.ar@gmail.com', 'Male', 'Pakistan', 30.8105153, 73.4314963, 'https://facilitate-api.glitch.me/files/IMG-20231027-WA0000.jpg', 'efzeNCYqQ2yQ9fc7E5wa7J:APA91bFKtioJM5IRqhl8re7Cv37n_YvK0gpCsFZtIvX6AoKl4Utnj6dAFIpRuISLmhSPccD4CwR5Ye5umlI7XVeY2GgFW3XmYFSYc2n1_1mnG1c3LDjViObG0adhkxThftHOxxM4oZTx', 0, '2023-10-27 13:14:06', '2023-11-08 14:33:40'),
(7, '+9710563202330', 'faizan', 'Faizantariq253@gmail.com', 'Male', 'United Arab Emirates', 25.6748883, 55.7782301, 'https://facilitate-api.glitch.me/files/IMG-20231107-WA0004.jpg', 'c-Hv819sRNiKJlZGRE7aPi:APA91bHj9CK707Byeax353-193sbwe8-Rp2qPs6EpL6a5J0uzCcQCYyjbSBhOFwhisi5qbrw9a3pXH1o7CVztGQ6vqjN4wDFzyiyRFZJTgIOHAHb80hFHdQGD3GZ-2JdPnDW2YehSAuv', 0, '2023-11-07 07:10:15', '2023-12-25 11:34:33'),
(3, '+9710567180111', 'faizan tariq', 'Faizantariq253@gmail.com', 'Male', 'United Arab Emirates', 25.6748832, 55.7782057, 'https://facilitate-api.glitch.me/files/null-20231025-WA0011.jpg', 'fY3q5HKtRdyq9JgGxS6Kyo:APA91bE3BDTVz54bNGCow65JRXX-icf_6ExUq1Il470N5noUAyGdFXX5sD2JdE3_OZlKFzO49ceBh9M_WA6gWzNgSvHSvkauma4n0mp4qu3WPgGWjuchXvQEzTPS4OqIaveJ4doHfkvM', 0, '2023-10-26 07:40:28', '2024-01-15 05:32:34'),
(5, '+923089098067', 'Abdul Rahman', 'mr.abdulrehman.ar@gmail.com', 'Male', 'Pakistan', 30.819213, 73.4320493, 'https://facilitate-api.glitch.me/files/IMG-20231027-WA0000.jpg', 'd2YK-DYKQqGYFYgNruLLnP:APA91bGzz_DxBg9AdVqgE4atk2KcGGD4YN-0SZn9eLAm1U90hxoedE0XL0H-mx6ovYIqbFam3LS6E5gtyxfh8oNLKqXnXy_XzqJAEWgLS0Ey0nlGEolZSYjUWbyDpwNlj3ENRFyM6xi7', 0, '2023-10-27 13:06:17', NULL),
(8, '+9710509762626', 'Shanik', 'shanik@the1properties.com', 'Male', 'United Arab Emirates', 25.7158611, 55.8566337, NULL, 'ew7jSGmGQo6LpP4pEbZvFg:APA91bHAAdhsZKVGVJvxOhunGnalMHJga3D6aJVNWRUHINNCma_WuzyeTMHys62wSsw80PCdQ5Cb-PmKrMhE0NWJqu0CH3F6uz4w7105wXBcqdKw-zdb1MnhvbmCBL8ZzsBmIF_OOGVo', 0, '2023-11-26 08:07:28', NULL),
(9, '+9710526348042', 'aisha', 'aisha@the1properties.com', 'Female', 'United Arab Emirates', 25.6748615, 55.7781652, 'https://facilitate-api.glitch.me/files/1000031486.jpg', 'eNWn0PmuQ5mokdRobgOGNe:APA91bHOWtDyHue5kudZ7-cyIYCg9pNcwaUj8GZpLnYSjwlsgdZ3DGA9o5EhM8PQO3BWJNOE1IO-n9SJIJonkeUAOM_6efOgY9kfGgfiuniCvr1Bi1z2p7v7S7HHDvMpFs-R0TtFSxQg', 0, '2023-12-11 07:04:26', NULL),
(10, '+9710502717999', 'Mustafa Hazim', 'm.haziim@hotmail.com', 'Male', 'United Arab Emirates', 25.1670584, 55.4981914, NULL, 'fJYaRYKrR7SVIGuj4rn9OL:APA91bFyBeIk5VPHemH64jJ0oROctw3w3dz--N4zTXqREwHr-qst0KU__oDI2mWBgVeWIK38kDOfDMXzmnSc-UUnjQ3pUfn99KKBr6HDqegLkYMG0YT_v0aI81QD1AD0gfK8FFXluz5b', 0, '2024-01-16 05:17:50', NULL),
(11, '+9710553200155', 'reslan Alkhaled', 'reslanalkhaled@gmail.com', 'Male', 'الإمارات العربية المتحدة', 25.6748572, 55.7782004, NULL, 'f3665eFLTImLSz_GJW4iZg:APA91bH5vz88ja-e2b1IwF0CG3KhpTIVOmwTd8-OgHjZ3nrSYOnewOkrWNt3zp9DS0v4JM06Q8G0XPR_myqXiUNCYIG6RuR6XXshAWBWAS-KSjUGqadJKzvzQinNU1zyWjpEq7UhwakZ', 0, '2024-01-18 06:15:50', NULL),
(12, '+9710525671508', 'Imran Rangraze', 'dr.imranr@gmail.com', 'Male', 'United Arab Emirates', 25.7180328, 55.8311822, NULL, 'c3kM65bYQlas89A1up6ydd:APA91bF395dvvYthjs6gX6TTPT4g2zCFwwoPSZl5AHa8364A7docJdsGsYCz4eWB6lH_GqjOpkpGaK5F9EI0A9Wb0EKOHOo255Dpawt4IxK4Vmr0iI5mtC4xS-Y7HpJ1M5PifTGQ-3F8', 0, '2024-02-11 17:20:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_credits`
--

CREATE TABLE `user_credits` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `description` text NOT NULL,
  `dateTime` date NOT NULL,
  `expiryDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_credits`
--

INSERT INTO `user_credits` (`id`, `userId`, `points`, `description`, `dateTime`, `expiryDate`) VALUES
(1, 6, 1158, 'Steps Count', '2024-02-22', '2024-03-23'),
(3, 6, 235, 'steps counted', '2024-02-23', '2024-03-24'),
(4, 6, 0, 'Steps Count', '2024-03-18', '2024-04-17');

-- --------------------------------------------------------

--
-- Table structure for table `user_payment_methods`
--

CREATE TABLE `user_payment_methods` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `cardNumber` text NOT NULL,
  `expiryDate` date NOT NULL,
  `cvv` int(3) NOT NULL,
  `description` text DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_payment_methods`
--

INSERT INTO `user_payment_methods` (`id`, `userId`, `cardNumber`, `expiryDate`, `cvv`, `description`, `createAt`, `updateAt`) VALUES
(2, 6, '4649512901050131', '2028-05-01', 528, '', '2023-10-30 22:57:25', '2024-02-02 20:12:03');

-- --------------------------------------------------------

--
-- Table structure for table `user_reviews`
--

CREATE TABLE `user_reviews` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `rating` double NOT NULL,
  `message` text NOT NULL,
  `reviewDate` datetime DEFAULT NULL,
  `serviceId` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `voucherId` int(11) NOT NULL,
  `voucherCode` varchar(45) NOT NULL,
  `expiryDate` date NOT NULL,
  `amount` double NOT NULL DEFAULT 0,
  `imageUrl` text NOT NULL,
  `serviceId` int(11) NOT NULL,
  `createAt` datetime NOT NULL,
  `isSlideImage` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`voucherId`, `voucherCode`, `expiryDate`, `amount`, `imageUrl`, `serviceId`, `createAt`, `isSlideImage`) VALUES
(1, '1', '2023-12-01', 50, 'https://facilitate-api.glitch.me/files/download.jpg', 1, '2023-10-21 05:21:53', 1),
(2, '1', '2023-12-01', 50, 'https://facilitate-api.glitch.me/files/Portrait-of-young-latin-man-sw-1-scaled-1.jpg', 1, '2023-10-21 05:22:15', 1),
(3, '1', '2023-12-01', 50, 'https://facilitate-api.glitch.me/files/img.png', 1, '2023-10-21 05:22:32', 1),
(4, '1', '2023-12-01', 50, 'https://facilitate-api.glitch.me/files/carpet-cleaning.jpg', 1, '2023-10-21 05:22:46', 1),
(5, '1', '2023-12-01', 50, 'https://facilitate-api.glitch.me/files/images.jpg', 1, '2023-10-21 05:23:39', 1),
(6, '1', '2023-12-01', 50, 'https://facilitate-api.glitch.me/files/cleaning-items-900x500.jpg', 1, '2023-10-21 05:23:52', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`bookingId`);

--
-- Indexes for table `booking_items`
--
ALTER TABLE `booking_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_professionals`
--
ALTER TABLE `booking_professionals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `one_off_services`
--
ALTER TABLE `one_off_services`
  ADD PRIMARY KEY (`serviceId`);

--
-- Indexes for table `service_categories`
--
ALTER TABLE `service_categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `service_sub_categories`
--
ALTER TABLE `service_sub_categories`
  ADD PRIMARY KEY (`subCategoryId`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staffId`);

--
-- Indexes for table `staff_check_activities`
--
ALTER TABLE `staff_check_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_services`
--
ALTER TABLE `sub_services`
  ADD PRIMARY KEY (`subServiceId`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_credits`
--
ALTER TABLE `user_credits`
  ADD PRIMARY KEY (`id`,`dateTime`),
  ADD UNIQUE KEY `unique_dateTime` (`dateTime`);

--
-- Indexes for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_reviews`
--
ALTER TABLE `user_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`voucherId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `bookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `booking_items`
--
ALTER TABLE `booking_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `booking_professionals`
--
ALTER TABLE `booking_professionals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `one_off_services`
--
ALTER TABLE `one_off_services`
  MODIFY `serviceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `service_categories`
--
ALTER TABLE `service_categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `service_sub_categories`
--
ALTER TABLE `service_sub_categories`
  MODIFY `subCategoryId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staffId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `staff_check_activities`
--
ALTER TABLE `staff_check_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sub_services`
--
ALTER TABLE `sub_services`
  MODIFY `subServiceId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_credits`
--
ALTER TABLE `user_credits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_reviews`
--
ALTER TABLE `user_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `voucherId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
