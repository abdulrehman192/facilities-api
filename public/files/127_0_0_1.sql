

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `description` text,
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `userId`, `latitude`, `longitude`, `description`, `createAt`, `updateAt`) VALUES
(2, 2, 23.545454, 31.245458, '', '2023-10-14 12:40:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `one_off_services`
--

DROP TABLE IF EXISTS `one_off_services`;
CREATE TABLE IF NOT EXISTS `one_off_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoryId` int NOT NULL,
  `title` text NOT NULL,
  `subtitle` text NOT NULL,
  `description` text NOT NULL,
  `coverImageUrl` text NOT NULL,
  `iconUrl` text NOT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `one_off_services`
--

INSERT INTO `one_off_services` (`id`, `categoryId`, `title`, `subtitle`, `description`, `coverImageUrl`, `iconUrl`, `createAt`, `updateAt`) VALUES
(1, 1, 'Home', 'aksjdfl akfjas klfla', 'asdfasdf', '/public/The 1 cleaning black.png', '/public/Black Modern Vlogger YouTube Banner.png', '2023-10-16 13:13:25', '2023-10-16 13:39:34'),
(2, 1, 'General Cleaning ds', 'aksjdfl akfjas klfla', 'asdfasdf', '/public/The 1 cleaning black.png', '/public/Cartoon-superman-holding-smartphone-on-transparent-PNG.png', '2023-10-16 13:41:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `service_categories`
--

DROP TABLE IF EXISTS `service_categories`;
CREATE TABLE IF NOT EXISTS `service_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `imageUrl` text NOT NULL,
  `description` text NOT NULL,
  `sr` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `service_categories`
--

INSERT INTO `service_categories` (`id`, `title`, `imageUrl`, `description`, `sr`) VALUES
(1, ' Cleaning', '/public/Mobile App Development Illustrated Facebook Cover.png', '', 0),
(2, 'General Cleaning', '/public/Mobile App Development Illustrated Facebook Cover.png', '', 0),
(4, 'Home Cleaning', '/public/appLogo.jpg', 'asdfasdf', 0);

-- --------------------------------------------------------

--
-- Table structure for table `service_sub_categories`
--

DROP TABLE IF EXISTS `service_sub_categories`;
CREATE TABLE IF NOT EXISTS `service_sub_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serviceId` int NOT NULL,
  `title` text NOT NULL,
  `description` text,
  `url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `service_sub_categories`
--

INSERT INTO `service_sub_categories` (`id`, `serviceId`, `title`, `description`, `url`) VALUES
(1, 1, ' Cleaning', '', '/public/FI49647074674 (2).pdf'),
(2, 1, ' Cleaning fgfg', '', '/public/FI49647074674 (2).pdf'),
(3, 1, ' Cleaning fgfgftg', '', '/public/The 1 cleaning black.png'),
(4, 1, ' Cleaning fgfgftger', '', '/public/files/The 1 cleaning black.png'),
(5, 1, ' Cleaning se', '', '/public/files/The 1 cleaning black.png'),
(6, 1, ' Cleaning se2', '', '/public/files/The 1 cleaning black.png'),
(7, 1, ' Cleaning se2df', '', '/public/files/The 1 cleaning black.png');

-- --------------------------------------------------------

--
-- Table structure for table `sub_services`
--

DROP TABLE IF EXISTS `sub_services`;
CREATE TABLE IF NOT EXISTS `sub_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serviceSubCategoryId` int NOT NULL,
  `title` text NOT NULL,
  `subtitle` text NOT NULL,
  `description` text NOT NULL,
  `imageUrl` text NOT NULL,
  `duration` int NOT NULL DEFAULT '120',
  `price` double NOT NULL DEFAULT '35',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `sub_services`
--

INSERT INTO `sub_services` (`id`, `serviceSubCategoryId`, `title`, `subtitle`, `description`, `imageUrl`, `duration`, `price`, `createAt`, `updateAt`) VALUES
(1, 1, 'Home', 'aksjdfl akfjas klfla', 'asdfasdf', '/public/files/The 1 cleaning black.png', 120, 10, '2023-10-16 15:17:57', '2023-10-16 15:29:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `phone` text NOT NULL,
  `email` text NOT NULL,
  `gender` text NOT NULL,
  `country` text,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `imageUrl` text,
  `fcmToken` text,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `email`, `gender`, `country`, `latitude`, `longitude`, `imageUrl`, `fcmToken`, `createAt`, `updateAt`) VALUES
(2, 'Abdul Rehman', '+923089098067', 'abc@gmail.com', 'Male', 'Pakistan', 23.54878787, 45.654689, NULL, '', '2023-06-05 05:23:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_payment_methods`
--

DROP TABLE IF EXISTS `user_payment_methods`;
CREATE TABLE IF NOT EXISTS `user_payment_methods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `cardNumber` text NOT NULL,
  `expiryDate` date NOT NULL,
  `cvv` int NOT NULL,
  `description` text,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `user_payment_methods`
--

INSERT INTO `user_payment_methods` (`id`, `userId`, `cardNumber`, `expiryDate`, `cvv`, `description`, `createAt`, `updateAt`) VALUES
(2, 2, '5787854454', '2025-05-10', 599, '', '2023-10-14 13:21:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_reviews`
--

DROP TABLE IF EXISTS `user_reviews`;
CREATE TABLE IF NOT EXISTS `user_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `rating` double NOT NULL,
  `message` text NOT NULL,
  `reviewDate` datetime DEFAULT NULL,
  `serviceId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `user_reviews`
--

INSERT INTO `user_reviews` (`id`, `userId`, `rating`, `message`, `reviewDate`, `serviceId`) VALUES
(2, 2, 4.5, 'Hello ', '2023-10-14 17:44:34', 1),
(3, 2, 4.5, 'Hello ', '2023-10-14 17:44:35', 1);
COMMIT;

